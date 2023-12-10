package main

import (
	"bufio"
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"os"
	"sync/atomic"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/archive"
	"github.com/go-sql-driver/mysql"
)

var db *sql.DB
var ctx context.Context
var cli *client.Client

type SubmissionJson struct {
	Id        string `json:"id"`
	Source    string `json:"source_code"`
	ProblemId int    `json:"task_id"`
}
type ErrorLine struct {
	Error       string      `json:"error"`
	ErrorDetail ErrorDetail `json:"errorDetail"`
}

type ErrorDetail struct {
	Message string `json:"message"`
}

type Input struct {
	id     string
	input  string
	output string
}

type Submission struct {
	submissionId string
	taskId       int
	userId       int
	lang         string
	status       int
	passed       string
	sourceCode   string
}

type TestResult struct {
	submissionId string
	testcaseId   string
	userOutput   string
	verdict      Verdict
	codeTime     float32
	codeSize     int
}

type Verdict int

const (
	VERDICT_ACCEPTED      Verdict = 1
	VERDICT_WRONG_ANSWER  Verdict = 2
	VERDICT_COMPILE_ERROR Verdict = 3
	VERDICT_REJECTED      Verdict = 4
	VERDICT_IN_PROGRESS   Verdict = 5
)

type Status int

const (
	STATUS_ACCEPT        Status = 1
	STATUS_PARTIAL       Status = 2
	STATUS_COMPILE_ERROR Status = 3
)

func testcasesByProblemId(problemId int64) ([]Input, error) {
	var inputs []Input
	rows, err := db.Query("select id, input, output from test_cases where task_id = ?", problemId)
	if err != nil {
		return nil, fmt.Errorf("testcasesByProblemId %q: %v", problemId, err)
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var alb Input
		if err := rows.Scan(&alb.id, &alb.input, &alb.output); err != nil {
			return nil, fmt.Errorf("testcasesByProblemId %q: %v", problemId, err)
		}
		inputs = append(inputs, alb)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("testcasesByProblemId %q: %v", problemId, err)
	}
	return inputs, nil
}
func createTestResult(testResult TestResult) (int64, error) {
	result, err := db.Exec("insert into results (submission_id, testcase_id, user_output, verdict, code_time, code_size, createdAt, updatedAt) values(?, ?, ?, ?, ?, ?, ?, ?)",
		testResult.submissionId, testResult.testcaseId, testResult.userOutput, testResult.verdict, testResult.codeTime, testResult.codeSize, time.Now(), time.Now())
	if err != nil {
		return 0, fmt.Errorf("createTestResult: %v", err)
	}
	id, err := result.RowsAffected()
	return id, nil
}
func updateTestResult(testResult TestResult) (int64, error) {
	result, err := db.Exec("update results set user_output=?, verdict=?, code_time=?, code_size=?, updatedAt=? where submission_id=? and testcase_id=?",
		testResult.userOutput, testResult.verdict, testResult.codeTime, testResult.codeSize, time.Now(), testResult.submissionId, testResult.testcaseId)
	if err != nil {
		return 0, fmt.Errorf("updateTestResult: %v", err)
	}
	id, err := result.RowsAffected()
	if err != nil {
		return 0, fmt.Errorf("updateTestResult: %v", err)
	}
	return id, nil
}
func updateSubmission(submissionId string, status Status, passed string) (int64, error) {
	result, err := db.Exec("update submissions set status=?, passed=?, updatedAt=? where id=?",
		status, passed, time.Now(), submissionId)
	if err != nil {
		return 0, fmt.Errorf("updateSubmission: %v", err)
	}
	id, err := result.RowsAffected()
	if err != nil {
		return 0, fmt.Errorf("updateSubmission: %v", err)
	}
	return id, nil
}
func CopyFile(src, dst string) (err error) {
	sfi, err := os.Stat(src)
	if err != nil {
		return
	}
	if !sfi.Mode().IsRegular() {
		// cannot copy non-regular files (e.g., directories,
		// symlinks, devices, etc.)
		return fmt.Errorf("CopyFile: non-regular source file %s (%q)", sfi.Name(), sfi.Mode().String())
	}
	dfi, err := os.Stat(dst)
	if err != nil {
		if !os.IsNotExist(err) {
			return
		}
	} else {
		if !(dfi.Mode().IsRegular()) {
			return fmt.Errorf("CopyFile: non-regular destination file %s (%q)", dfi.Name(), dfi.Mode().String())
		}
		if os.SameFile(sfi, dfi) {
			return
		}
	}
	if err = os.Link(src, dst); err == nil {
		return
	}
	err = copyFileContents(src, dst)
	return
}
func copyFileContents(src, dst string) (err error) {
	in, err := os.Open(src)
	if err != nil {
		return
	}
	defer in.Close()
	out, err := os.Create(dst)
	if err != nil {
		return
	}
	defer func() {
		cerr := out.Close()
		if err == nil {
			err = cerr
		}
	}()
	if _, err = io.Copy(out, in); err != nil {
		return
	}
	err = out.Sync()
	return
}

func prepair(body SubmissionJson, testcases []Input) {
	err := os.MkdirAll(body.Id+"/inputs", 0750)
	err = os.MkdirAll(body.Id+"/outputs", 0750)
	err = os.MkdirAll(body.Id+"/user_outputs", 0750)
	failOnError(err, "Failed to make dirs")
	err = os.WriteFile(body.Id+"/main.cpp", []byte(body.Source), 0660)
	failOnError(err, "Failed to write main.cpp")
	err = CopyFile("Dockerfile", body.Id+"/Dockerfile")
	failOnError(err, "Failed to write Dockerfile")
	err = CopyFile("run.sh", body.Id+"/run.sh")
	failOnError(err, "Failed to write run.sh")

	// var wg sync.WaitGroup
	for _, testcase := range testcases {
		// wg.Add(1)
		// go func(testcase Input) {
		// defer wg.Done()
		err = os.WriteFile(body.Id+"/inputs/"+testcase.id+".txt", []byte(testcase.input), 0660)
		err = os.WriteFile(body.Id+"/outputs/"+testcase.id+".txt", []byte(testcase.output), 0660)
		failOnError(err, "Failed to write testcase")
		_, err = createTestResult(TestResult{body.Id, testcase.id, "", 0, 0, 0})
		failOnError(err, "Failed to insert new test result")
		// }(testcase)
	}
	// wg.Wait()
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Printf("%s", msg)
	}
}
func print(rd io.Reader) error {
	var lastLine string

	scanner := bufio.NewScanner(rd)
	for scanner.Scan() {
		lastLine = scanner.Text()
	}

	errLine := &ErrorLine{}
	json.Unmarshal([]byte(lastLine), errLine)
	if errLine.Error != "" {
		return errors.New(errLine.Error)
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	return nil
}
func imageBuild(dockerClient *client.Client, contextPath string) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*120)
	defer cancel()

	tar, err := archive.TarWithOptions(contextPath, &archive.TarOptions{})
	if err != nil {
		return err
	}

	opts := types.ImageBuildOptions{
		Dockerfile: "Dockerfile",
		Tags:       []string{contextPath},
		Remove:     true,
	}
	res, err := dockerClient.ImageBuild(ctx, tar, opts)
	if err != nil {
		return err
	}

	defer res.Body.Close()

	err = print(res.Body)
	if err != nil {
		return err
	}

	return nil
}
func containerRun(dockerClient *client.Client, imageID string) error {
	pwd, err := os.Getwd()
	resp, err := dockerClient.ContainerCreate(ctx, &container.Config{
		Image: imageID,
	}, &container.HostConfig{
		Binds: []string{
			pwd + "/" + imageID + "/user_outputs:/app/user_outputs",
		},
	}, nil, nil, "")
	err = cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{})
	return err
}
func standardGrading(input string, output string) bool {
	if input == output {
		return true
	}
	return false
}
func evaluate(msg []byte, channel chan string) {
	channel <- string(msg)
	// convert msg to object
	var submission SubmissionJson
	err := json.Unmarshal(msg, &submission)
	failOnError(err, "Cannot parse message.")
	//
	inputs, err := testcasesByProblemId(int64(submission.ProblemId))
	prepair(submission, inputs)
	defer os.RemoveAll(submission.Id)
	// build docker image
	err = imageBuild(cli, submission.Id)
	if err != nil {
		log.Printf("failed when build docker image")
		for _, input := range inputs {
			updateTestResult(TestResult{
				submission.Id,
				input.id,
				"",
				VERDICT_COMPILE_ERROR,
				0,
				0,
			})
		}
		updateSubmission(submission.Id, STATUS_COMPILE_ERROR, "0")
		return
	}
	err = containerRun(cli, submission.Id)
	if err != nil {
		log.Printf("Failed when start docker container")
		log.Printf("%s", err.Error())
		for _, input := range inputs {
			updateTestResult(TestResult{
				submission.Id,
				input.id,
				"",
				VERDICT_COMPILE_ERROR,
				0,
				0,
			})
		}
		updateSubmission(submission.Id, STATUS_COMPILE_ERROR, "0")
	} else {
		var count_wa int32 = 0
		for _, input := range inputs {
			user_output, err := os.ReadFile(submission.Id + "/user_outputs/" + input.id + ".txt")
			if err != nil {
				log.Printf(err.Error())
			}
			verdict := VERDICT_WRONG_ANSWER
			if standardGrading(string(user_output), input.output) {
				verdict = VERDICT_ACCEPTED
			} else {
				verdict = VERDICT_WRONG_ANSWER
				atomic.AddInt32(&count_wa, 1)
			}
			updateTestResult(TestResult{
				submission.Id,
				input.id,
				string(user_output),
				verdict,
				0,
				0,
			})
		}
		if count_wa == 0 {
			updateSubmission(submission.Id, STATUS_ACCEPT, fmt.Sprintf("%d/%d", cap(inputs), cap(inputs)))
		} else {
			updateSubmission(submission.Id, STATUS_PARTIAL, fmt.Sprintf("%d/%d", cap(inputs)-int(count_wa), cap(inputs)))
		}
	}
	log.Printf("%s is done", submission.Id)
	<-channel
}

func main() {
	var err error
	ctx = context.Background()
	cli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()
	// Capture connection properties.
	cfg := mysql.Config{
		User:   "root",
		Passwd: "Luyendkdk1",
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "cses",
	}
	// Get a database handle.
	db, err = sql.Open("mysql", cfg.FormatDSN())
	failOnError(err, "Failed to connect to MySQL")
	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("DB Connected")

	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"task_queue", // name
		true,         // durable
		false,        // delete when unused
		false,        // exclusive
		false,        // no-wait
		nil,          // arguments
	)
	failOnError(err, "Failed to declare a queue")

	err = ch.Qos(
		1,     // prefetch count
		0,     // prefetch size
		false, // global
	)
	failOnError(err, "Failed to set QoS")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	var forever chan struct{}

	numWorkers := 5
	channel := make(chan string, numWorkers)
	go func() {
		for d := range msgs {
			log.Printf("Received new message")
			go evaluate(d.Body, channel)
			d.Ack(false)
		}
	}()

	log.Printf("[*] Waiting for messages. To exit press CTRL+C")
	<-forever
}

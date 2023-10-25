import pika
import os 
import shutil
import json
import docker
import db
from docker.types import Mount
from verdict import Verdict

def prepare(body, inputs):
    os.makedirs(body['id'])
    with open(os.path.join(body['id'], 'main.cpp'), 'w') as f:
        f.write(body['source_code'])
    shutil.copy('Dockerfile', os.path.join(body['id'], 'Dockerfile'))
    shutil.copy('run.sh', os.path.join(body['id'], 'run.sh'))
    os.makedirs(os.path.join(body['id'], 'inputs'))
    os.makedirs(os.path.join(body['id'], 'outputs'))
    for idx, input in enumerate(inputs):
        with open(os.path.join(body['id'], 'inputs', f'{input[0]}.txt'), 'w') as f:
            f.write(input[1])
    # insert with default verdict
    for idx, input in enumerate(inputs):
        submission_id = body['id']
        testcase_id = input[0]
        db.create_test_result(submission_id, testcase_id, '', verdict=0, code_time=0, code_size=0)

def evaluate(body):
    inputs = db.get_inputs(body['task_id'])
    outputs = db.get_outputs(body['task_id'])
    submission_id = body['id']
    sorted(outputs)
    prepare(body, inputs=inputs)
    client = docker.from_env()
    try:
        image, _ = client.images.build(path=body['id'], tag=body['id'])
        container = client.containers.run(body['id'], volumes=[f"{os.getcwd()}/{body['id']}/outputs:/app/outputs"], remove=True)
        # compare outputs
        count_wa = 0
        for idx, output in enumerate(outputs):
            
            fn = output[0]
            result = ''
            with open(os.path.join(body['id'], 'outputs', f'{fn}.txt'), 'r') as f:
                result=f.readlines()
                result=''.join(result)
                if result == output[1]:
                    db.update_test_result(submission_id, testcase_id=fn, user_output=result, verdict=Verdict.ACCEPTED, code_time=0, code_size=0)
                else:
                    db.update_test_result(submission_id, testcase_id=fn, user_output=result, verdict=Verdict.WRONG_ANSWER, code_time=0, code_size=0)
                    count_wa += 1
        if count_wa == 0:
            db.update_submission(submission_id, status='accepted')
        else: 
            db.update_submission(submission_id, status='wrong answer')
    # build error ~ [complile error]
    except docker.errors.BuildError as e:
        output = ''
        for line in e.build_log:
            if 'stream' in line:
                stream_line = line['stream']
                if '\x1b[91m' in  stream_line:
                    if 'main.cpp' in stream_line and 'error: ' in stream_line:
                        output += stream_line
        output = output.split('\n')
        user_output = ''
        user_output += output[0]
        for line in output:
            if 'error' in line:
                user_output += '\n'
                user_output += line
        for idx, input in enumerate(inputs):
            db.update_test_result(submission_id, testcase_id=input[0], user_output=user_output, verdict=Verdict.COMPILE_ERROR, code_time=0, code_size=0)
        db.update_submission(submission_id, status='compile error')
    except docker.errors.APIError as e:
        print(e)
        for idx, input in enumerate(inputs):
            db.update_test_result(submission_id, testcase_id=input[0], user_output=output, verdict=Verdict.REJECTED, code_time=0, code_size=0)
    # update db
    finally: 
        shutil.rmtree(body['id'])
from threading import Thread
def callback(ch, method, properties, body):
    body = json.loads(body.decode())
    print(f" [RECEIVED] {body['id']} - {body['createdAt']}")
    thread = Thread(target=evaluate, args=(body, ))
    thread.start()
    ch.basic_ack(delivery_tag=method.delivery_tag)
    print(f" [waiting for next msg..]")

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
result = channel.queue_declare(queue='task_queue', durable=True)
# queue_name = result.method.queue
# print(queue_name)
# channel.queue_bind(exchange='submissions', queue=queue_name)
channel.basic_qos(prefetch_count=1)
print(' [*] Waiting for logs. To exit press CTRL+C')
channel.basic_consume(
    queue='task_queue', on_message_callback=callback)
channel.start_consuming()
package config
import (
	"log"
	"github.com/go-sql-driver/mysql"
	"database/sql"

)
var (
	db *sql.DB
	err error
)
func GetDB() *sql.DB{
	return db
}
func failOnError(err error, msg string) {
	if err != nil {
		log.Printf("%s", msg)
	}
}
func MySQLInit(){
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
	log.Println("DB Connected")
}
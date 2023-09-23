const mysql = require('mysql2')
const connect = async () =>{
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Luyendkdk1",
    });
    
    // Run create database statement
    connection.query(`CREATE DATABASE IF NOT EXISTS cses`, (err, result)=>{
        if(err){

        }
        const Sequelize = require("sequelize");
        const sequelize = new Sequelize(
            'cses',
            'root',
            'Luyendkdk1',
            {
                host: '127.0.0.1',
                dialect: 'mysql'
            }
        );
        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    });
    
}
module.exports = connect
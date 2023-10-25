const { Sequelize, DataTypes } = require('sequelize');
const TestCase = require('./Testcase');
const sequelize = new Sequelize(
    'cses',
    'root',
    'Luyendkdk1',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false

    }
);
const Task = sequelize.define('tasks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    difficulty:{
      type: DataTypes.STRING,
      allowNull: false
    },
    time_limit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    memory_limit:{
        type: DataTypes.FLOAT,
        allowNull: false   
    }
  });
Task.sync()
module.exports = Task;
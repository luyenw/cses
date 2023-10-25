const { Sequelize, DataTypes } = require('sequelize');
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
const Submission = sequelize.define('submissions', {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
    },
    task_id: {
        type: DataTypes.INTEGER,  
        allowNull: false,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lang: {
      type: DataTypes.ENUM('c', 'cpp', 'python'),
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    source_code:{
        type: DataTypes.STRING,
        allowNull: false,      
    }
  }, {
    timestamps: true
  });
Submission.sync()
module.exports = Submission;
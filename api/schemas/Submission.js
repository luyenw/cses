const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');
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
      type: DataTypes.STRING,
      primaryKey: true,
    },
    problem_id: {
        type: DataTypes.INTEGER,  
        allowNull: false,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contest_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lang: {
      type: DataTypes.ENUM('c', 'cpp', 'python'),
      allowNull: false,
    },
    status:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    passed:{
      type: DataTypes.STRING,
      defaultValue: 0
    },
    source_code:{
        type: DataTypes.TEXT,
        allowNull: false,      
    }
  }, {
    timestamps: true,
      classMethods: {
      }
    });
Submission.sync()

User.hasMany(Submission, {foreignKey: 'id'})
Submission.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'})

module.exports = Submission;
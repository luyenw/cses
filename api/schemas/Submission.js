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

Submission.belongsTo(User, {foreignKey: 'user_id'})

// User.hasMany(Submission, {
//   foreignKey: 'user_id' // The foreign key in the Submission table referencing the User table
// });
    Submission.sync()
module.exports = Submission;
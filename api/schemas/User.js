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
const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://www.gravatar.com/avatar/6b1c0514d00e50563bb9f1916b357443'
    }
  });
User.sync()
module.exports = User;
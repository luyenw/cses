const { Sequelize, DataTypes } = require('sequelize');
const Problem = require('./Problem');
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
const TestCase = sequelize.define('test_cases', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    problem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    input: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    output: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }})
TestCase.sync()
module.exports = TestCase
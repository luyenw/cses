const {DataTypes, Sequelize} = require('sequelize')
const sequelize = new Sequelize(
    'cses',
    'root',
    'Luyendkdk1',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    }
)
const Result = sequelize.define('results', {
    submission_id: {
        type: DataTypes.STRING,
        primaryKey: true
    }, 
    testcase_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_output: {
        type: DataTypes.TEXT,
    }, 
    verdict: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    code_time: {
        type: DataTypes.FLOAT,
        allowNull: true
    }, 
    code_size: {
        type: DataTypes.INTEGER,
        allowNull: true
    }, 
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false}
})
Result.sync()
module.exports = Result
const {DataTypes, Sequelize} = require('sequelize')
const sequelize = new Sequelize(
    'lms',
    'root',
    'Luyendkdk1',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false

    }
)
const Class = sequelize.define('classes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    class_code: {
        type: DataTypes.STRING
    }
},{
    timestamps: false
})
Class.sync()
module.exports = Class
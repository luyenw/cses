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
const Module = sequelize.define('modules', {
    course_id:{
        type: DataTypes.INTEGER
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT
    },
    position: {
        type: DataTypes.INTEGER
    },
    published: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    timestamps: false
})
Module.sync()
module.exports = Module
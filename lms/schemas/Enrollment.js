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
const Enrollment = sequelize.define('enrollments', {
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    class_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    }, 
    enrollment_date: {
        type: DataTypes.DATE
    },
    role:{
        type: DataTypes.INTEGER
    }
},{
    timestamps: false
})
Enrollment.sync()
module.exports = Enrollment
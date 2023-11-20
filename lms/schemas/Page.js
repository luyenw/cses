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
const Page = sequelize.define('pages', {
    user_id: {
        type: DataTypes.INTEGER,
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    course_id: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.TEXT
    },
    body: {
        type: DataTypes.TEXT
    },
    published: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    timestamps: false
})
Page.sync()
module.exports = Page
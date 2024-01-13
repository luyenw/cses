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
const Contest = sequelize.define('contests', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    start:{
        type: DataTypes.DATE
    },
    length: {
        type: DataTypes.INTEGER
    }
})
Contest.sync()
module.exports = Contest
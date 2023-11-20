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
const PagesByModule = sequelize.define('pages_by_module', {
    page_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    module_id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    }
},{
    timestamps: false
})
PagesByModule.sync()
module.exports = PagesByModule
const Sequelize = require('sequelize');


module.exports = new Sequelize('project_tracker', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const { Sequelize } = require('sequelize');
const db = require('../config/database');

// create model
const User = db.define('users', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email_verified_at: {
        type: Sequelize.STRING
    },
    remember_token: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

module.exports = User;
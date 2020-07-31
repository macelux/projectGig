'use strict';

//var Task = require('../models/appModel.js');
const User = require('../models/UserModel');


exports.add_user = function(req, res) {
    // pull out this properties from the data object ( destructuring)
    let { name, email, password } = req.body;
    let errors = [];
    // validate Fields
    if (!name) {
        errors.push({ text: "Please add a name" })
    }
    if (!email) {
        errors.push({ text: "Please add email" })
    }
    if (!password) {
        errors.push({ text: "Please enter password" })
    }


    // check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            name,
            email
        })
    } else {
        // insert into database
        User.create({
                name,
                email,
                password,
                email_vertified_at: new Date(),
                remember_token: 1
            })
            .then(users => res.redirect('/user'))
            .catch(err => console.log('Error ' + err))
    }
}

exports.get_add_user = function(req, res) {
    res.render('add')
}

exports.get_user = function(req, res) {
    User.findAll()
        .then(users => {
            res.render('users', {
                users: users.map(users => users.toJSON())
            });
        })
        .catch(err => {
            console.log('Error' + err);
        })
}
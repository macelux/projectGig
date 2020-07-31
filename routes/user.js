const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');


// users route
router.route('/user/add')
    .get((req, res) => { res.render('add') })
    .post((req, res) => {
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

    });


router.get('/user', (req, res) => {
    // get user list
    User.findAll()
        .then(users => {
            res.render('users', {
                users: users.map(users => users.toJSON())
            });
        })
        .catch(err => {
            console.log('Error' + err);
        })
});


module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');

// get route
router.get('/user', (rq, res) => {
    // get user list
    User.findAll()
        .then(users => {
            res.render('users', {
                users
            });
        })
        .catch(err => {
            console.log('Error' + err);
        })
});

// add user route
router.get('/add', (req, res) => {
    const data = {
        name: 'mac',
        email: 'mac@hsd.com',
        password: '023994885',
        email_vertified_at: '1',
        remember_token: 'ewer'
    }

    // pull out this properties from the data object ( destructuring)
    let { name, email, password, email_vertified_at, remember_token } = data;

    // insert into database
    User.create({
            name,
            email,
            password,
            email_vertified_at,
            remember_token
        })
        .then(users => res.redirect('/user'))
        .catch(err => console.log('Error ' + err))
})

module.exports = router;
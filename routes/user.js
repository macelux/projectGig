const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');

// get route
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


// display user form
router.get('/', (req, res) => {
    res.render('add')
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
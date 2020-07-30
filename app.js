const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database 
const db = require('./config/database')

db.authenticate()
    .then(() => { console.log('database connected') })
    .catch(err => console.log('Error ' + err))

const app = express();

app.get('/', (request, response) => {
    response.send('INDEX');
});

const PORT = process.env.PORT || 5000; // use host port or 5000 if non is found
app.listen(PORT, console.log('server running on port 5000'));
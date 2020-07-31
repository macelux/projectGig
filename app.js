const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database 
const db = require('./config/database')

// connect to database
db.authenticate()
    .then(() => { console.log('database connected') })
    .catch(err => console.log('Error ' + err))

const app = express();

// handlebars template engine
app.engine('handlebars', handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {
    response.send('INDEX');
});

app.use(require('./routes/user'))


const PORT = process.env.PORT || 5000; // use host port or 5000 if non is found
app.listen(PORT, console.log(`server running on port ${PORT} `));
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
app.engine('handlebars', handlebars({
    helpers: require("./helpers/handlebars.js").helpers,
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body parse
app.use(bodyParser.urlencoded({ extended: false })); // for form requests

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {
    response.send('INDEX');
});


let routes = require('./routes/userRoutes'); //importing route 
routes(app); //register the route



const PORT = process.env.PORT || 5000; // use host port or 5000 if non is found


app.on('listening', function() {
    console.log('ok, server is running');
});


app.listen(PORT, console.log(`server running on port ${PORT} `));
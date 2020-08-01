const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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
app.use(bodyParser.urlencoded({ extended: true })); // for form requests
app.use(bodyParser.json());

// sessions
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));

// cookie parser
app.use(cookieParser('secret'));

// enable flash messages using express-sesion
app.use(flash());
app.use(function(req, res, next) {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

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
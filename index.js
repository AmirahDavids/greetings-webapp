const express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://amirah:coder123@localhost:5432/greet_db';
const pool = new Pool({
    connectionString
});

const GreetFactory = require('./greet');
const greet = GreetFactory(pool);
const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())

app.use(flash());

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.get("/", async function (req, res) {
    res.render("index", {
        counter: await greet.getGreetCountFromDatabase()
    })
});

app.post("/greetings", async function (req, res) {

    var input = req.body.first_name;
    var language = req.body.selector;

    var message = greet.displayFlashMsg(input, language)
    var name = greet.getNameFromInput(input);

    var data = {
        greeting: await greet.greetUser(name, language),
        counter: await greet.getGreetCountFromDatabase()
    }
    if (message !== "") {
        req.flash('info', message);
    }

    res.render("index", data);
});

app.get('/greeted', async function (req, res) {
    var data = {
        user: await greet.getAllUsersAsListFromDatabase()
    }
    res.render('greeted', data);
});

app.post("/reset", async function (req, res) {

    await greet.resetBtn();
    res.redirect("/");
});

app.get('/counter/:name', async function (req, res) {

    var name = req.params.name;

    var data = {
        name: greet.getNameFromInput(name),
        count: await greet.getGreetCountForUserFromDatabase(name)
    }

    res.render('counter', data)
});


let PORT = process.env.PORT || 3500;
app.listen(PORT, function () {
    console.log('http://localhost:', PORT);
});
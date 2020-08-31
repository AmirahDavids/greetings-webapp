const express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');


const GreetFactory = require('./greet');
const greet = GreetFactory();
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

app.get("/", function (req, res) {

    res.render("index", {
        counter: greet.getGreetCount(),
    })

});

app.post("/greetings", function (req, res) {

    var input = req.body.first_name;
    var language = req.body.selector;

    var message = greet.displayFlashMsg(input, language)
    var name = greet.getNameFromInput(input);

    var objectForHandlebars = {
        greeting: greet.greetUser(name, language),
        counter: greet.getGreetCount()
    }
    if (message !== "") {
        req.flash('info', message);
    }

    res.render("index", objectForHandlebars);
});

app.get('/greeted', function (req, res) {
    var data = {
        user: greet.getAllUsersAsList()
    }

    res.render('greeted', data);
});

app.post("/reset", function (req, res) {
    greet.resetBtn();
    res.redirect("/");
});

app.get('/counter/:name', function (req, res) {

    var name = req.params.name;

    var data = {
        name: greet.getNameFromInput(name),
        count: greet.getGreetCountForUser(name)
    }

    res.render('counter', data)
});


let PORT = process.env.PORT || 3500;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
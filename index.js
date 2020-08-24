const express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

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
}))
app.use(bodyParser.json())



app.get("/", function (req, res) {
    res.render("index");
});

let PORT = process.env.PORT || 3500;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
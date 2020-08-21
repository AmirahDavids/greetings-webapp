let express = require('express');
let app = express();

app.get("/", function (req, res) {
    res.send("Greetings WebApp");
});

let PORT = process.env.PORT || 3500;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
const express = require("express");
const bodyParser = require("body-parser");
let app = express();
let port = 3000;

app.use(express.static('styles'));

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function(){
    console.log("Servidor rodando na porta:", port);
});

module.exports = app;
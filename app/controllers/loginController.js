const dbConnection = require("../../config/dbConnection");
const loginModel = require("../models/loginModel");

module.exports.logar = function (app, req, res, errors) {
    let login = req.body;

    if(!errors.isEmpty()){
        let erros = errors.array();
        res.render("login", {erros: erros, login: login});
        return;
    }

    const connection = dbConnection();

    loginModel.logar(connection, function (err, results){
        if(!err)
        {
            res.render("home", {login: results});
        }
        else
        {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
        
    })
}
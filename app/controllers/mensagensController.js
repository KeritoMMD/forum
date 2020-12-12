const dbConnection = require("../../config/dbConnection");
const mensagensModel = require("../models/mensagensModel");

module.exports.loadMensagens = function (app, req, res) {
    const connection = dbConnection();

    mensagensModel.getMensagens(connection, function (err, results){
        if(!err)
        {
            res.render("mensagens", {mensagens: results});
        }
        else
        {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
        
    })
}
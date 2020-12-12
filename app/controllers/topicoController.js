const dbConnection = require("../../config/dbConnection");
const topicoModel = require("../models/topicoModel");

module.exports.loadTopicos = function (app, req, res) {
    const connection = dbConnection();

    topicoModel.getTopicos(connection, function (err, results){
        if(!err)
        {
            res.render("topico", {topico: results});
        }
        else
        {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
        
    })
}
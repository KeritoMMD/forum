const dbConnection = require("../../config/dbConnection");
const usuarioModel = require("../models/usuarioModel");

module.exports.usuarioSalvar = function (app, req, res, errors) {
    let usuario = req.body;

    if(!errors.isEmpty()){
        let erros = errors.array();
        res.render("admin/insereUsuario", {erros: erros, usuario: usuario});
        return;
    }

    const connection = dbConnection();

    usuarioModel.setUsuario(usuario, connection, function (err, results){
       res.redirect("/"); 
        
    });
}
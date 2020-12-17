const dbConnection = require("../../config/dbConnection");
const cursoModel = require("../models/cursoModel");

module.exports.cursoSalvar = function (app, req, res, errors) {
    let curso = req.body;

    if(!errors.isEmpty()){
        let erros = errors.array();
        res.render("admin/insereCurso", {erros: erros, curso: curso});
        return;
    }

    const connection = dbConnection();

    cursoModel.setCurso(connection, function (err, results){
       res.redirect("/cursos"); 
        
    });
}
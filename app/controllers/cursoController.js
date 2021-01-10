const dbConnection = require("../../config/dbConnection");
const cursoModel = require("../models/cursoModel");
const usuarioModel = require("../models/usuarioModel");
const controllerUsuario = require("../controllers/usuarioController");


module.exports.getCursoSalvar = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
        if (!err) {
            res.render("admin/insereCurso", { usuario: results, erros: {}, curso:{} });
        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
    })
}


module.exports.cursoSalvar = function (app, req, res, errors) {
    let curso = req.body;
    let params = req.query;

    const connection = dbConnection();

    if(!errors.isEmpty()){
        let erros = errors.array();
        usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
            if (!err) {
                res.render("admin/insereCurso", { usuario: results, erros: erros, curso:{} });
            }
            else {
                let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                pagina = pagina + "<h2>" + err + "</h2>";
                res.send(pagina);
            }
        })
        return;
    }



    cursoModel.setCurso(curso, connection, function (err, results){
        if (!err) {
            usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                if (!err) {
                    res.render("admin/insereCurso", { usuario: results, erros: {}, curso:{} });
                }
                else {
                    let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                    pagina = pagina + "<h2>" + err + "</h2>";
                    res.send(pagina);
                }
            })

        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
        
    });
}


module.exports.getCursos = function (usuario, app, req, res) {
    const connection = dbConnection();

    cursoModel.getCursos(connection, function (err, results) {
        if (!err) {
            res.render("cursos", { usuario: usuario, cursos: results });
        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
    })
}


module.exports.getCursoUpdate = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    cursoModel.getCurso(params.idCurso, connection, function (err, results) {
        let curso = results;
        if (!err) {
            usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                if (!err) {
                    res.render("admin/alteraCurso", { usuario: results, erros: {}, curso: curso });
                }
                else {
                    let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                    pagina = pagina + "<h2>" + err + "</h2>";
                    res.send(pagina);
                }
            })
        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
    })
}


module.exports.cursoAlterar = function (app, req, res, errors) {
    let curso = req.body;
    let params = req.query;

    const connection = dbConnection();

    if (!errors.isEmpty()) {
        let erros = errors.array();
        cursoModel.getCurso(curso.idCurso, connection, function (err, results) {
            let curso = results;
            if (!err) {
                usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                    if (!err) {
                        res.render("admin/alteraCurso", { usuario: results, erros: erros, curso: curso });
                    }
                    else {
                        let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                        pagina = pagina + "<h2>" + err + "</h2>";
                        res.send(pagina);
                    }
                })
            }
            else {
                let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                pagina = pagina + "<h2>" + err + "</h2>";
                res.send(pagina);
            }
        })
        return;
    }

    

    cursoModel.updateCurso(curso, connection, function (err, results) {
        if (!err) {
            cursoModel.getCurso(curso.idCurso, connection, function (err, results) {
                let curso = results;
                if (!err) {
                    usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                        if (!err) {
                            res.render("admin/alteraCurso", { usuario: results, erros: {}, curso: curso });
                        }
                        else {
                            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                            pagina = pagina + "<h2>" + err + "</h2>";
                            res.send(pagina);
                        }
                    })
                }
                else {
                    let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                    pagina = pagina + "<h2>" + err + "</h2>";
                    res.send(pagina);
                }
            })
        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }

    });
}

module.exports.excluirCurso = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    cursoModel.deleteCurso(params.idCurso, connection, function (err, results) {
        if (!err) {
            controllerUsuario.home(app,req, res);
        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
    })
}
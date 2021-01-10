const dbConnection = require("../../config/dbConnection");
const { getUsuario } = require("../models/usuarioModel");
const usuarioModel = require("../models/usuarioModel");
const controllerCurso = require("../controllers/cursoController");


module.exports.logar = function (app, req, res, errors) {
    let usuario = req.body;

    if (!errors.isEmpty()) {
        let erros = errors.array();
        res.render("login", { erros: erros, usuario: usuario });
        return;
    }

    const connection = dbConnection();

    usuarioModel.logar(usuario, connection, function (err, results) {
        if (!err) {

            if (results.length != 0) {

                controllerCurso.getCursos(results, app, req, res);
            }
            else {
                let erros = errors.array();
                res.render("login", { erros: erros, usuario: results });
            }

        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }

    })
}



module.exports.usuarioSalvar = function (app, req, res, errors) {
    let usuario = req.body;

    if (!errors.isEmpty()) {
        let erros = errors.array();
        res.render("admin/insereUsuario", { erros: erros, usuario: usuario });
        return;
    }

    const connection = dbConnection();

    usuarioModel.setUsuario(usuario, connection, function (err, results) {
        if (!err) {
            res.redirect("/");

        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }

    });
}


module.exports.usuarioAlterar = function (app, req, res, errors) {
    let usuario = req.body;

    const connection = dbConnection();

    if (!errors.isEmpty()) {
        let erros = errors.array();

        

        usuarioModel.getUsuario(usuario.idUsuario, connection, function (err, results) {
            if (!err) {
                res.render("admin/alteraUsuario", { usuario: results, erros: erros });
            }
            else {
                let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                pagina = pagina + "<h2>" + err + "</h2>";
                res.send(pagina);
            }
        })
        return;
    }

    usuarioModel.updateUsuario(usuario, connection, function (err, results) {
        if (!err) {
            usuarioModel.getUsuario(usuario.idUsuario, connection, function (err, results) {
                if (!err) {
                    res.render("admin/alteraUsuario", { usuario: results, erros: {} });
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


module.exports.getUsuarioUpdate = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
        if (!err) {
            res.render("admin/alteraUsuario", { usuario: results, erros: {} });
        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
    })
}

module.exports.home = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
        if (!err) {
            controllerCurso.getCursos(results, app, req, res);
        }
        else {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
    })
}
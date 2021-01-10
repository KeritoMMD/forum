const dbConnection = require("../../config/dbConnection");
const topicoModel = require("../models/topicoModel");
const cursoModel = require("../models/cursoModel");
const usuarioModel = require("../models/usuarioModel");

module.exports.loadTopicos = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    topicoModel.getTopicos(params.idCurso, connection, function (err, results){
        let topicos = results;
        if(!err)
        {
            cursoModel.getCurso(params.idCurso, connection, function (err, results) {
                let cursos = results;
                if (!err) {
                    usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                        if (!err) {
                            res.render("topico", { usuario: results, erros: {}, cursos: cursos, topicos: topicos });
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
        else
        {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
        
    })
}

module.exports.getTopicoSalvar = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    cursoModel.getCurso(params.idCurso, connection, function (err, results) {
        let cursos = results;
        if (!err) {
            usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                if (!err) {
                    res.render("admin/insereTopico", { usuario: results, erros: {}, cursos: cursos, topico: {} });
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


module.exports.topicoSalvar = function (app, req, res, errors) {
    let topico = req.body;
    let params = req.query;

    const connection = dbConnection();

    if(!errors.isEmpty()){
        let erros = errors.array();
        cursoModel.getCurso(params.idCurso, connection, function (err, results) {
            let cursos = results;
            if (!err) {
                usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                    if (!err) {
                        res.render("admin/insereTopico", { usuario: results, erros: erros, cursos: cursos, topico: topico });
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



    topicoModel.setTopico(topico, params.idCurso, connection, function (err, results){
        if (!err) {
            cursoModel.getCurso(params.idCurso, connection, function (err, results) {
                let cursos = results;
                if (!err) {
                    usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                        if (!err) {
                            res.render("admin/insereTopico", { usuario: results, erros: {}, cursos: cursos, topico: {} });
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

module.exports.getTopicoUpdate = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    topicoModel.getTopico(params.idTopico, connection, function (err, results) {
        let topico = results;
        if (!err) {
            usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                if (!err) {
                    res.render("admin/alteraTopico", { usuario: results, erros: {}, topico: topico });
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

module.exports.topicoAlterar = function (app, req, res, errors) {
    let topico = req.body;
    let params = req.query;

    const connection = dbConnection();

    if (!errors.isEmpty()) {
        let erros = errors.array();
        topicoModel.getTopico(topico.idTopico, connection, function (err, results) {
            let topico = results;
            if (!err) {
                usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                    if (!err) {
                        res.render("admin/alteraTopico", { usuario: results, erros: erros, topico: topico });
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

    

    topicoModel.updateTopico(topico, connection, function (err, results) {
        if (!err) {
            topicoModel.getTopico(topico.idTopico, connection, function (err, results) {
                let topico = results;
                if (!err) {
                    usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                        if (!err) {
                            res.render("admin/alteraTopico", { usuario: results, erros: {}, topico: topico });
                        }
                        else {
                            let pagina = "<h1>1Problemas de conexão com o banco de dados</h1>";
                            pagina = pagina + "<h2>" + err + "</h2>";
                            res.send(pagina);
                        }
                    })
                }
                else {
                    let pagina = "<h1>2Problemas de conexão com o banco de dados</h1>";
                    pagina = pagina + "<h2>" + err + "</h2>";
                    res.send(pagina);
                }
            })
        }
        else {
            let pagina = "<h1>3Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }

    });
}


module.exports.excluirTopico = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    topicoModel.deleteTopico(params.idTopico, connection, function (err, results) {
        if (!err) {
            topicoModel.getTopicos(params.idCurso, connection, function (err, results){
                let topicos = results;
                if(!err)
                {
                    cursoModel.getCurso(params.idCurso, connection, function (err, results) {
                        let cursos = results;
                        if (!err) {
                            usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                                if (!err) {
                                    res.render("topico", { usuario: results, erros: {}, cursos: cursos, topicos: topicos });
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
                else
                {
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
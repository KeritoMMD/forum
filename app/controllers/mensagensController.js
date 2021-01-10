const dbConnection = require("../../config/dbConnection");
const mensagensModel = require("../models/mensagensModel");
const usuarioModel = require("../models/usuarioModel");
const cursoModel = require("../models/cursoModel");
const topicoModel = require("../models/topicoModel");

module.exports.loadMensagens = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();


    mensagensModel.getMensagens(params.idTopico, connection, function (err, results){
        if(!err)
        {
            let mensagens = results;

            topicoModel.getTopico(params.idTopico, connection, function (err, results){
                let topicos = results;
                if(!err)
                {
                    cursoModel.getCurso(params.idCurso, connection, function (err, results) {
                        let cursos = results;
                        if (!err) {
                            usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                                if (!err) {
                                    res.render("mensagens", {mensagens: mensagens, usuario: results, topicos: topicos, cursos: cursos, mensagem: {}, erros: {}});
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
        else
        {
            let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
            pagina = pagina + "<h2>" + err + "</h2>";
            res.send(pagina);
        }
        
    })
}

module.exports.mensagemSalvar = function (app, req, res, errors) {
    let mensagem = req.body;
    let params = req.query;

    const connection = dbConnection();

    if(!errors.isEmpty()){
        let erros = errors.array();
        mensagensModel.getMensagens(params.idTopico, connection, function (err, results){
            if(!err)
            {
                
                let mensagens = results;
    
                topicoModel.getTopico(params.idTopico, connection, function (err, results){
                    let topicos = results;
                    if(!err)
                    {
                        cursoModel.getCurso(topicos[0].idCurso, connection, function (err, results) {
                            let cursos = results;
                            if (!err) {
                                usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                                    if (!err) {
                                        res.render("mensagens", {mensagens: mensagens, usuario: results, topicos: topicos, cursos: cursos, mensagem: mensagem, erros: erros});
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
            else
            {
                let pagina = "<h1>Problemas de conexão com o banco de dados</h1>";
                pagina = pagina + "<h2>" + err + "</h2>";
                res.send(pagina);
            }
            
        })
        return;
    }



    mensagensModel.setMensagem(mensagem, params.idUsuario, params.idTopico, connection, function (err, results){
        if (!err) {
            mensagensModel.getMensagens(params.idTopico, connection, function (err, results){
                if(!err)
                {
                    let mensagens = results;
        
                    topicoModel.getTopico(params.idTopico, connection, function (err, results){
                        let topicos = results;
                        if(!err)
                        {
                            cursoModel.getCurso(topicos[0].idCurso, connection, function (err, results) {
                                let cursos = results;
                                if (!err) {
                                    usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                                        if (!err) {
                                            res.render("mensagens", {mensagens: mensagens, usuario: results, topicos: topicos, cursos: cursos, mensagem: mensagem, erros: {}});
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
        
    });
}


module.exports.excluirMensagem = function (app, req, res) {
    let params = req.query;

    const connection = dbConnection();

    mensagensModel.deleteMensagem(params.idMensagem, connection, function (err, results) {
        if (!err) {
            mensagensModel.getMensagens(params.idTopico, connection, function (err, results){
        if(!err)
        {
            let mensagens = results;

            topicoModel.getTopico(params.idTopico, connection, function (err, results){
                let topicos = results;
                if(!err)
                {
                    cursoModel.getCurso(topicos[0].idCurso, connection, function (err, results) {
                        let cursos = results;
                        if (!err) {
                            usuarioModel.getUsuario(params.idUsuario, connection, function (err, results) {
                                if (!err) {
                                    res.render("mensagens", {mensagens: mensagens, usuario: results, topicos: topicos, cursos: cursos, mensagem: {}, erros: {}});
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


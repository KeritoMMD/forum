const {check, validationResult} = require("express-validator");

const controllerLogin = require("../controllers/loginController");
const controllerTopico = require("../controllers/topicoController");
const controllerMensagens = require("../controllers/mensagensController");
const controllerUsuario = require("../controllers/usuarioController");



module.exports = {
    rotaLogin: function(app){
        app.get("/", function(req, res){
            res.render("login", {login: {}, erros: {} });
        });
    },

    rotaLoginAcessar: function(app){
        app.post("/home/login", [
            check("inputUsuario").isLength({min: 1}).withMessage("Usuário é obrigatório"),
            check("inputSenha").isLength({min: 1}).withMessage("Senha é obrigatória"),
        ], function(req, res){
            const errors = validationResult(req);
            controllerLogin.logar(app, req, res, errors)

        });

    },

    rotaHome: function(app){
        app.get("/home", function(req, res){
            res.render("home");
        });
    },

    

    rotaTopico: function(app){
        app.get("/topico", function(req, res){
            controllerTopico.loadTopicos(app, req, res);
        });
    },

    rotaMensagens: function(app){
        app.get("/mensagens", function(req, res){
            controllerMensagens.loadMensagens(app, req, res);
        });
    },


    rotaInsereUsuario: function(app){
        app.get("/insereUsuario", function(req, res){
            res.render("admin/insereUsuario", {usuario: {}, erros: {} });
        });
    },

    rotaSalvarUsuario: function(app){
        app.post("/usuario/salvar", [
            check("inputNome").isLength({min: 1}).withMessage("Nome é obrigatório"),
            check("inputProntuario").isLength({min: 1}).withMessage("Prontuário é obrigatório"),
            check("inputSenha").isLength({min: 1}).withMessage("Senha é obrigatória"),

        ], function(req, res){
            const errors = validationResult(req);
            controllerUsuario.usuarioSalvar(app, req, res, errors)

        });

    },


    rotaAlteraUsuario: function(app){
        app.get("/alteraUsuario", function(req, res){
            res.render("admin/alteraUsuario", {usuario: {}, erros: {} });
        });
    },


}
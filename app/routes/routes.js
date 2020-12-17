const {check, validationResult} = require("express-validator");

const controllerLogin = require("../controllers/loginController");
const controllerTopico = require("../controllers/topicoController");
const controllerMensagens = require("../controllers/mensagensController");
const controllerUsuario = require("../controllers/usuarioController");
const controllerCurso = require("../controllers/cursoController");



module.exports = {

    //Login
    rotaLogin: function(app){
        app.get("/", function(req, res){
            res.render("login", {login: {}, erros: {} });
        });
    },

    rotaLoginAcessar: function(app){
        app.post("/cursos/login", [
            check("inputUsuario").isLength({min: 1}).withMessage("Usuário é obrigatório"),
            check("inputSenha").isLength({min: 1}).withMessage("Senha é obrigatória"),
        ], function(req, res){
            const errors = validationResult(req);
            controllerLogin.logar(app, req, res, errors)

        });

    },

    rotaHome: function(app){
        app.get("/cursos", function(req, res){
            res.render("cursos");
        });
    },

    

    //Tópicos
    rotaTopicos: function(app){
        app.get("/topicos", function(req, res){
            controllerTopico.loadTopicos(app, req, res);
        });
    },

    rotaInsereTopico: function(app){
        app.get("/insereTopico", function(req, res){
            res.render("admin/insereTopico",  {topico: {}, erros: {} });
        });
    },



    //Mensagens
    rotaMensagens: function(app){
        app.get("/mensagens", function(req, res){
            controllerMensagens.loadMensagens(app, req, res);
        });
    },



    //Usuários
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




    //Cursos
    rotaInsereCurso: function(app){
        app.get("/insereCurso", function(req, res){
            res.render("admin/insereCurso", {curso: {}, erros: {} });
        });
    },


    rotaSalvarCurso: function(app){
        app.post("/curso/salvar", [
            check("inputCurso").isLength({min: 1}).withMessage("Nome do curso é obrigatório"),
        
        ], function(req, res){
            const errors = validationResult(req);
            controllerCurso.cursoSalvar(app, req, res, errors)

        });

    },

    rotaAlteraCurso: function(app){
        app.get("/alteraCurso", function(req, res){
            res.render("admin/alteraCurso", {curso: {}, erros: {} });
        });
    },


    rotaInsereAlunoCurso: function(app){
        app.get("/insereAlunoCurso", function(req, res){
            res.render("admin/insereAlunoCurso", {curso: {}, erros: {} });
        });
    },


}
const {check, validationResult} = require("express-validator");

const controllerTopico = require("../controllers/topicoController");
const controllerMensagens = require("../controllers/mensagensController");
const controllerUsuario = require("../controllers/usuarioController");
const controllerCurso = require("../controllers/cursoController");



module.exports = {

    //Login
    rotaLogin: function(app){
        app.get("/", function(req, res){
            res.render("login", {usuario: {}, erros: {} });
        });
    },

    rotaLoginAcessar: function(app){
        app.post("/cursos/login", [
            check("prontuario").isLength({min: 1}).withMessage("Prontuário é obrigatório"),
            check("senha").isLength({min: 1}).withMessage("Senha é obrigatória"),
        ], function(req, res){
            const errors = validationResult(req);
            controllerUsuario.logar(app, req, res, errors)

        });

    },

    rotaHome: function(app){
        app.get("/home", function(req, res){
            controllerUsuario.home(app,req, res);
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
            controllerTopico.getTopicoSalvar(app,req, res);
        });
    },

    rotaSalvarTopico: function(app){
        app.post("/topico/salvar", [
            check("titulo").isLength({min: 1}).withMessage("Título do tópico é obrigatório").isLength({max: 100}).withMessage("Título não pode ter mais do que 100 caracteres!"),
            check("descricao").isLength({min: 1}).withMessage("Descrição do tópico é obrigatório").isLength({max: 200}).withMessage("Descrição não pode ter mais do que 200 caracteres!"),
        
        ], function(req, res){
            const errors = validationResult(req);
            controllerTopico.topicoSalvar(app, req, res, errors)

        });

    },

    rotaAlteraTopico: function(app){
        app.get("/alteraTopico", function(req, res){
            controllerTopico.getTopicoUpdate(app,req, res);
        });
    },

    rotaAlterarTopico: function(app){
        app.post("/topico/alterar", [
            check("titulo").isLength({min: 1}).withMessage("Título do tópico é obrigatório").isLength({max: 100}).withMessage("Título não pode ter mais do que 100 caracteres!"),
            check("descricao").isLength({min: 1}).withMessage("Descrição do tópico é obrigatório").isLength({max: 500}).withMessage("Descrição não pode ter mais do que 500 caracteres!"),
            check("idTopico").isLength({min: 1}).withMessage("ID é obrigatório"),
            check("idCurso").isLength({min: 1}).withMessage("ID é obrigatório"),
        

        ], function(req, res){
            const errors = validationResult(req);
            controllerTopico.topicoAlterar(app, req, res, errors)

        });

    },

    rotaExcluiTopico: function(app){
        app.get("/topico/excluir", function(req, res){
            controllerTopico.excluirTopico(app,req, res);
        });
    },




    //Mensagens
    rotaMensagens: function(app){
        app.get("/mensagens", function(req, res){
            controllerMensagens.loadMensagens(app, req, res);
        });
    },

    rotaSalvarMensagem: function(app){
        app.post("/mensagem/salvar", [
            check("conteudo").isLength({min: 1}).withMessage("A mensagem não pode ser vazia.").isLength({max: 300}).withMessage("A mensagem deve ter no máximo 300 caracateres."),
        
        ], function(req, res){
            const errors = validationResult(req);
            controllerMensagens.mensagemSalvar(app, req, res, errors)

        });

    },


    rotaExcluiMensagem: function(app){
        app.get("/mensagem/excluir", function(req, res){
            controllerMensagens.excluirMensagem(app,req, res);
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
            check("nome").isLength({min: 1}).withMessage("Nome é obrigatório").isLength({max: 50}).withMessage("Nome deve ter no máximo 50 caracteres."),
            check("prontuario").isLength({min: 1}).withMessage("Prontuário é obrigatório").isLength({max: 20}).withMessage("Prontuário deve ter no máximo 20 caracteres."),
            check("senha").isLength({min: 1}).withMessage("Senha é obrigatória"),
            check("tipo").isLength({min: 1}).withMessage("Tipo é obrigatório"),

        ], function(req, res){
            const errors = validationResult(req);
            controllerUsuario.usuarioSalvar(app, req, res, errors)

        });

    },


    rotaAlteraUsuario: function(app){
        app.get("/alteraUsuario", function(req, res){
            controllerUsuario.getUsuarioUpdate(app,req, res);
        });
    },

    rotaAlterarUsuario: function(app){
        app.post("/usuario/alterar", [
            check("nome").isLength({min: 1}).withMessage("Nome é obrigatório").isLength({max: 50}).withMessage("Nome deve ter no máximo 50 caracteres."),
            check("prontuario").isLength({min: 1}).withMessage("Prontuário é obrigatório").isLength({max: 20}).withMessage("Prontuário deve ter no máximo 20 caracteres."),
            check("senha").isLength({min: 1}).withMessage("Senha é obrigatória"),
            check("tipo").isLength({min: 1}).withMessage("Tipo é obrigatório"),
            check("idUsuario").isLength({min: 1}).withMessage("ID é obrigatório"),

        ], function(req, res){
            const errors = validationResult(req);
            controllerUsuario.usuarioAlterar(app, req, res, errors)

        });

    },




    //Cursos



    rotaInsereCurso: function(app){
        app.get("/insereCurso", function(req, res){
            controllerCurso.getCursoSalvar(app,req, res);
        });
    },


    rotaSalvarCurso: function(app){
        app.post("/curso/salvar", [
            check("nome").isLength({min: 1}).withMessage("Nome do curso é obrigatório"),
        
        ], function(req, res){
            const errors = validationResult(req);
            controllerCurso.cursoSalvar(app, req, res, errors)

        });

    },

    rotaAlteraCurso: function(app){
        app.get("/alteraCurso", function(req, res){
            controllerCurso.getCursoUpdate(app,req, res);
        });
    },


    rotaAlterarCurso: function(app){
        app.post("/curso/alterar", [
            check("nome").isLength({min: 1}).withMessage("Nome do curso é obrigatório"),
            check("idCurso").isLength({min: 1}).withMessage("ID é obrigatório"),

        ], function(req, res){
            const errors = validationResult(req);
            controllerCurso.cursoAlterar(app, req, res, errors)

        });

    },

    rotaExcluiCurso: function(app){
        app.get("/curso/excluir", function(req, res){
            controllerCurso.excluirCurso(app,req, res);
        });
    },







    rotaInsereAlunoCurso: function(app){
        app.get("/insereAlunoCurso", function(req, res){
            res.render("admin/insereAlunoCurso", {curso: {}, erros: {} });
        });
    },


}
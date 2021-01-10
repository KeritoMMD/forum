let app = require("./config/server");

const rotas = require("./app/routes/routes");
const { rotaAlteraCurso } = require("./app/routes/routes");

rotas.rotaLogin(app);
rotas.rotaLoginAcessar(app);

rotas.rotaHome(app);

rotas.rotaTopicos(app);
rotas.rotaInsereTopico(app);
rotas.rotaSalvarTopico(app);
rotas.rotaAlteraTopico(app);
rotas.rotaAlterarTopico(app);
rotas.rotaExcluiTopico(app);

rotas.rotaMensagens(app);
rotas.rotaSalvarMensagem(app);
rotas.rotaExcluiMensagem(app);


rotas.rotaInsereUsuario(app);
rotas.rotaSalvarUsuario(app);
rotas.rotaAlteraUsuario(app);
rotas.rotaAlterarUsuario(app);


rotas.rotaInsereCurso(app);
rotas.rotaSalvarCurso(app);
rotas.rotaAlteraCurso(app);
rotas.rotaAlterarCurso(app);
rotas.rotaExcluiCurso(app);
rotas.rotaInsereAlunoCurso(app);
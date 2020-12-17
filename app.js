let app = require("./config/server");

const rotas = require("./app/routes/routes");
const { rotaAlteraCurso } = require("./app/routes/routes");

rotas.rotaLogin(app);
rotas.rotaLoginAcessar(app);

rotas.rotaHome(app);

rotas.rotaTopicos(app);
rotas.rotaInsereTopico(app);

rotas.rotaMensagens(app);


rotas.rotaInsereUsuario(app);
rotas.rotaSalvarUsuario(app);
rotas.rotaAlteraUsuario(app);


rotas.rotaInsereCurso(app);
rotas.rotaSalvarCurso(app);
rotas.rotaAlteraCurso(app);
rotas.rotaInsereAlunoCurso(app);
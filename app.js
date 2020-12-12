let app = require("./config/server");

const rotas = require("./app/routes/routes");

rotas.rotaLogin(app);
rotas.rotaLoginAcessar(app);

rotas.rotaHome(app);

rotas.rotaTopico(app);

rotas.rotaMensagens(app);


rotas.rotaInsereUsuario(app);
rotas.rotaSalvarUsuario(app);
rotas.rotaAlteraUsuario(app);
module.exports = {
    logar: function(usuario, connection, callback){
        let sql = "select * from usuarios where prontuario = ? and senha = ?";
        connection.query(sql, [usuario.prontuario, usuario.senha],callback);
    },


    setUsuario: function(usuario, connection, callback){
        let sql = "insert into usuarios set ?";
        connection.query(sql, usuario, callback);
    },

    getUsuario: function(idUsuario, connection, callback){
        let sql = "select * from usuarios where idUsuario=" + idUsuario;
        connection.query(sql, callback);
    },

    updateUsuario: function(usuario, connection, callback){
        let sql = "update usuarios set nome=?, prontuario=?, tipo=?, senha=? where idUsuario = ?"
        connection.query(sql, [usuario.nome, usuario.prontuario, usuario.tipo, usuario.senha, usuario.idUsuario], callback);
    },
}
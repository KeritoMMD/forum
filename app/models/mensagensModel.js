module.exports = {
    getMensagens: function(idTopico, connection, callback){
        let sql = "select m.*, u.nome, DATE_FORMAT(STR_TO_DATE(m.dataCriacao, '%Y-%m-%d'), '%d/%m/%Y') as 'dataCriacaom' FROM mensagens m, usuarios u WHERE m.idTopico= " + idTopico + 
        " AND m.idUsuario = u.idUsuario  ORDER BY m.dataCriacao ASC";
        connection.query(sql, callback);
    },

    setMensagem: function(mensagem, idUsuario, idTopico, connection, callback){
        let sql = "insert into mensagens set idUsuario = ?, idTopico =?, dataCriacao = curdate(), conteudo = ?";
        connection.query(sql, [idUsuario, idTopico, mensagem.conteudo], callback);
    },

    deleteMensagem: function(idMensagem, connection, callback){
        let sql = "delete from mensagens where idMensagem = " + idMensagem;
        connection.query(sql, callback);
    },
}

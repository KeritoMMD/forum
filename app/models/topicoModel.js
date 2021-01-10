module.exports = {
    getTopicos: function(idCurso, connection, callback){
        let sql = "select idTopico, idCurso, titulo, DATE_FORMAT(STR_TO_DATE(dataCriacao, '%Y-%m-%d'), '%d/%m/%Y') as 'dataCriacao', descricao from topicos where idCurso = " + idCurso;
        connection.query(sql, callback);
    },

    getTopico: function(idTopico, connection, callback){
        let sql = "select idTopico, idCurso, titulo, DATE_FORMAT(STR_TO_DATE(dataCriacao, '%Y-%m-%d'), '%d/%m/%Y') as 'dataCriacao', descricao from topicos where idTopico = " + idTopico;
        connection.query(sql, callback);
    },

    setTopico: function(topico, idCurso, connection, callback){
        let sql = "insert into topicos set idCurso = ?, titulo =?, dataCriacao = curdate(), descricao = ?";
        connection.query(sql, [idCurso, topico.titulo, topico.descricao], callback);
    },

    updateTopico: function(topico, connection, callback){
        let sql = "update topicos set titulo=?, descricao=? where idTopico = ?"
        connection.query(sql, [topico.titulo, topico.descricao, topico.idTopico], callback);
    },

    deleteTopico: function(idTopico, connection, callback){
        let sql = "delete from topicos where idTopico = " + idTopico;
        connection.query(sql, callback);
    },
}


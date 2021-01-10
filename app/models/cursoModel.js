module.exports = {
    setCurso: function(curso, connection, callback){
        let sql = "insert into cursos set ?";
        connection.query(sql, curso, callback);
    },

    getCursos: function(connection, callback){
        let sql = "select * from cursos";
        connection.query(sql,callback);
    },

    getCurso: function(idCurso, connection, callback){
        let sql = "select * from cursos where idCurso=" + idCurso;
        connection.query(sql, callback);
    },

    updateCurso: function(curso, connection, callback){
        let sql = "update cursos set nome=? where idCurso = ?"
        connection.query(sql, [curso.nome, curso.idCurso], callback);
    },

    deleteCurso: function(idCurso, connection, callback){
        let sql = "delete from cursos where idCurso = " + idCurso;
        connection.query(sql, callback);
    },
}
module.exports = {
    getMensagens: function(connection, callback){
        let sql = "select * from estudantes";
        connection.query(sql, callback);
    },
}
let mysql = require("mysql");

module.exports = function(){
    return connection = mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "ifsp@1234",
        database: "forum"
    });
}
var connection = require('../modules/connection');
var users = {};

users.buscarUsuario = function(nombre,callback) {
	if (connection) {
		var sql = "SELECT * FROM usuarios WHERE nombre = '"+nombre+"'";
		connection.query(sql,function(error,row) {
			if (error) {
				throw error
			}else{
				callback(null,row)
			}
		})
	}
}

module.exports = users;
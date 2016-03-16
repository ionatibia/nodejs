var connection = require('./connection');
var eventos = {};

eventos.eventsList = function(callback) {
	if (connection) {
		var sql = "SELECT e.id_evento, e.nombreEvento, e.fecha_inicio, e.fecha_fin, u.id_usuario, u.nombreUsuario FROM usuarios u INNER JOIN eventos e group by e.id_evento";
		connection.query(sql,function(error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}
		})//connection.query
	}
}

module.exports = eventos;
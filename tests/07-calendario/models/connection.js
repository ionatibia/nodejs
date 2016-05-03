var mysql = require('mysql'),

connection = mysql.createConnection(
	{ 
		host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost' || process.env.IP,
		port :process.env.OPENSHIFT_MYSQL_DB_PORT || '3306',
		user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root' || process.env.C9_USER,
		password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'nati666000' || '',
		database: 'calendario'

		/*/**********************************************************************
		 * Volver a dejar la conexión como estaba
		 */
		 /*
		 host: process.env.IP,
		 user: 'root',
		 password: '',
		 database: 'controlfid'
		 */
		 
	}
);//.connection = mysql.createConnection

module.exports = connection;

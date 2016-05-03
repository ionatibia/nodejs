var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'zubiri',
   database: 'node',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

var query = connection.query('INSERT INTO una VALUES "otromas" ', function(error){
      if(error){
         throw error;
      }else{
      	cosole.log('Insertado correctamente');
      }
   }
);

var query = connection.query('SELECT indice,nombre FROM una', function(error,rows, result){
      if(error){
         throw error;
      }else{
      	for (var i = 0; i < rows.length; i++) {
      		console.log('Id: ',rows[i].indice+' Nombre: ',rows[i].nombre);
      	}
      }
   }
);
connection.end();

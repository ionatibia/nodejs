var multer = require('multer');
var fs = require('fs');

//comprobar si existen carpetas para subir, si no existen las crea IMPORTANTE tienen que estar creadas las carpetas public/images 
/*****************************************/
fs.stat('./public/images/uploads', function(err, stats){
  if(err){
    console.log(err);
    fs.mkdir('./public/images/uploads', function(error,info){
    	if (error) {
    		console.log(error)
    	}else{
    		console.log('creada carpeta uploads');

        //profile
        fs.stat('./public/images/uploads/profile', function(err, stats){
          if(err){
            console.log(err);
            fs.mkdir('./public/images/uploads/profile', function(error,info){
              if (error) {
                console.log(error)
              }else{
                console.log('creada carpeta profile');
              }
            })
          }
        });//fin profile

        //images
        fs.stat('./public/images/uploads/images', function(err, stats){
          if(err){
            console.log(err);
            fs.mkdir('./public/images/uploads/images', function(error,info){
              if (error) {
                console.log(error)
              }else{
                console.log('creada carpeta images');
              }
            })
          }
        });//fin images

        //videos
        fs.stat('./public/images/uploads/videos', function(err, stats){
          if(err){
            console.log(err);
            fs.mkdir('./public/images/uploads/videos', function(error,info){
              if (error) {
                console.log(error)
              }else{
                console.log('creada carpeta videos');
              }
            })
          }
        });//fin videos
    	}//fin else
    })//fin mkdir uploads
  }
});


/*****************************************/
			//FIN comprobaciones
/*****************************************/

/***************************************/
/* filtro imagenes */
/***************************************/


function fileFilterImage (req, file, cb){
  	var type = file.mimetype;
  	
  	if (type == "image/jpg" || type == "image/jpeg" || type == "image/png") {
    	cb(null, true);
  	}else {
    	cb(null, false);
  	}
}

/******************************************/

/***************************************/
/* filtro videos */
/***************************************/


function fileFilterVideo (req, file, cb){
    var type = file.mimetype;
    
    if (type == "video/mp4" || type == "video/avi" || type == "video/mpeg") {
      cb(null, true);
    }else {
      cb(null, false);
    }
}

/******************************************/





/*  Para guardar la foto de perfil en /public/images/uploads/profile + correoUsuario.extension   */
/***************************************************************/
exports.guardarFotoPerfil = function(req,res) {

	var nombre;
	var path;

  //creamos un objeto de almacenamiento
	var storagePerfil = multer.diskStorage({
      //Creamos el destino de la imagen
  		destination: function (req, file, cb) {
  			path = './public/images/uploads/profile/';// Directirio donde se guardaran los archivos.
    		cb(null, path);//callback con el path
  		},
      //creamos el nombre de la imagen
  		filename: function (req, file, cb) {
        //separo el mimetype (Ej: image/jpg) para coger la extension del archivo
  			var cachos = file.mimetype.split('/');
        //creo el nombre a partir del correo que se envía con el formulario (puedes usar el correo guardado en la sesion del cliente)
  			nombre = req.body.correo+'.'+cachos[1];
    		cb(null, nombre);
  		}
	});//storagePerfil

  //creamos el objeto con los objetos de almacenamiento, el filtro definido antes y los límites que queramos
	var uploadPerfil = multer({ storage: storagePerfil, fileFilter: fileFilterImage, limits: {fileSize: 512000}});

  //ejecutamos la subida del archivo poniendo el id de la etiqueta html del fichero
	uploadPerfil.single('imagenPerfil')(req, res, function (err) {
    	if (err) {
    	  	console.log(err);
      		res.send(err);
    	}
    	//responde con la URL de la imagen
    	res.send(path+nombre);
  	})
}
/***************************************************************/

/*  Para guardar una foto en /public/images/uploads/images/correoUsuario   */
/***************************************************************/
exports.guardarImagen = function(req,res) {

  //creamos un objeto de almacenamiento
	var storageImage = multer.diskStorage({
		//Creamos el destino de la imagen
		destination: function (req,file,cb) {
      correo = req.body.correo;//el destino siempre será public/images/uploads/images/correoUsuario/ (puedes usar el correo guardado en la sesion del cliente)
      path = "./public/images/uploads/images/"+correo+"/";
      //comprobamos que la carpeta exista, si no la creamos
      comprobarCarpeta(path,function(error,result) {
        if (error) {
          console.log(error);
        }else{
          //Hasta que no crea la carpeta no sigue el programa
          cb(null,path);
        }
      })//comprobar path
		},//destination
    //creamos el nombre de la imagen
		filename: function (req,file,cb) {
      var fecha = new Date();
			var extensionArray = file.mimetype.split('/');
      //creo el nombre con la fecha+extension
			nombreImagen = fecha.getDate().toString()+fecha.getMonth().toString()+fecha.getHours().toString()+fecha.getMinutes().toString()+fecha.getSeconds().toString()+'.'+extensionArray[1];
			cb(null,nombreImagen);
		}//filename
	});//storageImage

  //creamos el objeto con los objetos de almacenamiento, el filtro definido antes y los límites que queramos
	var uploadImage = multer({ storage: storageImage, fileFilter: fileFilterImage, limits: {fileSize: 1512000}});

  //ejecutamos la subida del archivo poniendo el id de la etiqueta html del fichero
  uploadImage.single('imagen')(req, res, function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    }else{
      //responde con la URL relativa de la imagen (aquí puedes añadir el DNS del servidor para crear la URL completa para usarla en el src de una imagen)
      res.send(path+nombreImagen);
    }
  })//uploadImage

  /***************************************/
  /* funcion para comprobar y crear la carpeta del usuario*/
  /***************************************/
  function comprobarCarpeta(path,callback) {
    fs.stat(path,function(error,stats) {
      if (error) {
        fs.mkdir(path, function(error,info) {
          if (error) {
            console.log(error);
            callback(error,null);
          }else{
            console.log("Creada carpeta de ususario en images");
            callback(null,"ok");
          }
        })
      }
    })
  }
  /******************************************/
 
}
/***************************************************************/

/*  Para guardar un video en /public/uploads/videos/correoUsuario   */
/***************************************************************/

exports.guardarVideo = function(req,res) {

  //creamos un objeto de almacenamiento
  var storageVideo = multer.diskStorage({
    //Creamos el destino de la imagen
    destination: function (req,file,cb) {
      correo = req.body.correo;//el destino siempre será public/images/uploads/videos/correoUsuario/ (puedes usar el correo guardado en la sesion del cliente)
      path = "./public/images/uploads/videos/"+correo+"/";
      //comprobamos que la carpeta exista, si no la creamos
      comprobarCarpeta(path,function(error,result) {
        if (error) {
          console.log(error);
        }else{
          //Hasta que no crea la carpeta no sigue el programa
          cb(null,path);
        }
      })//comprobar path
    },//destination
    //creamos el nombre de la imagen
    filename: function (req,file,cb) {
      var fecha = new Date();
      var extensionArray = file.mimetype.split('/');
      console.log(extensionArray[0]+" "+extensionArray[1]);
      //creo el nombre con la fecha+extension
      nombreVideo = fecha.getDate().toString()+fecha.getMonth().toString()+fecha.getHours().toString()+fecha.getMinutes().toString()+fecha.getSeconds().toString()+'.'+extensionArray[1];
      cb(null,nombreVideo);
    }//filename
  });//storageVideo

  //creamos el objeto con los objetos de almacenamiento, el filtro definido antes y los límites que queramos
  var uploadVideo = multer({ storage: storageVideo, fileFilter: fileFilterVideo, limits: {fileSize: 15120000}});

  //ejecutamos la subida del archivo poniendo el id de la etiqueta html del fichero
  uploadVideo.single('video')(req, res, function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    }else{
      //responde con la URL relativa de la imagen (aquí puedes añadir el DNS del servidor para crear la URL completa para usarla en el src de una imagen)
      res.send(path+nombreVideo);
    }
  })//uploadImage

  /***************************************/
  /* funcion para comprobar y crear la carpeta del usuario*/
  /***************************************/
  function comprobarCarpeta(path,callback) {
    fs.stat(path,function(error,stats) {
      if (error) {
        fs.mkdir(path, function(error,info) {
          if (error) {
            console.log(error);
            callback(error,null);
          }else{
            console.log("Creada carpeta de ususario en videos");
            callback(null,"ok");
          }
        })
      }
    })
  }
  /******************************************/
}
/***************************************************************/
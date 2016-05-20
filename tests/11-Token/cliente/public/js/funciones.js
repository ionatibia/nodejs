$(document).ready(function() {
	
	//yo guardo el token en una variable... tu lo guardarías en la session del cliente
	var token = "";

	//para crear usuario
	$('#signup').submit(function(event) {
		event.preventDefault();
		var data = $(this).serializeArray();

		$.ajax({
			url: 'http://localhost:3000/auth/signup',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function (data) {
				token = data.token;
				alert(token);//enseñamos el token que ha mandado la api y lo guardo en la variable
			}
		})
		.fail(function() {
			console.log("error");
		})		
	});


	//login de usuarios
	$('#login').submit(function(event) {
		event.preventDefault();
		var data = $(this).serializeArray();

		$.ajax({
			url: 'http://localhost:3000/auth/login',
			type: 'post',
			dataType: 'json',
			data: data,
			success: function (data) {
				token = data.token;
				alert(token);//enseñamos el token que ha mandado la api y lo guardo en la variable
			}
		})
		.fail(function() {
			console.log("error");
		})		
	});


	//para entrar en una página privada
	$('#privado').click(function(event) {
		//si localmente no tengo el token hay que hacer login
		if (token == "") {
			//a login
			alert("No tienes token");
		}else{
			$.ajax({
				url: 'http://localhost:3000/private',
				type: 'get',
				dataType: 'html',
				//esto es lo IMPORTANTE añadir el atributo headers que es un objeto con el atributo 'x-access-token' (lo mismo que en el servidor) + el valor del token guardado
				headers:{
					'x-access-token':token
				},
				success: function (data) {
					alert(data);//la api me devuelve el _id de usuario que ha decodificado desde el token enviado 
				}
			})
			.fail(function() {
				console.log("error");
			})	
		}
	});

});
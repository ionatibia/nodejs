jQuery(document).ready(function($) {

	$('#formularioNombre').submit(function(event) {
		event.preventDefault();
		var formData = $(this).serializeArray();

		$.ajax({
			type: "post",
			url: '/addUser',
			dataType: 'json',
			data:formData,
			success: function (data) {
				console.log(data);
				var usuario = "Usuario: "+data.nombre+",  Apellido: "+data.apellido;
				$('#usuario').html(usuario);
			}
		});//ajax	
	});//submit
});
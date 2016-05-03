jQuery(document).ready(function($) {
	$('#formulario').submit(function(event) {
		
		console.log("submit");
		/*parar el formulario*/
		event.preventDefault();
		/*limpiar el div contentDiv*/
		$('#contentDiv').html('');

		var formData = $(this).serializeArray();

		$.ajax({
			type: "POST",
			url: '/user',
			dataType: 'json',
			data:formData,
			success: function (data) {
				console.log(data);
				var usuario = "Usuario: "+data.nombre+"<br>Apellido: "+data.apellido;
				$('#contentDiv').html(usuario);
			}
		});
		
		
	});
});
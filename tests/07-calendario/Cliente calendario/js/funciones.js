$(document).ready(function() {

    $.ajax({
      url: 'http://localhost:3000/eventsList',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        //console.log(data);
        var eventos = [];
        for (var i = 0; i < data.length; i++) {
          var evento = {id: data[i].id_evento,title: data[i].nombreEvento,start:data[i].fecha_inicio,apuntados:data[i].nombreUsuario};
          if (data[i].fecha_fin != null) {
            evento.end = data[i].fecha_fin;
          }
          eventos.push(evento);
        }
        console.log(eventos);
        $('#calendar').fullCalendar({
          theme:true,
         /* dayClick: function(date, jsEvent, view) {

            alert('Clicked on: ' + date.format());

            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

            alert('Current view: ' + view.name);

            // change the day's background color just for fun
            $(this).css('background-color', 'red');

        },*/
        eventClick: function(calEvent, jsEvent, view) {
          //borrar
          /*if (confirm("Seguro que quieres borrar el evento "+calEvent._id+"???")) {
            $('#calendar').fullCalendar( 'removeEvents',calEvent._id );
          }*/
           //calEvent.title = "CLICKED!";

           // $('#calendar').fullCalendar('updateEvent', calEvent);
           alert(calEvent.apuntados);
        },
        selectable: true,
          selectHelper: true,
          select: function(start, end) {
            var title = prompt('Event Title:');
            var inicio = prompt('cuando empieza: ');
            var final = prompt('Cuando acaba: ');
            var eventData;
            if (title) {
              eventData = {
                title: title,
                start: inicio,
                end: final
              };
              $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            }
            $('#calendar').fullCalendar('unselect');
          },
       /* eventMouseover: function(event, jsEvent, view) {
          alert(event.title);
        },*/
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          themeButtonIcons:{
            prev: 'seek-prev',
        next: 'circle-triangle-e'
        /*prevYear: 'seek-prev',
        nextYear: 'seek-next'*/
      },
          defaultDate: '2016-01-12',
          editable: true,
          eventLimit: true, // allow "more" link when too many events
         /* events: [
            {
              title: 'All Day Event',
              start: '2016-01-01'
            },
            {
              title: 'Long Event',
              start: '2016-01-07',
              end: '2016-01-10'
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: '2016-01-09T16:00:00'
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: '2016-01-16T16:00:00'
            },
            {
              title: 'Conference',
              start: '2016-01-11',
              end: '2016-01-13'
            },
            {
              title: 'Meeting',
              start: '2016-01-12T10:30:00',
              end: '2016-01-12T12:30:00'
            },
            {
              title: 'Lunch',
              start: '2016-01-12T12:00:00'
            },
            {
              title: 'Meeting',
              start: '2016-01-12T14:30:00'
            },
            {
              title: 'Happy Hour',
              start: '2016-01-12T17:30:00'
            },
            {
              title: 'Dinner',
              start: '2016-01-12T20:00:00'
            },
            {
              title: 'Birthday Party',
              start: '2016-01-13T07:00:00'
            },
            {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: '2016-01-28'
            }
          ]*/

          events: eventos
        });
      }
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
    
    
  });
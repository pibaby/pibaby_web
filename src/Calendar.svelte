<script>
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import { afterUpdate } from 'svelte';
  export let view
  let initialView = "dayGridWeek"

  export let events = [
      {
          title: 'All Day Event',
          start: '2018-01-01',
        },
      {
          title: 'Long Event',
          start: '2018-01-07',
          end: '2018-01-10'
        },
    ]

    afterUpdate(() => {
      switch (view) {
        case 7:
            initialView = "dayGridWeek"
          break;
        case 30:
            initialView = "dayGridMonth"
          break;
        case 3:
            initialView = "dayGridThreeDay"
          break;
        
        default:
            initialView = "dayGridWeek"
          
      }
      var calendarEl = document.getElementById('calendar');
        try{
            calendarEl.removeChild()
          }
        catch(e){

          }

      var calendar = new Calendar(calendarEl, {
          plugins: [ dayGridPlugin, timeGridPlugin ],
          initialDate: new Date(), // today
          timeZone:'local',
          views: {
              dayGridThreeDay: {
                  type: 'dayGrid',
                  duration: { days: 3 },
                  buttonText: '3 day'
              }
          },
          format: "yyyy-MM-dd'T'HH:mm:ssXXX",
          initialView: initialView,
          events: events,
        });

      calendar.render();
    });

</script>

<div id="calendar"/>


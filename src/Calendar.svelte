<script>
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import { afterUpdate } from 'svelte';

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
      console.log("events in CALENDAR -->", events)
      var calendarEl = document.getElementById('calendar');

      var calendar = new Calendar(calendarEl, {
          plugins: [ dayGridPlugin, timeGridPlugin ],
          initialDate: new Date(), // today
          initialView: 'timeGridWeek',
          events: events
        });

      calendar.render();
    });

</script>

<div id="calendar"/>


<script>
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import { afterUpdate } from 'svelte';
  import Dialog from './Dialog.svelte'
  import { getContext } from 'svelte';

  export let view
  let initialView = "dayGridWeek"
  const { open } = getContext('simple-modal');

  const onCancel = (text) => {
      name = '';
      status = -1;
  }

  const onOkay = (text) => {
      name = text;
      status = 1;
  }

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
            initialView = "timeGridWeek"
          break;
        case 30:
            initialView = "dayGridMonth"
          break;
        case 3:
            initialView = "timeGridThreeDay"
          break;
        
        default:
            initialView = "timeGridWeek"
          
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
          scrollTime: new Date().toLocaleTimeString(),
          views: {
              timeGridThreeDay: {
                  type: 'timeGrid',
                  duration: { days: 3 },
                  buttonText: '3 day'
              }
          },
          headerToolbar: {
            start: 'today', 
            center: '',
            end: 'prev,next' 
          },

          eventClick: function(info) {
            open(
                Dialog,
                {
                    info: info.event,
                    onCancel,
                    onOkay
                  },
                {
                    closeButton: false,
                    closeOnEsc: false,
                    closeOnOuterClick: true,
                    styleWindow: {
                      backgroundColor: info.event.backgroundColor,
                    },
                }
            );
          },
          format: "yyyy-MM-dd'T'HH:mm:ssXXX",
          initialView: initialView,
          events: events,
        });

      calendar.render();
    });

</script>

<div id="calendar"/>


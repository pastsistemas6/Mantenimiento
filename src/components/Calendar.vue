<template>
  <div class="card not-prose w-full shadow-none">
    <div class="flex flex-col shadow p-4 rounded-lg">
      <h2 class="text-2xl font-bold text-[#545386] mb-4">Calendario de consumo</h2>
      <div id="calendar-custom" ref="calendarRef" class="w-full"></div>
    </div>
  </div>

  <button
    type="button"
    class="btn hidden"
    id="modalTrigger"
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-controls="calendar-event-modal"
    data-overlay="#calendar-event-modal"
  ></button>

  <div
    id="calendar-event-modal"
    class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-dvh hidden"
    role="dialog"
    tabindex="-1"
  >
    <div class="modal-dialog opacity-100 duration-300">
      <div class="modal-content overflow-y-auto">
        <div class="modal-header pb-2 flex flex-col items-start">
          <h2 class="font-bold text-[#545386] text-xl">Gestionar lecturas del día</h2>
          <div class="divider text-base-content/50 py-2"></div>
          <div class="w-full flex items-center gap-2">
            <h3 class="text-md">Fecha seleccionada:</h3>
            <h4 class="modal-title" id="modalTitle">Event</h4>
          </div>
          <button
            type="button"
            class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
            aria-label="Close"
            @click="closeModal"
          >
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>
        <form id="eventForm">
          <div class="modal-body pt-0 flex flex-col gap-2">
            <div class="w-full">
              <label class="label-text cursor-default!">Seleccione una cuenta</label>
              <select id="accountSelect" class="select" required>
                <option disabled selected>Seleccione una cuenta...</option>
                <option value="EMGESA 635">EMGESA 635</option>
                <option value="RUITOQUE 6188">RUITOQUE 6188</option>
                <option value="RUITOQUE SUSCRIPTOR: 6189">RUITOQUE SUSCRIPTOR: 6189</option>
                <option value="RUITOQUE 6190">RUITOQUE 6190</option>
                <option value="CODENSA CUARTO FRIO 1345745-2">CODENSA CUARTO FRIO 1345745-2</option>
                <option value="CODENSA UNIDAD BIOLOGICOS 2274007-2">
                  CODENSA UNIDAD BIOLOGICOS 2274007-2
                </option>
                <option value="EMGESA 50007822">EMGESA 50007822</option>
                <option value="EMGESA 634">EMGESA 634</option>
                <option value="EMGESA 633">EMGESA 633</option>
                <option value="EMGESA 50006191">EMGESA 50006191</option>
              </select>
            </div>
            <div>
              <label class="label-text cursor-default!"> Código del operador </label>
              <input id="operatorCode" type="text" class="input" placeholder="Ej: OP001" required />
            </div>
            <div>
              <label class="label-text cursor-default!"> Nombre del operador </label>
              <input
                id="operatorName"
                type="text"
                class="input"
                placeholder="Nombre operador"
                required
              />
            </div>
            <div>
              <label class="label-text cursor-default!"> Lectura (kWh) </label>
              <input id="reading" type="number" class="input" placeholder="0.00" required />
            </div>
            <div>
              <label class="label-text cursor-default!"> Observaciones </label>
              <textarea
                id="observations"
                class="textarea textarea-bordered w-full border-base-content/30"
                placeholder="Observaciones adicionales (opcional)"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label class="label-text cursor-default!" for="eventTitle">Información</label>
              <input
                type="text"
                id="eventTitle"
                class="input"
                placeholder="Resumen de la lectura"
                disabled
              />
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-soft text-black/55 shadow-none border-0" @click="closeModal">
              Cancelar
            </button>
            <button type="submit" class="btn bg-[#545386] shadow-none border-0">Guardar lectura</button>
          </div>
          <div class="modal-body pt-0 flex flex-col gap-2 mb-3">
            <div class="flex flex-col gap-2">
              <label class="label-text cursor-default!" for="eventTitle">Lecturas existentes:</label>
              <span class="text-center text-sm text-gray-500! border-1 border-gray-300 rounded-md py-8!">No hay lecturas registradas para este día.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'

const calendarRef = ref(null)
let calendarInstance = null
let selectedEvent = null
let selectedDateInfo = null

const openModal = () => {
  const modal = document.getElementById('calendar-event-modal')
  if (modal) {
    modal.classList.remove('hidden')
    modal.style.display = 'flex'
    document.body.style.overflow = 'hidden'
  }
}

const closeModal = () => {
  const modal = document.getElementById('calendar-event-modal')
  if (modal) {
    modal.classList.add('hidden')
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }
}

const updateEventTitle = () => {
  const account = document.getElementById('accountSelect').value
  const code = document.getElementById('operatorCode').value
  const name = document.getElementById('operatorName').value
  const reading = document.getElementById('reading').value

  const title = `${account} | ${code} - ${name} | Lectura: ${reading}kWh`
  document.getElementById('eventTitle').value = title
}

onMounted(async () => {
  await nextTick()

  const calendarEl = calendarRef.value
  const today = new Date()

  function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const events = [
    {
      title: 'Past Event',
      start: addDays(today, -2).toISOString().split('T')[0],
      classNames: ['fc-event-info'],
    },
    {
      title: 'All Day Event',
      start: addDays(today, 2).toISOString().split('T')[0],
      classNames: ['fc-event-info'],
    },
    {
      title: 'Long Event',
      start: addDays(today, 2).toISOString().split('T')[0],
      end: addDays(today, 5).toISOString().split('T')[0],
      classNames: ['fc-event-primary'],
    },
    {
      title: 'Confirm tech stack',
      start: addDays(today, 0).toISOString().split('T')[0],
      classNames: ['fc-event-success'],
    },
    {
      groupId: '999',
      title: 'Coding session',
      start: addDays(today, 1).toISOString().split('T')[0] + 'T16:00:00',
      classNames: ['fc-event-secondary'],
    },
    {
      groupId: '999',
      title: 'Coding session',
      start: addDays(today, 8).toISOString().split('T')[0] + 'T16:00:00',
      classNames: ['fc-event-secondary'],
    },
    {
      title: 'Conference',
      start: addDays(today, 9).toISOString().split('T')[0],
      end: addDays(today, 10).toISOString().split('T')[0],
      classNames: ['fc-event-primary'],
    },
    {
      title: 'Meeting',
      start: addDays(today, 9).toISOString().split('T')[0] + 'T10:30:00',
      end: addDays(today, 9).toISOString().split('T')[0] + 'T12:30:00',
      classNames: ['fc-event-error'],
    },
    {
      title: 'Lunch',
      start: addDays(today, 9).toISOString().split('T')[0] + 'T12:40:00',
      classNames: ['fc-event-warning'],
    },
    {
      title: 'Meeting',
      start: addDays(today, 9).toISOString().split('T')[0] + 'T14:30:00',
      classNames: ['fc-event-error'],
    },
    {
      title: 'Picnic',
      start: addDays(today, 12).toISOString().split('T')[0],
      classNames: ['fc-event-success'],
    },
    {
      title: 'Yoga',
      start: addDays(today, 15).toISOString().split('T')[0],
      classNames: ['fc-event-info'],
    },
    {
      title: 'Credit Card Payment',
      start: addDays(today, 23).toISOString().split('T')[0],
      end: addDays(today, 24).toISOString().split('T')[0],
      classNames: ['fc-event-warning'],
    },
    {
      title: 'Meeting with client',
      start: addDays(today, 27).toISOString().split('T')[0],
      classNames: ['fc-event-success'],
    },
    {
      start: addDays(today, 17).toISOString().split('T')[0],
      end: addDays(today, 20).toISOString().split('T')[0],
      display: 'background',
      classNames: ['fc-event-disabled'],
    },
  ]

  calendarInstance = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    initialDate: today.toISOString().split('T')[0],
    editable: true,
    dragScroll: true,
    dayMaxEvents: 2,
    eventResizableFromStart: true,
    selectable: true,
    headerToolbar: {
      left: 'prev,next title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    buttonText: {
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      list: 'Lista',
    },
    events: events,
    dayCellDidMount: function (info) {
      // Agregar event listener a cada celda del día
      info.el.addEventListener('click', function (e) {
        // Solo si no se hizo clic en un evento
        if (e.target.closest('.fc-event')) {
          return
        }

        const clickedDate = info.date

        // Check if the clicked date is in the blocked range
        const blockedStart = addDays(today, 17).getTime()
        const blockedEnd = addDays(today, 20).getTime()
        const clickedDateTime = clickedDate.getTime()

        if (clickedDateTime >= blockedStart && clickedDateTime < blockedEnd) {
          alert('Events cannot be added in the blocked date range.')
          return
        }

        // Resetear siempre para creación de nuevo evento
        selectedEvent = null
        selectedDateInfo = {
          startStr: info.date.toISOString().split('T')[0],
          endStr: info.date.toISOString().split('T')[0],
          start: info.date,
        }
        document.getElementById('modalTitle').textContent = `${formatDate(info.date)}`
        document.getElementById('eventForm').reset()
        document.getElementById('eventTitle').value = ''

        // Abrir el modal
        openModal()
      })
    },
    select: function (info) {
      // Check if the selected range overlaps with the blocked range
      const blockedStart = addDays(today, 17).getTime()
      const blockedEnd = addDays(today, 20).getTime()
      const selectedStart = info.start.getTime()
      const selectedEnd = info.end ? info.end.getTime() : selectedStart
      if (
        (selectedStart < blockedEnd && selectedEnd > blockedStart) ||
        (selectedEnd > blockedStart && selectedStart < blockedEnd)
      ) {
        alert('Events cannot be added in the blocked date range.')
        calendarInstance.unselect()
        return
      }

      // Resetear siempre para creación de nuevo evento
      selectedEvent = null
      selectedDateInfo = info
      document.getElementById('modalTitle').textContent = `${formatDate(info.start)}`
      document.getElementById('eventForm').reset()
      document.getElementById('eventTitle').value = ''

      // Abrir el modal
      openModal()
    },
    eventClick: function (info) {
      selectedEvent = info.event
      selectedDateInfo = { startStr: info.event.startStr, endStr: info.event.endStr }
      document.getElementById('modalTitle').textContent = `${formatDate(info.event.start)}`
      document.getElementById('eventTitle').value = info.event.title

      // Abrir el modal
      openModal()
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
    allDayText: 'All day',
  })

  calendarInstance.render()

  // Agregar event listeners para actualizar el título
  document.getElementById('accountSelect').addEventListener('change', updateEventTitle)
  document.getElementById('operatorCode').addEventListener('input', updateEventTitle)
  document.getElementById('operatorName').addEventListener('input', updateEventTitle)
  document.getElementById('reading').addEventListener('input', updateEventTitle)

  document.getElementById('eventForm').addEventListener('submit', function (e) {
    e.preventDefault()
    const title = document.getElementById('eventTitle').value

    if (title) {
      if (selectedEvent) {
        // Actualizar evento existente
        selectedEvent.setProp('title', title)
      } else {
        // Siempre crear nuevo evento cuando no hay selección
        calendarInstance.addEvent({
          title: title,
          start: selectedDateInfo.startStr,
          end: selectedDateInfo.endStr,
          allDay: true, // Si no hay endStr, es allDay
        })
      }
      closeModal()
    }
  })
})

onBeforeUnmount(() => {
  if (calendarInstance) {
    calendarInstance.destroy()
    calendarInstance = null
  }
})
</script>

<style scoped>
.modal-title {
  font-size: 16px;
  font-weight: inherit;
}

/* Hacer que las fechas del calendario sean clickeables */
:deep(.fc-daygrid-day) {
  cursor: pointer;
}

:deep(.fc-daygrid-day:hover) {
  background-color: rgba(84, 83, 134, 0.1);
}

:deep(.fc-daygrid-day-number) {
  cursor: pointer;
}
</style>

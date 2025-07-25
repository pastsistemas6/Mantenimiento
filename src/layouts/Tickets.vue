<template>
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div class="flex flex-col gap-4 shadow px-4 py-4 rounded-lg">
        <h2 class="text-3xl font-bold text-center mb-4 text-[#545386]">Tickets {{ title }}</h2>
        <div
          class="flex items-center flex-nowrap border-2 border-base-content/20 rounded-lg px-0.5"
        >
          <button
            @click="enviar('Pendientes')"
            class="btn w-[50%] bg-white rounded-none rounded-tl-md rounded-bl-md hover:bg-red-50 border-0 shadow-none text-[#545386] font-bold text-md"
          >
            Pendientes
          </button>
          <div class="divider before:w-1 after:w-1 divider-horizontal"></div>
          <button
            @click="enviar('Solucionados')"
            class="btn w-[50%] bg-white rounded-none rounded-tr-md rounded-br-md hover:bg-green-50 border-0 shadow-none text-[#545386] font-bold text-md"
          >
            Solucionados
          </button>
        </div>
        <router-view
          :resolved-tickets="resolvedTickets"
          :new-elements="newElements"
          @ticket-resolved="handleTicketResolved"
          @ticket-element="handleTicketElement"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const resolvedTickets = ref([])
const newElements = ref([])
const title = ref('pendientes de la biblioteca')

function enviar(name) {
  router.push({ name: name })

  if (name == 'Pendientes') {
    title.value = 'pendientes de la biblioteca'
  } else if (name == 'Solucionados') {
    title.value = 'solucionados de la biblioteca'
  }
}

const handleTicketResolved = (resolvedTicket) => {
  // Agregar el ticket resuelto a la lista
  resolvedTickets.value.push(resolvedTicket)
  console.log('Ticket resuelto agregado:', resolvedTicket)
}

const handleTicketElement = (newElement) => {
  // Agregar el ticket resuelto a la lista
  newElements.value.push(newElement)
  console.log('Ticket elemento agregado:', newElement)
}
</script>

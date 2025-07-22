<template>
  <div class="card not-prose w-full shadow-none">
    <div class="flex flex-col gap-4 shadow p-4 rounded-lg">
      <h2 class="text-2xl font-bold text-[#545386] mb-2">Tickets solucionados</h2>
      <div class="flex justify-start items-center gap-4">
        <h3 class="text-lg font-semibold">Ver:</h3>

        <!-- Filtro por fechas -->
        <select
          v-model="selectedDateFilter"
          @change="performSearch"
          class="select max-w-xs appearance-none"
          aria-label="select fecha"
        >
          <option value="">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="yesterday">Ayer</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
        </select>

        <div class="w-md max-w-md">
          <div class="relative">
            <div class="relative">
              <input
                v-model="searchQuery"
                @input="performSearch"
                class="input ps-8"
                type="text"
                placeholder="Buscar por nombre, elemento, descripción o código"
                role="combobox"
                aria-expanded="false"
              />
              <span class="icon-[tabler--search] text-base-content absolute start-3 top-1/2 size-4 shrink-0 -translate-y-1/2"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tickets agrupados por fecha -->
      <div v-if="groupedTickets && Object.keys(groupedTickets).length > 0" class="mt-2">
        <div v-for="(tickets, dateGroup) in groupedTickets" :key="dateGroup" class="mb-6">
          <h3 class="text-lg font-semibold text-[#545386] mb-3 border-b pb-1">{{ dateGroup }}</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="ticket in tickets"
              :key="ticket.id"
              @click="selectTicket(ticket)"
              class="stats cursor-pointer hover:bg-base-content/20 transition-shadow"
            >
              <div class="p-4 grid grid-cols-6">
                <div
                  class="size-12 flex-none rounded-full flex items-center justify-center text-white font-bold text-lg"
                  :style="{ backgroundColor: getStatusColor(ticket.estado) }"
                >
                  {{ getInitials(ticket.creador) }}
                </div>
                <div class="col-span-4">
                  <div class="font-semibold">{{ ticket.elemento }}</div>
                  <div class="text-sm text-gray-600">{{ ticket.creador }}</div>
                  <div class="text-sm">{{ ticket.email }}</div>
                  <div class="text-xs text-gray-500">{{ formatDate(ticket.fechaCreacion) }}</div>
                  <div class="text-xs font-mono bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{{ ticket.codigo }}</div>
                </div>
                <div class="col-span-1 flex items-start justify-end">
                   <span
                    class="badge text-xs px-2 py-1 border-1 border-base-content/30 rounded-lg text-white"
                    :style="{ backgroundColor: getStatusColor(ticket.estado) }"
                  >
                    {{ ticket.estado }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="hasSearched" class="text-center py-8 text-gray-500">
        No se encontraron tickets
      </div>

      <!-- Paginación -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-1 mt-2">
        <button
          class="btn btn-sm bg-[#D8D2C4] border-0 text-black shadow-none"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          :class="page === currentPage ? 'btn btn-sm bg-[#545386] border-0 shadow-none' : 'btn btn-sm bg-[#D8D2C4] border-0 text-black shadow-none'"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <button
          class="btn btn-sm bg-[#D8D2C4] shadow-none border-0 text-black"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal de detalle del ticket -->
    <div
      v-if="selectedTicket"
      class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full" role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog opacity-100 duration-300">
        <div class="modal-content">
          <div class="modal-header border-b-1 border-base-content/20">
            <h3 class="modal-title text-3xl font-bold text-[#545386]">Ticket #{{ selectedTicket.codigo }}</h3>
            <button
              type="button"
              class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
              aria-label="Close"
              @click="closeTicketModal"
            >
              <span class="icon-[tabler--x] size-4"></span>
            </button>
          </div>

          <div class="modal-body pt-4 flex flex-col gap-3">
            <div>

              <div>
                <label class="label-text text-lg text-gray-500 font-bold cursor-default">Elemento</label>
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.elemento }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default">Código</label>
                <p class="text-sm bg-gray-50 p-3 rounded font-mono">{{ selectedTicket.codigo }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default">Creado por</label>
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.creador }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default">Email</label>
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.email }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default">Fecha</label>
                <p class="text-sm bg-gray-50 p-3 rounded">{{ formatDate(selectedTicket.fechaCreacion) }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default">Descripción</label>
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.descripcion }}</p>
              </div>

              <div class="mt-3 flex items-center gap-6">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default">Estado actual</label>
                <span
                  class="badge border-1 border-base-content/30 text-xs px-2 py-1 rounded-lg text-white ml-2"
                  :style="{ backgroundColor: getStatusColor(selectedTicket.estado) }"
                >
                  {{ selectedTicket.estado }}
                </span>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default">Nota</label>
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.notaRechazo }}</p>
              </div>

            </div>

            <div>
              <h4 class="text-lg font-bold mb-2">Imágenes adjuntadas</h4>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="(imagen, index) in selectedTicket.imagenes"
                  :key="index"
                  class="aspect-square bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                  @click="openImageModal(imagen)"
                >
                  <img
                    :src="imagen"
                    :alt="`Imagen ${index + 1}`"
                    class="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de imagen ampliada -->
    <div
      v-if="selectedImage"
      class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog opacity-100 duration-300">
        <div class="modal-content">
          <div class="modal-header flex justify-center border-b-1 border-base-content/20">
            <h3 class="modal-title text-3xl font-semibold text-[#545386]">Referencia</h3>
          </div>
          <div class="modal-body pt-0 flex flex-col justify-center items-center gap-2">
            <img :src="selectedImage" alt="Imagen ampliada" class="w-xl h-full rounded-lg" />
          </div>
          <div class="modal-footer flex justify-center">
            <button @click="selectedImage = null" class="btn bg-[#545386] shadow-none">Volver</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'

const props = defineProps({
  resolvedTickets: {
    type: Array,
    default: () => []
  }
})

const searchQuery = ref('')
const selectedDateFilter = ref('')
const selectedTicket = ref(null)
const hasSearched = ref(false)
const currentPage = ref(1)
const itemsPerPage = 6
const newStatus = ref('')
const rejectionNote = ref('')
const selectedImage = ref(null)
const showApprovalModal = ref(false)
const approvedTicket = ref(null)


const filteredTickets = computed(() => {
  if (!hasSearched.value) return []

  return props.resolvedTickets.filter(ticket => {
    // Filtro de búsqueda por texto
    const matchesSearch = !searchQuery.value ||
      ticket.elemento.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.creador.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.codigo.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Filtro por fecha
    let matchesDate = true
    if (selectedDateFilter.value) {
      const ticketDate = new Date(ticket.fechaCreacion)
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const yesterday = new Date(today.getTime() - 86400000)

      switch (selectedDateFilter.value) {
        case 'today':
          matchesDate = ticketDate >= today
          break
        case 'yesterday':
          matchesDate = ticketDate >= yesterday && ticketDate < today
          break
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 86400000)
          matchesDate = ticketDate >= weekAgo
          break
        case 'month':
          const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
          matchesDate = ticketDate >= monthAgo
          break
      }
    }

    return matchesSearch && matchesDate
  })
})

const groupedTickets = computed(() => {
  if (!filteredTickets.value.length) return {}

  const groups = {}
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 86400000)

  filteredTickets.value.forEach(ticket => {
    const ticketDate = new Date(ticket.fechaCreacion)
    const ticketDay = new Date(ticketDate.getFullYear(), ticketDate.getMonth(), ticketDate.getDate())

    let groupKey
    if (ticketDay.getTime() === today.getTime()) {
      groupKey = 'Hoy'
    } else if (ticketDay.getTime() === yesterday.getTime()) {
      groupKey = 'Ayer'
    } else {
      const diffTime = today.getTime() - ticketDay.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      groupKey = `Hace ${diffDays} días`
    }

    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(ticket)
  })

  return groups
})

const totalPages = computed(() => {
  return Math.ceil(filteredTickets.value.length / itemsPerPage)
})

// Inicializar la búsqueda
hasSearched.value = true

const performSearch = () => {
  hasSearched.value = true
  currentPage.value = 1
}

const selectTicket = (ticket) => {
  selectedTicket.value = ticket
  newStatus.value = ''
  rejectionNote.value = ''
}

const openImageModal = (image) => {
  selectedImage.value = image
}

const closeTicketModal = () => {
  selectedTicket.value = null
  newStatus.value = ''
  rejectionNote.value = ''
}

const getInitials = (name) => {
  return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
}

const getStatusColor = (status) => {
  switch (status) {
    case 'aprobado': return '#10b9818c'
    case 'rechazado': return '#ef44448c'
    default: return '#6b72808c'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.filter {
  & input {
    &:not(:last-child) {
      margin-inline-end: 0;
    }
  }
}

.modal {
  z-index: 1000;
}
</style>

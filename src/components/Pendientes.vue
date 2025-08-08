<template>
  <!-- Componente Pendientes.vue -->
  <div class="card not-prose w-full shadow-none">
    <div class="flex flex-col gap-4 shadow p-4 rounded-lg">
      <div class="flex justify-between flex-nowrap items-center gap-4">
        <div class="w-full">
          <div class="relative">
            <!--Campo de búsqueda -->
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
              <span
                class="icon-[tabler--search] text-base-content absolute start-3 top-1/2 size-4 shrink-0 -translate-y-1/2"
              ></span>
            </div>
          </div>
        </div>

        <!-- Filtro por fechas -->
        <select
          v-model="selectedDateFilter"
          @change="performSearch"
          class="select w-full appearance-none"
          aria-label="select fecha"
        >
          <option value="">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="yesterday">Ayer</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
        </select>
      </div>

      <!-- Tickets agrupados por fecha -->
      <div v-if="groupedTickets && Object.keys(groupedTickets).length > 0" class="mt-2">
        <div v-for="(tickets, dateGroup) in groupedTickets" :key="dateGroup" class="mb-6">
          <h3 class="text-lg font-semibold text-[#545386] mb-3 border-b pb-1">{{ dateGroup }}</h3>
          <div class="grid grid-cols-2 gap-4">
            <!-- Iterar sobre los tickets del grupo -->
            <div
              v-for="ticket in tickets"
              :key="ticket.id"
              @click="selectTicket(ticket)"
              class="stats cursor-pointer hover:bg-base-content/20 transition-shadow"
            >
              <div class="p-4 grid grid-cols-6">
                <!-- Avatar del creador del ticket -->
                <div
                  class="size-12 flex-none rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style="background-color: #f59e0b8c"
                >
                  {{ getInitials(ticket.creador) }}
                </div>
                <!-- Información del ticket -->
                <div class="col-span-4">
                  <div class="font-semibold">{{ ticket.elemento }}</div>
                  <div class="text-sm text-gray-600">{{ ticket.creador }}</div>
                  <div class="text-sm">{{ ticket.email }}</div>
                  <div class="text-xs text-gray-500">{{ formatDate(ticket.fechaCreacion) }}</div>
                  <div class="text-xs font-mono bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                    {{ ticket.codigo }}
                  </div>
                </div>
                <div class="col-span-1 flex items-start justify-end">
                  <span
                    class="badge text-xs px-2 py-1 border-1 border-base-content/30 rounded-lg text-white"
                    style="background-color: #f59e0b8c"
                  >
                    pendiente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay tickets -->
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
          :class="
            page === currentPage
              ? 'btn btn-sm bg-[#545386] border-0 shadow-none'
              : 'btn btn-sm bg-[#D8D2C4] border-0 text-black shadow-none'
          "
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
      class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full"
      role="dialog"
      tabindex="-1"
    >
      <!-- Contenido del modal -->
      <div class="modal-dialog opacity-100 duration-300">
        <div class="modal-content">
          <div class="modal-header border-b-1 border-base-content/20">
            <!-- Título del modal con el código del ticket -->
            <h3 class="modal-title text-3xl font-bold text-[#545386]">
              Ticket #{{ selectedTicket.codigo }}
            </h3>
            <!-- Botón de cerrar modal -->
            <button
              type="button"
              class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
              aria-label="Close"
              @click="closeTicketModal"
            >
              <span class="icon-[tabler--x] size-4"></span>
            </button>
          </div>

          <!-- Cuerpo del modal con detalles del ticket -->
          <div class="modal-body pt-4 flex flex-col gap-3">
            <div>
              <div>
                <!-- elemento seleccionado -->
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Elemento</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.elemento }}</p>
              </div>

              <div class="mt-2">
                <!-- Código del ticket -->
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Código</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded font-mono">{{ selectedTicket.codigo }}</p>
              </div>

              <div class="mt-2">
                <!-- Información del creador del ticket -->
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Creado por</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.creador }}</p>
              </div>

              <div class="mt-2">
                <!--- Email del creador del ticket -->
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Email</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.email }}</p>
              </div>

              <div class="mt-2">
                <!-- Fecha de creación del ticket -->
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Fecha</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">
                  {{ formatDate(selectedTicket.fechaCreacion) }}
                </p>
              </div>

              <div class="mt-2">
                <!-- Descripción del ticket -->
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Descripción</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.descripcion }}</p>
              </div>

              <div class="mt-3 flex items-center gap-6">
                <!--- Estado del ticket -->
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Estado actual</label
                >
                <span
                  class="badge border-1 border-base-content/30 text-xs px-2 py-1 rounded-lg text-white ml-2"
                  style="background-color: #f59e0b8c"
                >
                  pendiente
                </span>
              </div>

              <!-- Control de estado -->
              <div class="mt-4">
                <h4 class="text-lg font-bold mb-2 text-gray-500">Gestionar Ticket</h4>
                <!-- Selección de estado -->
                <div class="space-y-3">
                  <select v-model="newStatus" class="select select-bordered w-full">
                    <option value="">Seleccionar acción</option>
                    <option value="aprobado">Aprobar</option>
                    <option value="rechazado">Rechazar</option>
                  </select>

                  <!-- Nota de rechazo -->
                  <div v-if="newStatus === 'rechazado'">
                    <textarea
                      v-model="rejectionNote"
                      class="textarea textarea-bordered w-full"
                      placeholder="Nota de rechazo (obligatoria)"
                      rows="3"
                    ></textarea>
                  </div>

                  <!-- Botón de confirmación -->
                  <button
                    @click="updateTicketStatus"
                    :disabled="!newStatus || (newStatus === 'rechazado' && !rejectionNote)"
                    class="btn bg-[#545386] text-white"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>

            <!-- Imágenes adjuntas al ticket -->
            <div>
              <h4 class="text-lg font-bold mb-2">Imágenes adjuntadas</h4>
              <div class="grid grid-cols-2 gap-2">
                <!-- Iterar sobre las imágenes del ticket -->
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
          <!-- Cuerpo del modal con la imagen ampliada -->
          <div class="modal-body pt-0 flex flex-col justify-center items-center gap-2">
            <img :src="selectedImage" alt="Imagen ampliada" class="w-xl h-full rounded-lg" />
          </div>
          <div class="modal-footer flex justify-center">
            <button @click="selectedImage = null" class="btn bg-[#545386] shadow-none">
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de aprobación -->
    <div
      v-if="showApprovalModal"
      class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog opacity-100 duration-300">
        <div class="modal-content">
          <div class="modal-header flex justify-center border-b-1 border-base-content/20">
            <h3 class="modal-title text-3xl font-bold text-[#545386]">
              Agregar elemento a la biblioteca
            </h3>
          </div>

          <div class="modal-body pt-0 flex flex-col gap-2">
            <div>
              <!-- Nombre del elemento -->
              <label class="label-text">Nombre del elemento</label>
              <input
                v-model="newElement.name"
                type="text"
                class="input"
                value="{{ approvedTicket?.elemento }}"
              />
            </div>

            <div>
              <!-- Ticket asociado -->
              <label class="label-text">Categoría</label>
              <select v-model="newElement.category" class="select select-bordered w-full">
                <option value="">Seleccionar categoría</option>
                <option value="herramientas">Herramientas</option>
                <option value="equipos">Equipos</option>
                <option value="materiales">Materiales</option>
                <option value="repuestos">Repuestos</option>
              </select>
            </div>

            <div>
              <!-- Código del elemento -->
              <label class="label-text">Código</label>
              <input
                v-model="newElement.code"
                type="text"
                class="input"
                placeholder="Código del elemento"
              />
            </div>

            <div>
              <!-- Fecha de creación -->
              <label class="label-text">Especificaciones</label>
              <textarea
                v-model="newElement.especification"
                class="textarea textarea-bordered w-full border-base-content/30"
                placeholder="Especificaciones técnicas del elemento..."
                rows="3"
              ></textarea>
            </div>

            <!-- Enlaces dinámicos -->
            <div class="border border-base-content/30 p-3 rounded-lg bg-gray-50">
              <div class="flex justify-between items-center mb-3">
                <label class="label-text font-semibold">Enlaces (máximo 2)</label>
                <button
                  v-if="newElement.enlaces.length < 2"
                  @click="addLink"
                  class="btn btn-sm bg-[#545386] shadow-none border-0 text-white"
                >
                  + Agregar enlace
                </button>
              </div>

              <!-- Iterar sobre los enlaces -->
              <div
                v-for="(enlace, index) in newElement.enlaces"
                :key="index"
                class="border border-base-content/30 p-3 rounded mb-2 bg-white relative"
              >
                <button
                  v-if="newElement.enlaces.length > 1"
                  @click="removeLink(index)"
                  class="btn btn-sm btn-circle absolute top-2 right-2 bg-red-500 text-white"
                >
                  ×
                </button>

                <div class="grid grid-cols-1 gap-2">
                  <!-- Campos para el enlace -->
                  <input
                    v-model="enlace.nombre"
                    type="text"
                    class="input"
                    placeholder="Nombre del enlace"
                  />
                  <!-- URL del enlace -->
                  <input
                    v-model="enlace.url"
                    type="url"
                    class="input"
                    placeholder="URL del enlace"
                  />
                  <!-- Tipo de enlace -->
                  <select v-model="enlace.tipo" class="select">
                    <option value="" disabled>Seleccionar tipo</option>
                    <option value="smartsheet">SmartSheet</option>
                    <option value="pdf">PDF</option>
                    <option value="word">WORD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!-- Botones de acción del modal -->
          <div class="modal-footer">
            <button @click="closeApprovalModal" class="btn btn-soft shadow-none btn-secondary">
              Cancelar
            </button>
            <button @click="addToInventory" class="btn bg-[#545386] text-white shadow-none">
              Subir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importar dependencias necesarias
import { ref, computed } from 'vue'

// Props para emitir eventos al componente padre
const emit = defineEmits(['ticket-resolved'])

// Variables reactivas para manejar el estado del componente
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

// Nueva variable para manejar el nuevo elemento
const newElement = ref({
  name: '',
  ticket: '',
  category: '',
  code: '',
  date: new Date(),
  especification: '',
  enlaces: [{ nombre: '', url: '', tipo: '' }],
})

// Función para generar código único
const generateCode = () => {
  return 'TK' + Date.now().toString().slice(-6)
}

// Datos de ejemplo para tickets (solo pendientes)
const tickets = ref([
  {
    id: 1,
    codigo: 'TK001234',
    creador: 'Carlos Mendoza',
    email: 'carlos.mendoza@eliteflower.com',
    estado: 'pendiente',
    fechaCreacion: new Date(),
    elemento: 'Taladro Bosch Professional',
    descripcion:
      'Necesitamos un taladro profesional para trabajos de mantenimiento en la finca norte.',
    imagenes: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
    ],
  },
  {
    id: 2,
    codigo: 'TK001235',
    creador: 'María Rodríguez',
    email: 'maria.rodriguez@eliteflower.com',
    estado: 'pendiente',
    fechaCreacion: new Date(),
    elemento: 'Medidor de pH Digital',
    descripcion: 'Necesitamos medidores de pH digitales para control de calidad del agua.',
    imagenes: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300'],
  },
  {
    id: 3,
    codigo: 'TK001236',
    creador: 'Pedro Martínez',
    email: 'pedro.martinez@eliteflower.com',
    estado: 'pendiente',
    fechaCreacion: new Date(Date.now() - 259200000), // Hace 3 días
    elemento: 'Sensores de Temperatura Inalámbricos',
    descripcion: 'Sistema de monitoreo de temperatura inalámbrico para invernaderos.',
    imagenes: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300'],
  },
])

// Función para filtrar tickets por búsqueda y fecha
const filteredTickets = computed(() => {
  if (!hasSearched.value) return []

  return tickets.value.filter((ticket) => {
    // Filtro de búsqueda por texto
    const matchesSearch =
      !searchQuery.value ||
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

// Agrupar tickets por fecha
const groupedTickets = computed(() => {
  if (!filteredTickets.value.length) return {}

  // Agrupar tickets por fecha
  const groups = {}
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 86400000)

  // Iterar sobre los tickets filtrados
  filteredTickets.value.forEach((ticket) => {
    const ticketDate = new Date(ticket.fechaCreacion)
    const ticketDay = new Date(
      ticketDate.getFullYear(),
      ticketDate.getMonth(),
      ticketDate.getDate(),
    )

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

// Paginación de tickets
const totalPages = computed(() => {
  return Math.ceil(filteredTickets.value.length / itemsPerPage)
})

// Inicializar la búsqueda
hasSearched.value = true

// Función para realizar la búsqueda
const performSearch = () => {
  hasSearched.value = true
  currentPage.value = 1
}

// Función para seleccionar un ticket
const selectTicket = (ticket) => {
  selectedTicket.value = ticket
  newStatus.value = ''
  rejectionNote.value = ''
}

// Función para cerrar el modal de ticket
const closeTicketModal = () => {
  selectedTicket.value = null
  newStatus.value = ''
  rejectionNote.value = ''
}

// Función para actualizar el estado del ticket
const updateTicketStatus = () => {
  if (!selectedTicket.value || !newStatus.value) return
  if (newStatus.value === 'rechazado' && !rejectionNote.value) return

  // Crear un objeto con los datos del ticket resuelto
  const resolvedTicket = {
    ...selectedTicket.value,
    estado: newStatus.value,
    fechaResolucion: new Date(),
    notaRechazo:
      newStatus.value === 'rechazado'
        ? rejectionNote.value
        : 'Se ha aprobado exitosamente tu solicitud, revisa la biblioteca.',
  }

  // Remover del array de pendientes
  const ticketIndex = tickets.value.findIndex((t) => t.id === selectedTicket.value.id)
  if (ticketIndex !== -1) {
    tickets.value.splice(ticketIndex, 1)
  }

  // Si el estado es aprobado, preparar el nuevo elemento
  if (newStatus.value === 'aprobado') {
    approvedTicket.value = resolvedTicket
    newElement.value.name = approvedTicket.value.elemento
    newElement.value.ticket = approvedTicket.value.codigo
    showApprovalModal.value = true
  }

  // Emitir el nuevo elemento y el ticket resuelto
  emit('ticket-element', newElement.value)
  emit('ticket-resolved', resolvedTicket)

  // Limpiar el estado del ticket seleccionado
  closeTicketModal()
}

// Función para abrir la imagen en un modal
const openImageModal = (image) => {
  selectedImage.value = image
}

// Función para cerrar el modal de imagen
const closeApprovalModal = () => {
  showApprovalModal.value = false
  approvedTicket.value = null
  // Limpiar el nuevo elemento
  newElement.value = {
    name: '',
    ticket: '',
    category: '',
    code: '',
    date: '',
    especification: '',
    enlaces: [{ nombre: '', url: '', tipo: '' }],
  }
}

// Función para agregar un enlace dinámico
const addLink = () => {
  if (newElement.value.enlaces.length < 2) {
    newElement.value.enlaces.push({ nombre: '', url: '', tipo: '' })
  }
}

// Función para eliminar un enlace dinámico
const removeLink = (index) => {
  if (newElement.value.enlaces.length > 1) {
    newElement.value.enlaces.splice(index, 1)
  }
}

// Función para agregar el nuevo elemento al inventario
const addToInventory = () => {
  // Aquí se agregaría la lógica para agregar al inventario
  alert('Elemento agregado al inventario exitosamente')
  closeApprovalModal()
}

// Función para obtener las iniciales del nombre
const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}

// Función para formatear la fecha
const formatDate = (date) => {
  return new Date(date).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
/* Estilos para el componente Pendientes.vue */
.filter {
  & input {
    &:not(:last-child) {
      margin-inline-end: 0;
    }
  }
}
/* Estilos para el modal */
.modal {
  z-index: 1000;
}
</style>

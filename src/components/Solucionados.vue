<template>
  <div class="card not-prose w-full shadow-none">
    <div class="flex flex-col gap-4 shadow p-4 rounded-lg">
      <div
        class="flex items-center flex-nowrap border-2 border-base-content/20 rounded-lg px-0.5 mb-2"
      >
        <button
          @click="registros('user')"
          class="btn w-[50%] bg-white rounded-none rounded-tl-md rounded-bl-md hover:bg-gray-200 border-0 shadow-none text-[#545386] font-bold text-md"
        >
          Registro de usuarios
        </button>
        <div class="divider before:w-1 after:w-1 divider-horizontal"></div>
        <button
          @click="registros('element')"
          class="btn w-[50%] bg-white rounded-none rounded-tr-md rounded-br-md hover:bg-gray-200 border-0 shadow-none text-[#545386] font-bold text-md"
        >
          Registro de elementos
        </button>
      </div>

      <div v-if="tiporegistro" class="w-full">
        <div class="flex justify-between flex-nowrap items-center gap-4">
          <div class="w-full max-w-full">
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
            class="select w-full max-w-full appearance-none"
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
                    <div class="text-xs font-mono bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                      {{ ticket.codigo }}
                    </div>
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

      <div v-if="!tiporegistro" class="w-full">
        <div class="flex justify-between flex-nowrap items-center gap-4">
          <div class="w-full max-w-full">
            <div class="relative">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  @input="performSearch"
                  class="input ps-8"
                  type="text"
                  placeholder="Buscar por nombre, categoría, código o especificación"
                  role="combobox"
                  aria-expanded="false"
                />
                <span
                  class="icon-[tabler--search] text-base-content absolute start-3 top-1/2 size-4 shrink-0 -translate-y-1/2"
                ></span>
              </div>
            </div>
          </div>

          <select
            v-model="selectedDateFilter"
            @change="performSearch"
            class="select w-full max-w-full appearance-none"
            aria-label="select fecha"
          >
            <option value="">Todas las fechas</option>
            <option value="today">Hoy</option>
            <option value="yesterday">Ayer</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
          </select>
        </div>

        <!-- Elementos agrupados por fecha -->
        <div v-if="groupedElements && Object.keys(groupedElements).length > 0" class="mt-2">
          <div v-for="(elements, dateGroup) in groupedElements" :key="dateGroup" class="mb-6">
            <h3 class="text-lg font-semibold text-[#545386] mb-3 border-b pb-1">{{ dateGroup }}</h3>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="element in elements"
                :key="element.code"
                @click="selectElement(element)"
                class="stats cursor-pointer hover:bg-base-content/20 transition-shadow"
              >
                <div class="p-4 grid grid-cols-6">
                  <div
                    class="size-12 flex-none rounded-full flex items-center justify-center text-white font-bold text-lg"
                    :style="{ backgroundColor: getCategoryColor(element.category) }"
                  >
                    {{ element.category.charAt(0).toUpperCase() }}
                  </div>
                  <div class="col-span-4">
                    <div class="font-semibold">{{ element.name }}</div>
                    <div class="text-sm text-gray-600">{{ element.category }}</div>
                    <div class="text-xs text-gray-500">{{ formatElementDate(element.date) }}</div>
                    <div class="text-xs font-mono bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                      {{ element.code }}
                    </div>
                  </div>
                  <div class="col-span-1 flex items-start justify-end">
                    <span
                      class="badge text-xs px-2 py-1 border-1 border-base-content/30 rounded-lg"
                      :style="{ backgroundColor: getCategoryColor(element.category) }"
                    >
                      {{ element.category }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="hasSearched" class="text-center py-8 text-gray-500">
          No se encontraron elementos
        </div>

        <!-- Paginación -->
        <div v-if="totalElementPages > 1" class="flex justify-center items-center gap-1 mt-2">
          <button
            class="btn btn-sm bg-[#D8D2C4] border-0 text-black shadow-none"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Previous
          </button>
          <button
            v-for="page in totalElementPages"
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
            :disabled="currentPage === totalElementPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de detalle del ticket -->
    <div
      v-if="selectedTicket"
      class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog opacity-100 duration-300">
        <div class="modal-content">
          <div class="modal-header border-b-1 border-base-content/20">
            <h3 class="modal-title text-3xl font-bold text-[#545386]">
              Ticket #{{ selectedTicket.codigo }}
            </h3>
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
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Elemento</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.elemento }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Código</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded font-mono">{{ selectedTicket.codigo }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Creado por</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.creador }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Email</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.email }}</p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Fecha</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">
                  {{ formatDate(selectedTicket.fechaCreacion) }}
                </p>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Descripción</label
                >
                <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedTicket.descripcion }}</p>
              </div>

              <div class="mt-3 flex items-center gap-6">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Estado actual</label
                >
                <span
                  class="badge border-1 border-base-content/30 text-xs px-2 py-1 rounded-lg text-white ml-2"
                  :style="{ backgroundColor: getStatusColor(selectedTicket.estado) }"
                >
                  {{ selectedTicket.estado }}
                </span>
              </div>

              <div class="mt-2">
                <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                  >Nota</label
                >
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

    <!-- Modal de detalle del elemento -->
    <div
      v-if="selectedElement"
      class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog opacity-100 duration-300">
        <div class="modal-content">
          <div class="modal-header border-b-1 border-base-content/20">
            <h3 class="modal-title text-3xl font-bold text-[#545386]">
              {{ selectedElement.name }}
            </h3>
            <button
              type="button"
              class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
              aria-label="Close"
              @click="closeElementModal"
            >
              <span class="icon-[tabler--x] size-4"></span>
            </button>
          </div>

          <div class="modal-body pt-4 flex flex-col gap-3">
            <div>
              <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                >Ticket</label
              >
              <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedElement.ticket }}</p>
            </div>
            <div>
              <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                >Categoría</label
              >
              <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedElement.category }}</p>
            </div>

            <div class="mt-2">
              <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                >Código</label
              >
              <p class="text-sm bg-gray-50 p-3 rounded font-mono">{{ selectedElement.code }}</p>
            </div>

            <div class="mt-2">
              <label class="label-text text-lg text-gray-500 font-bold cursor-default">Fecha</label>
              <p class="text-sm bg-gray-50 p-3 rounded">
                {{ formatElementDate(selectedElement.date) }}
              </p>
            </div>

            <div class="mt-2">
              <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                >Especificación</label
              >
              <p class="text-sm bg-gray-50 p-3 rounded">{{ selectedElement.especification }}</p>
            </div>

            <div v-if="selectedElement.enlaces && selectedElement.enlaces.length > 0" class="mt-2">
              <label class="label-text text-lg text-gray-500 font-bold cursor-default"
                >Enlaces relacionados</label
              >
              <div class="space-y-2">
                <div
                  v-for="(enlace, index) in selectedElement.enlaces"
                  :key="index"
                  class="text-sm w-full bg-gray-50 p-3 rounded flex flex-col gap-2"
                >
                  <div class="flex justify-between items-center gap-4 flex-nowrap">
                    <div class="flex items-center gap-3">
                      <label class="label-text text-md text-gray-500 font-semibold cursor-default"
                        >Nombre:</label
                      >
                      <div class="font-medium">{{ enlace.nombre }}</div>
                    </div>

                    <div class="flex items-center gap-3">
                      <label class="label-text text-md text-gray-500 font-semibold cursor-default"
                        >Tipo:</label
                      >
                      <div class="text-xs text-gray-500">{{ enlace.tipo }}</div>
                    </div>
                  </div>

                  <div class="text-blue-600 flex flex-col items-start justify-center w-full">
                    <label class="label-text text-md text-gray-500 font-semibold cursor-default"
                      >link</label
                    >
                    <a
                      :href="enlace.url"
                      target="_blank"
                      class="hover:underline p-2 px-3 w-full rounded-md bg-base-content/15"
                      >{{ enlace.url }}</a
                    >
                  </div>
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
            <button @click="selectedImage = null" class="btn bg-[#545386] shadow-none">
              Volver
            </button>
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
    default: () => [],
  },
  newElements: {
    type: Array,
    default: () => [],
  },
})
console.log(props.resolvedTickets)
console.log(props.newElements)

const searchQuery = ref('')
const selectedDateFilter = ref('')
const selectedTicket = ref(null)
const selectedElement = ref(null)
const hasSearched = ref(false)
const tiporegistro = ref(true)
const currentPage = ref(1)
const itemsPerPage = 6
const newStatus = ref('')
const rejectionNote = ref('')
const selectedImage = ref(null)
const showApprovalModal = ref(false)
const approvedTicket = ref(null)

const filteredTickets = computed(() => {
  if (!hasSearched.value) return []

  return props.resolvedTickets.filter((ticket) => {
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

const filteredElements = computed(() => {
  if (!hasSearched.value) return []

  return props.newElements.filter((element) => {
    // Filtro de búsqueda por texto
    const matchesSearch =
      !searchQuery.value ||
      element.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      element.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      element.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      element.especification.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Filtro por fecha (si los elementos tienen fecha)
    let matchesDate = true
    if (selectedDateFilter.value && element.date) {
      const elementDate = new Date(element.date)
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const yesterday = new Date(today.getTime() - 86400000)

      switch (selectedDateFilter.value) {
        case 'today':
          matchesDate = elementDate >= today
          break
        case 'yesterday':
          matchesDate = elementDate >= yesterday && elementDate < today
          break
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 86400000)
          matchesDate = elementDate >= weekAgo
          break
        case 'month':
          const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
          matchesDate = elementDate >= monthAgo
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

const groupedElements = computed(() => {
  if (!filteredElements.value.length) return {}

  const groups = {}
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 86400000)

  filteredElements.value.forEach((element) => {
    const elementDate = element.date ? new Date(element.date) : new Date()
    const elementDay = new Date(
      elementDate.getFullYear(),
      elementDate.getMonth(),
      elementDate.getDate(),
    )

    let groupKey
    if (elementDay.getTime() === today.getTime()) {
      groupKey = 'Hoy'
    } else if (elementDay.getTime() === yesterday.getTime()) {
      groupKey = 'Ayer'
    } else {
      const diffTime = today.getTime() - elementDay.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      groupKey = `Hace ${diffDays} días`
    }

    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(element)
  })

  return groups
})

const totalPages = computed(() => {
  return Math.ceil(filteredTickets.value.length / itemsPerPage)
})

const totalElementPages = computed(() => {
  return Math.ceil(filteredElements.value.length / itemsPerPage)
})

// Inicializar la búsqueda
hasSearched.value = true

const performSearch = () => {
  hasSearched.value = true
  currentPage.value = 1
}

const registros = (tipo) => {
  if (tipo == 'user') {
    tiporegistro.value = true
  } else if (tipo == 'element') {
    tiporegistro.value = false
  }
}

const selectTicket = (ticket) => {
  selectedTicket.value = ticket
  newStatus.value = ''
  rejectionNote.value = ''
}

const selectElement = (element) => {
  selectedElement.value = element
}

const openImageModal = (image) => {
  selectedImage.value = image
}

const closeTicketModal = () => {
  selectedTicket.value = null
  newStatus.value = ''
  rejectionNote.value = ''
}

const closeElementModal = () => {
  selectedElement.value = null
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}

const getStatusColor = (status) => {
  switch (status) {
    case 'aprobado':
      return '#10b9818c'
    case 'rechazado':
      return '#ef44448c'
    default:
      return '#6b72808c'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatElementDate = (date) => {
  if (!date) return 'Fecha no disponible'
  return new Date(date).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getCategoryColor = (category) => {
  // Asigna colores según la categoría
  const colors = {
    hardware: '#3b82f68c',
    software: '#10b9818c',
    redes: '#8b5cf68c',
    otros: '#6b72808c',
  }
  return colors[category.toLowerCase()] || '#6b72808c'
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

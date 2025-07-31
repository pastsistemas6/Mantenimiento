<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-[#545386]">Administración de consumo</h2>
    </div>

    <!-- Filters -->
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-4">
      <!-- Search -->
      <div class="relative flex-1 max-w-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search for items"
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent"
        />
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-3">
        <!-- Page Size -->
        <select
          v-model="pageSize"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent target:border-r-2"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>

        <!-- v-model="ubicacionFilter" -->
        <select
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent target:border-r-2"
        >
          <option value="Todas">Predios</option>
          <option v-for="finca in fincas" :key="finca.id" :value="finca.name">
            {{ finca.name }}
          </option>
        </select>

      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr class="border-b-1 border-gray-300">
            <th class="w-8 px-4 py-3 text-left">
              <input
                v-model="selectAll"
                type="checkbox"
                class="h-4 w-4 text-[#545386] border-gray-300 rounded focus:ring-[#545386]"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
              @click="sortBy(column.key)"
            >
              <div class="flex items-center justify-between">
                {{ column.label }}
                <div class="flex flex-col">
                  <svg
                    :class="[
                      'h-3 w-3 text-gray-400',
                      { 'text-blue-600': sortColumn === column.key && sortDirection === 'asc' },
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M5.293 9.707a1 1 0 011.414 0L10 6.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414z"
                    />
                  </svg>
                  <svg
                    :class="[
                      'h-3 w-3 text-gray-400',
                      { 'text-blue-600': sortColumn === column.key && sortDirection === 'desc' },
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M14.707 10.293a1 1 0 00-1.414 0L10 13.586 6.707 10.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                    />
                  </svg>
                </div>
              </div>
            </th>
            <th
              class="px-4 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-widest"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-100">
            <td class="px-4 py-4">
              <input
                v-model="selectedItems"
                :value="item.id"
                type="checkbox"
                class="h-4 w-4 text-[#545386] border-gray-300 rounded focus:ring-[#545386]"
              />
            </td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.cuenta }}</td>
            <td
              class="px-4 py-4 text-sm text-gray-900"
              :class="item.lectura ? '' : 'text-gray-400!'"
            >
              {{ item.lectura ? item.lectura : 'sin lectura' }}
            </td>
            <td
              class="px-4 py-4 text-sm text-gray-900"
              :class="item.fecha ? '' : 'text-gray-400!'"
            >
              {{ item.fecha ? item.fecha : '-----' }}
            </td>
            <td class="px-4 py-4">
              <div class="flex items-center space-x-2">
                <button
                  @click="showModal = true"
                  class="p-1 px-3 rounded-md text-gray-600 bg-gray-200"
                  title="Agregar"
                >
                  Ingresar
                </button>
                <button
                  @click="showModal = true"
                  class="p-1 px-3 rounded-md text-gray-600 bg-gray-200"
                  title="Consultar"
                >
                  Consultar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="paginatedItems.length === 0" class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p class="mt-4 text-sm text-gray-500">No search results</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Mostrando {{ startIndex + 1 }} a
        {{ Math.min(startIndex + pageSize, filteredItems.length) }} de
        {{ filteredItems.length }} lecturas
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 text-sm border rounded-md',
            page === currentPage
              ? 'bg-[#545386] text-white border-[#545386]'
              : 'border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>

   <div
    v-if="showModal"
    id="calendar-event-modal"
    class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-dvh"
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
            @click="showModal = false"
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
            <button type="button" class="btn btn-soft text-black/55 shadow-none border-0" @click="showModal = false">
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
import { ref, computed, watch, onMounted } from 'vue'
import { fincas as fincasData } from '../services/auth'

// Reactive data
const searchTerm = ref('')
const pageSize = ref(5)
const statusFilter = ref('All')
const currentPage = ref(1)
const sortColumn = ref('')
const sortDirection = ref('asc')
const selectedItems = ref([])
const selectAll = ref(false)
const fincas = ref([])
const showModal = ref(false)

// Table columns
const columns = [
  { key: 'cuenta', label: 'Cuenta' },
  { key: 'lectura', label: 'Lectura actual' },
  { key: 'fecha', label: 'Fecha lectura' },
]

// Sample data
const maintenanceData = ref([
  {
    id: 1,
    cuenta: 'EMGESA 635',
    lectura: '',
    fecha: '',
  },
  {
    id: 2,
    cuenta: 'RUITOQUE 6188',
    lectura: '',
    fecha: '',
  },
  {
    id: 3,
    cuenta: 'RUITOQUE SUSCRIPTOR: 6189',
    lectura: '',
    fecha: '',
  },
  {
    id: 4,
    cuenta: 'RUITOQUE 6190',
    lectura: '',
    fecha: '',
  },
  {
    id: 5,
    cuenta: 'CODENSA CUARTO FRIO 1345745-2',
    lectura: '',
    fecha: '',
  },
  {
    id: 6,
    cuenta: 'CODENSA UNIDAD BIOLOGICOS 2274007-2',
    lectura: '',
    fecha: '',
  },
  {
    id: 7,
    cuenta: 'EMGESA 50007822',
    lectura: '',
    fecha: '',
  },
  {
    id: 8,
    cuenta: 'EMGESA 634',
    lectura: '',
    fecha: '',
  },
  {
    id: 9,
    cuenta: 'EMGESA 633',
    lectura: '',
    fecha: '',
  },
  {
    id: 10,
    cuenta: 'EMGESA 50006191',
    lectura: '',
    fecha: '',
  }
])

// Computed properties
const filteredItems = computed(() => {
  let filtered = maintenanceData.value

  // Apply search filter
  if (searchTerm.value) {
    filtered = filtered.filter((item) =>
      item.cuenta.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
  }

  // Apply status filter
  if (statusFilter.value !== 'All') {
    filtered = filtered.filter((item) => item.availability === statusFilter.value)
  }

  // Apply sorting
  if (sortColumn.value) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortColumn.value]
      const bVal = b[sortColumn.value]

      if (typeof aVal === 'string') {
        return sortDirection.value === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      } else {
        return sortDirection.value === 'asc' ? aVal - bVal : bVal - aVal
      }
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / pageSize.value))

const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)

const paginatedItems = computed(() => {
  const start = startIndex.value
  const end = start + pageSize.value
  return filteredItems.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (current > 4) pages.push('...')

    const start = Math.max(2, current - 2)
    const end = Math.min(total - 1, current + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 3) pages.push('...')
    pages.push(total)
  }

  return pages
})

// Methods
const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}

const goToPage = (page) => {
  if (page !== '...') {
    currentPage.value = page
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = paginatedItems.value.map((item) => item.id)
  } else {
    selectedItems.value = []
  }
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800'
    case 'Limited':
      return 'bg-yellow-100 text-yellow-800'
    case 'Out of Stock':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const editItem = (item) => {
  console.log('Edit item:', item)
  // Implement edit functionality
}

const deleteItem = (item) => {
  console.log('Delete item:', item)
  // Implement delete functionality
}

const moreActions = (item) => {
  console.log('More actions for item:', item)
  // Implement more actions functionality
}

// Watchers
watch([searchTerm, statusFilter, pageSize], () => {
  currentPage.value = 1
})

watch(
  selectedItems,
  () => {
    const allSelected =
      paginatedItems.value.length > 0 &&
      paginatedItems.value.every((item) => selectedItems.value.includes(item.id))
    selectAll.value = allSelected
  },
  { deep: true },
)

watch(paginatedItems, () => {
  const allSelected =
    paginatedItems.value.length > 0 &&
    paginatedItems.value.every((item) => selectedItems.value.includes(item.id))
  selectAll.value = allSelected
})

// Load data on component mount
onMounted(() => {
  fincas.value = fincasData
})
</script>

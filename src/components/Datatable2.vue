<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-[#545386]">Historial reciente de mantenimientos</h2>
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

        <!-- Status Filter -->
        <select
          v-model="statusFilter"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent target:border-b-2"
        >
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Limited">Limited</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
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
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-100"
              @click="sortBy(column.key)"
            >
              <div class="flex items-center justify-between w-30 gap-2">
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
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
            <td class="px-4 py-4">
              <input
                v-model="selectedItems"
                :value="item.id"
                type="checkbox"
                class="h-4 w-4 text-[#545386] border-gray-300 rounded focus:ring-[#545386]"
              />
            </td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.id }}</td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.fecha }}</td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.tipoplastico }}</td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.bloque }}</td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.tipomantenimiento }}</td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.responsable }}</td>
            <td class="px-4 pl-8 py-4 text-sm text-gray-900">${{ item.costo }}.00</td>
            <td class="px-4 py-4">
              <span
                :class="getStatusBadgeClass(item.estado)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ item.estado }}
              </span>
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
        {{ filteredItems.length }} mantenimientos
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
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Reactive data
const searchTerm = ref('')
const pageSize = ref(5)
const statusFilter = ref('All')
const currentPage = ref(1)
const sortColumn = ref('')
const sortDirection = ref('asc')
const selectedItems = ref([])
const selectAll = ref(false)

// Table columns
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'fecha', label: 'FECHA' },
  { key: 'tipoplastico', label: 'Tipo de plástico' },
  { key: 'bloque', label: 'Bloque' },
  { key: 'tipomantenimiento', label: 'Tipo de mantenimiento' },
  { key: 'responsable', label: 'Responsable' },
  { key: 'costo', label: 'Costo' },
  { key: 'estado', label: 'Estado' },
]

// Sample data
const maintenanceData = ref([
  {
    id: 'MT-2023-128',
    fecha: '28/05/2023',
    tipoplastico: 'Polietileno',
    bloque: 'Bloque 1',
    tipomantenimiento: 'Limpieza general',
    responsable: 'Carlos Méndez',
    costo: 120,
    estado: 'completado',
  },
  {
    id: 'MT-2023-127',
    fecha: '27/05/2023',
    tipoplastico: 'Malla sombra',
    bloque: 'Bloque 3',
    tipomantenimiento: 'Reemplazo',
    responsable: 'Ana Rodríguez',
    costo: 450,
    estado: 'completado',
  },
  {
    id: 'MT-2023-126',
    fecha: '25/05/2023',
    tipoplastico: 'Plástico de cubierta',
    bloque: 'Bloque 2',
    tipomantenimiento: 'Reparación',
    responsable: 'Luis García',
    costo: 320,
    estado: 'completado',
  },
  {
    id: 'MT-2023-125',
    fecha: '22/05/2023',
    tipoplastico: 'Polietileno',
    bloque: 'Bloque 4',
    tipomantenimiento: 'Limpieza general',
    responsable: 'Maria López',
    costo: 110,
    estado: 'completado',
  },
  {
    id: 'MT-2023-124',
    fecha: '18/05/2023',
    tipoplastico: 'Malla sombra',
    bloque: 'Bloque 1',
    tipomantenimiento: 'Revisión',
    responsable: 'Pedro Ramírez',
    costo: 85,
    estado: 'completado',
  },
])

// Computed properties
const filteredItems = computed(() => {
  let filtered = maintenanceData.value

  // Apply search filter
  if (searchTerm.value) {
    filtered = filtered.filter((item) =>
      item.tipoplastico.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
  }

  // Apply status filter
  if (statusFilter.value !== 'All') {
    filtered = filtered.filter((item) => item.estado === statusFilter.value)
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
    case 'completado':
      return 'bg-green-100 text-green-800'
    case 'proceso':
      return 'bg-yellow-100 text-yellow-800'
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
</script>

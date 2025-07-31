<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
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
          placeholder="Buscar usuarios..."
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent"
        />
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-3">
        <!-- Page Size -->
        <select
          v-model="pageSize"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>

        <!-- Estado Filter -->
        <select
          v-model="estadoFilter"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent"
        >
          <option value="Todos">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="pendiente">Pendiente</option>
          <option value="suspendido">Suspendido</option>
        </select>

        <!-- Rol Filter -->
        <select
          v-model="rolFilter"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent"
        >
          <option value="Todos">Todos los roles</option>
          <option value="gerente">Gerente</option>
          <option value="asistente">Asistente</option>
          <option value="tecnico">Técnico</option>
          <option value="pasante">Pasante</option>
          <option value="operador">Operador</option>
        </select>

        <!-- Ubicación Filter -->
        <select
          v-model="ubicacionFilter"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#545386] focus:border-transparent"
        >
          <option value="Todas">Todas las ubicaciones</option>
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
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
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
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="usuario in paginatedItems" :key="usuario.id" class="hover:bg-gray-200">
            <td class="px-4 py-4">
              <input
                v-model="selectedItems"
                :value="usuario.id"
                type="checkbox"
                class="h-4 w-4 text-[#545386] border-gray-300 rounded focus:ring-[#545386]"
              />
            </td>
            <td class="px-4 py-4">
              <div class="flex flex-col">
                <div class="text-sm font-medium text-gray-900">{{ usuario.nombre }}</div>
                <div class="text-sm text-gray-500">{{ usuario.correo }}</div>
              </div>
            </td>
            <td class="px-4 py-4">
              <span
                :style="{ backgroundColor: `var(--color-${usuario.rol.toLowerCase()})` }"
                class="px-3 py-1.5 text-xs font-medium rounded-lg capitalize text-white"
              >
                {{ usuario.rol }}
              </span>
            </td>

            <td class="px-4 py-4">
              <span
                :class="getEstadoBadgeClass(usuario.estado)"
                class="px-3 py-1.5 text-xs font-medium rounded-lg capitalize"
              >
                {{ usuario.estado }}
              </span>
            </td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ usuario.ubicacion }}</td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ formatDate(usuario.ultimaConexion) }}</td>
            <td class="px-4 py-4">
              <div class="flex items-center space-x-2">
                <button
                  @click="editItem(usuario)"
                  class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Editar"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteItem(usuario)"
                  class="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Eliminar"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p class="mt-4 text-sm text-gray-500">No se encontraron usuarios</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Mostrando {{ startIndex + 1 }} a
        {{ Math.min(startIndex + pageSize, filteredItems.length) }} de
        {{ filteredItems.length }} usuarios
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
import { ref, computed, watch, onMounted } from 'vue'
import { users as usersData, fincas as fincasData } from '../services/auth'

// Reactive data
const searchTerm = ref('')
const pageSize = ref(5)
const estadoFilter = ref('Todos')
const rolFilter = ref('Todos')
const ubicacionFilter = ref('Todas')
const currentPage = ref(1)
const sortColumn = ref('')
const sortDirection = ref('asc')
const selectedItems = ref([])
const selectAll = ref(false)

// Data sources
const users = ref([])
const fincas = ref([])

// Table columns
const columns = [
  { key: 'nombre', label: 'Usuario' },
  { key: 'rol', label: 'Rol' },
  { key: 'estado', label: 'Estado' },
  { key: 'ubicacion', label: 'Ubicación' },
  { key: 'ultimaConexion', label: 'Última Conexión' },
]

// Load data on component mount
onMounted(() => {
  users.value = usersData
  fincas.value = fincasData
})

// Computed properties
const filteredItems = computed(() => {
  let filtered = users.value

  // Apply search filter
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(search) ||
      usuario.correo.toLowerCase().includes(search)
    )
  }

  // Apply estado filter
  if (estadoFilter.value !== 'Todos') {
    filtered = filtered.filter((usuario) => usuario.estado === estadoFilter.value)
  }

  // Apply rol filter
  if (rolFilter.value !== 'Todos') {
    filtered = filtered.filter((usuario) => usuario.rol === rolFilter.value)
  }

  // Apply ubicacion filter
  if (ubicacionFilter.value !== 'Todas') {
    filtered = filtered.filter((usuario) => usuario.ubicacion === ubicacionFilter.value)
  }

  // Apply sorting
  if (sortColumn.value) {
    filtered = [...filtered].sort((a, b) => {
      let aVal = a[sortColumn.value]
      let bVal = b[sortColumn.value]

      // Special handling for nested values like nombre
      if (sortColumn.value === 'ultimaConexion') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      }

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
    selectedItems.value = paginatedItems.value.map((usuario) => usuario.id)
  } else {
    selectedItems.value = []
  }
}

const getEstadoBadgeClass = (estado) => {
  switch (estado) {
    case 'activo':
      return 'bg-green-100 text-green-800'
    case 'inactivo':
      return 'bg-gray-100 text-gray-800'
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800'
    case 'suspendido':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const editItem = (usuario) => {
  console.log('Editar usuario:', usuario)
  // Implementar funcionalidad de edición
}

const deleteItem = (usuario) => {
  console.log('Eliminar usuario:', usuario)
  // Implementar funcionalidad de eliminación
}

const moreActions = (usuario) => {
  console.log('Más acciones para usuario:', usuario)
  // Implementar más acciones
}

// Watchers
watch([searchTerm, estadoFilter, rolFilter, ubicacionFilter, pageSize], () => {
  currentPage.value = 1
})

watch(
  selectedItems,
  () => {
    const allSelected =
      paginatedItems.value.length > 0 &&
      paginatedItems.value.every((usuario) => selectedItems.value.includes(usuario.id))
    selectAll.value = allSelected
  },
  { deep: true },
)

watch(paginatedItems, () => {
  const allSelected =
    paginatedItems.value.length > 0 &&
    paginatedItems.value.every((usuario) => selectedItems.value.includes(usuario.id))
  selectAll.value = allSelected
})
</script>

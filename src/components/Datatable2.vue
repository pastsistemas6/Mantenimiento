<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-[#545386]">
        Historial reciente de mantenimientos
      </h2>
    </div>

    <!-- Filters -->
    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-4">
      <!-- Search -->
      <div class="relative flex-1 max-w-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search for items"
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-3">
        <!-- Page Size -->
        <select
          v-model="pageSize"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>

        <!-- Status Filter -->
        <select
          v-model="statusFilter"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              @click="sortBy(column.key)"
            >
              <div class="flex items-center justify-between">
                {{ column.label }}
                <div class="flex flex-col">
                  <svg
                    :class="['h-3 w-3 text-gray-400', { 'text-blue-600': sortColumn === column.key && sortDirection === 'asc' }]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 9.707a1 1 0 011.414 0L10 6.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414z"/>
                  </svg>
                  <svg
                    :class="['h-3 w-3 text-gray-400', { 'text-blue-600': sortColumn === column.key && sortDirection === 'desc' }]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.707 10.293a1 1 0 00-1.414 0L10 13.586 6.707 10.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"/>
                  </svg>
                </div>
              </div>
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
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
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.productName }}</td>
            <td class="px-4 py-4 text-sm text-gray-900">${{ item.price }}</td>
            <td class="px-4 py-4 text-sm text-gray-900">{{ item.bloque }}</td>
            <td class="px-4 py-4">
              <span
                :class="getStatusBadgeClass(item.availability)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ item.availability }}
              </span>
            </td>
            <td class="px-4 py-4">
              <div class="flex items-center space-x-2">
                <button
                  @click="editItem(item)"
                  class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button
                  @click="deleteItem(item)"
                  class="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
                <button
                  @click="moreActions(item)"
                  class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="More actions"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="paginatedItems.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <p class="mt-4 text-sm text-gray-500">No search results</p>
      </div>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {{ startIndex + 1 }} to {{ Math.min(startIndex + pageSize, filteredItems.length) }} of {{ filteredItems.length }} products
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 text-sm border rounded-md',
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
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
  { key: 'productName', label: 'Product Name' },
  { key: 'price', label: 'Price' },
  { key: 'bloque', label: 'Bloque' },
  { key: 'availability', label: 'Availability' }
]

// Sample data
const maintenanceData = ref([
  { id: 1, productName: 'Apple iPhone 15', price: 999, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 2, productName: 'Samsung Galaxy S23', price: 899, bloque: 'Bloque 1', availability: 'Limited' },
  { id: 3, productName: 'Sony WH-1000XM5', price: 399, bloque: 'Bloque 1', availability: 'Out of Stock' },
  { id: 4, productName: 'Dell XPS 15', price: 1299, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 5, productName: 'Logitech MX Master 3', price: 99, bloque: 'Bloque 1', availability: 'Limited' },
  { id: 6, productName: 'Microsoft Surface Laptop 5', price: 1499, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 7, productName: 'HP Spectre x360', price: 1199, bloque: 'Bloque 1', availability: 'Out of Stock' },
  { id: 8, productName: 'Apple Watch Series 9', price: 499, bloque: 'Bloque 1', availability: 'Limited' },
  { id: 9, productName: 'Google Pixel 7', price: 599, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 10, productName: 'Bose QuietComfort Earbuds II', price: 279, bloque: 'Bloque 1', availability: 'Out of Stock' },
  { id: 11, productName: 'Asus ROG Zephyrus G14', price: 1899, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 12, productName: 'Sony PlayStation 5', price: 499, bloque: 'Bloque 1', availability: 'Limited' },
  { id: 13, productName: 'Amazon Echo Dot (5th Gen)', price: 49, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 14, productName: 'NVIDIA GeForce RTX 4090', price: 1599, bloque: 'Bloque 1', availability: 'Limited' },
  { id: 15, productName: 'Lenovo ThinkPad X1 Carbon', price: 1799, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 16, productName: 'Google Nest Hub (2nd Gen)', price: 99, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 17, productName: 'Fitbit Charge 6', price: 149, bloque: 'Bloque 1', availability: 'Limited' },
  { id: 18, productName: 'Razer Blade 16', price: 2499, bloque: 'Bloque 1', availability: 'Out of Stock' },
  { id: 19, productName: 'Oculus Quest 3', price: 499, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 20, productName: 'Canon EOS R8', price: 1699, bloque: 'Bloque 1', availability: 'Limited' },
  { id: 21, productName: 'DJI Mavic 3 Pro', price: 2199, bloque: 'Bloque 1', availability: 'In Stock' },
  { id: 22, productName: 'Alienware Aurora R15', price: 2899, bloque: 'Bloque 1', availability: 'Out of Stock' },
  { id: 23, productName: 'SteelSeries Arctis Nova Pro', price: 349, bloque: 'Bloque 1', availability: 'Limited' }
])

// Computed properties
const filteredItems = computed(() => {
  let filtered = maintenanceData.value

  // Apply search filter
  if (searchTerm.value) {
    filtered = filtered.filter(item =>
      item.productName.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  // Apply status filter
  if (statusFilter.value !== 'All') {
    filtered = filtered.filter(item => item.availability === statusFilter.value)
  }

  // Apply sorting
  if (sortColumn.value) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortColumn.value]
      const bVal = b[sortColumn.value]

      if (typeof aVal === 'string') {
        return sortDirection.value === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      } else {
        return sortDirection.value === 'asc'
          ? aVal - bVal
          : bVal - aVal
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
    selectedItems.value = paginatedItems.value.map(item => item.id)
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

watch(selectedItems, () => {
  const allSelected = paginatedItems.value.length > 0 &&
    paginatedItems.value.every(item => selectedItems.value.includes(item.id))
  selectAll.value = allSelected
}, { deep: true })

watch(paginatedItems, () => {
  const allSelected = paginatedItems.value.length > 0 &&
    paginatedItems.value.every(item => selectedItems.value.includes(item.id))
  selectAll.value = allSelected
})
</script>


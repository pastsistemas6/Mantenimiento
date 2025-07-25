<template>
  <div class="min-h-full">
    <div class="py-2 pr-5 pb-6">
      <div class="flex flex-col gap-4 items-center shadow p-4 rounded-lg">
        <h2 class="text-3xl font-bold text-[#545386] mb-2">Directorio de contactos</h2>
        <div class="join w-full flex gap-3">
          <div class="input rounded-md join-item flex justify-between h-12">
            <span class="icon-[tabler--user] text-[#545386] my-auto me-3 size-5 shrink-0"></span>
            <input
              type="text"
              class="grow"
              placeholder="Nombre..."
              id="groupInput"
              v-model="searchQuery"
            />
          </div>
          <select
            class="select join-item w-sm h-12 rounded-md"
            aria-label="select"
            v-model="selectedDepartamento"
          >
            <option value="" disabled>Departamentos</option>
            <option v-for="departamento in departamentos" :key="departamento" :value="departamento">
              {{ departamento }}
            </option>
          </select>
          <select
            class="select join-item w-sm h-12 rounded-md"
            aria-label="select"
            v-model="selectedCargo"
          >
            <option value="" disabled>Cargos</option>
            <option v-for="cargo in cargos" :key="cargo" :value="cargo">{{ cargo }}</option>
          </select>
          <button
            class="btn btn-outline bg-[#545386] rounded-md text-white join-item h-auto"
            :disabled="!hasActiveFilters"
            @click="performSearch"
          >
            Buscar
          </button>
        </div>

        <!-- Filtros aplicados -->
        <div
          v-if="hasActiveFilters && hasSearched"
          class="w-full filter flex items-center justify-start gap-2"
        >
          <input
            type="button"
            class="btn bg-[#D8D2C4] text-white font-bold border-0 shadow-none flex items-center justify-center"
            @click="clearFilters"
            value="x"
          />
          <span
            v-if="searchQuery"
            @click="clearFilterOne('1')"
            class="relative btn bg-[#D8D2C4] text-white border-0 shadow-none py-3 px-4 cursor-pointer group"
          >
            <span class="group-hover:hidden duration-300">Nombre: {{ searchQuery }}</span>
            <span class="hidden group-hover:inline w-26 text-xl text-white duration-300">×</span>
          </span>
          <span
            v-if="selectedDepartamento"
            @click="clearFilterOne('2')"
            class="relative btn bg-[#D8D2C4] text-white border-0 shadow-none py-3 px-4 cursor-pointer group"
          >
            <span class="group-hover:hidden duration-300"
              >Departamento: {{ selectedDepartamento }}</span
            >
            <span class="hidden group-hover:inline w-50 text-xl text-white duration-300">×</span>
          </span>
          <span
            v-if="selectedCargo"
            @click="clearFilterOne('3')"
            class="relative btn bg-[#D8D2C4] text-white border-0 shadow-none py-3 px-4 cursor-pointer group"
          >
            <span class="group-hover:hidden duration-300">Cargo: {{ selectedCargo }}</span>
            <span class="hidden group-hover:inline w-28 text-xl text-white duration-300">×</span>
          </span>
        </div>

        <div class="grid grid-cols-2 gap-4 w-full">
          <div class="shadow rounded-md p-4 flex flex-col gap-4">
            <!-- Lista de contactos -->
            <ul
              v-if="hasSearched && paginatedPeople.length > 0"
              role="list"
              class="flex flex-col gap-2"
            >
              <li
                v-for="person in paginatedPeople"
                :key="person.email"
                class="flex justify-between gap-x-6 px-3 py-2 cursor-pointer hover:bg-base-content/20 rounded-lg border-1 border-gray-200"
                @click="selectPerson(person)"
              >
                <div class="flex min-w-0 gap-x-4">
                  <div
                    class="size-12 flex-none rounded-full flex items-center justify-center text-white font-bold text-lg"
                    :style="{ backgroundColor: `var(--color-${person.cargo.toLowerCase()})` }"
                  >
                    {{ getInitials(person.name) }}
                  </div>
                  <div class="min-w-0 flex-auto">
                    <p class="text-sm/6 font-semibold text-gray-900">{{ person.name }}</p>
                    <p class="mt-1 truncate text-xs/5 text-gray-500">{{ person.email }}</p>
                  </div>
                </div>
                <div class="flex items-center shrink-0">
                  <p class="text-sm/6 text-gray-900">{{ person.cargo }}</p>
                </div>
              </li>
            </ul>

            <!-- Paginación -->
            <div
              v-if="hasSearched && filteredPeople.length > 0"
              class="flex justify-center items-center gap-1 mt-2"
            >
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

            <!-- Mensaje cuando no hay resultados -->
            <div
              v-else-if="hasSearched && filteredPeople.length === 0"
              class="text-center py-8 text-gray-500"
            >
              No se encontraron contactos con los filtros aplicados.
            </div>

            <!-- Información general cuando no ha buscado -->
            <div v-else class="grid grid-cols-1 gap-4">
              <div
                class="bg-gradient-to-r from-gray-50 to-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <h3 class="font-semibold text-gray-900 mb-2">🥸 Distintivos por cargos</h3>
                <div class="grid grid-cols-3 gap-x-4 gap-y-2">
                  <p
                    class="text-sm text-center text-green-700 bg-gradient-to-r from-green-50 to-green-50 p-1 rounded-lg border border-green-200"
                  >
                    Gerente
                  </p>
                  <p
                    class="text-sm text-center text-blue-700 bg-gradient-to-r from-blue-50 to-blue-50 p-1 rounded-lg border border-blue-200"
                  >
                    Asistente
                  </p>
                  <p
                    class="text-sm text-center text-orange-700 bg-gradient-to-r from-orange-50 to-orange-50 p-1 rounded-lg border border-orange-200"
                  >
                    Técnico
                  </p>
                  <p
                    class="text-sm text-center text-violet-700 bg-gradient-to-r from-violet-50 to-violet-50 p-1 rounded-lg border border-violet-200"
                  >
                    Operador
                  </p>
                  <p
                    class="text-sm text-center text-pink-700 bg-gradient-to-r from-pink-50 to-pink-50 p-1 rounded-lg border border-pink-200"
                  >
                    Pasante
                  </p>
                </div>
              </div>

              <div
                class="bg-gradient-to-r from-gray-50 to-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <h3 class="font-semibold text-gray-900 mb-2">🔍 Búsqueda de contactos</h3>
                <p class="text-sm text-gray-700">
                  Utiliza el campo de búsqueda para encontrar empleados por nombre, o filtra por
                  finca y cargo específicos.
                </p>
              </div>

              <div
                class="bg-gradient-to-r from-gray-50 to-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <h3 class="font-semibold text-gray-900 mb-2">🏢 Organización por fincas</h3>
                <p class="text-sm text-gray-700">
                  El directorio organiza a los empleados por diferentes fincas de EliteFlower,
                  facilitando la localización según la ubicación.
                </p>
              </div>

              <div
                class="bg-gradient-to-r from-gray-50 to-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <h3 class="font-semibold text-gray-900 mb-2">👥 Diferentes áreas</h3>
                <p class="text-sm text-gray-700">
                  Encuentra empleados de riego, automatización, electricidad, administración y más
                  áreas especializadas.
                </p>
              </div>

              <div
                class="bg-gradient-to-r from-gray-50 to-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <h3 class="font-semibold text-gray-900 mb-2">📧 Contacto directo</h3>
                <p class="text-sm text-gray-700">
                  Todos los contactos incluyen correo electrónico corporativo @eliteflower.com para
                  comunicación directa.
                </p>
              </div>
            </div>
          </div>

          <div class="shadow rounded-md p-4 px-6">
            <div v-if="selectedPerson">
              <div class="px-4 sm:px-0">
                <h3 class="text-2xl font-semibold text-[#545386]">Información del contacto</h3>
                <p class="mt-1 max-w-full text-base-content/80">
                  Detalles del empleado seleccionado.
                </p>
              </div>
              <div class="mt-6 border-t border-base-content/25">
                <dl class="divide-y divide-base-content/25">
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Nombre</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ selectedPerson.name }}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Correo</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ selectedPerson.email }}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Cargo</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ selectedPerson.cargo }}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Área</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ selectedPerson.area }}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Departamento</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ selectedPerson.departamento }}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Finca</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ selectedPerson.finca }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- Información general del directorio -->
            <div v-else>
              <div class="px-4 sm:px-0">
                <h3 class="text-2xl font-semibold text-[#545386]">Información general</h3>
                <p class="mt-1 max-w-full text-base-content/80">
                  Sistema integral de contactos de EliteFlower.
                </p>
              </div>
              <div class="mt-6 border-t border-base-content/25">
                <dl class="divide-y divide-base-content/25">
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Total Empleados</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ people.length }}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Departamentos registrados</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ departamentos.length }}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Áreas de Trabajo</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      Riego, Automatización, Electricidad, Administración
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Cargos laborales</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      Gerente, Asistente, Técnico, Operario, Pasantes
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                    <dt class="font-medium text-base-content">Última Actualización</dt>
                    <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                      {{ new Date().toLocaleDateString() }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '@/stores/cart'

const cart = useCart()
const searchQuery = ref('')
const selectedDepartamento = ref('')
const selectedCargo = ref('')
const selectedPerson = ref(null)
const hasSearched = ref(false)
const currentPage = ref(1)
const itemsPerPage = 6

const people = [
  // Finca Norte
  {
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@eliteflower.com',
    cargo: 'Gerente',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Norte',
  },
  {
    name: 'Ana García',
    email: 'ana.garcia@eliteflower.com',
    cargo: 'Asistente',
    area: 'administrativo',
    departamento: 'Administración',
    finca: 'Norte',
  },
  {
    name: 'Luis Hernández',
    email: 'luis.hernandez@eliteflower.com',
    cargo: 'Técnico',
    area: 'electrico',
    departamento: 'Mantenimiento',
    finca: 'Norte',
  },
  {
    name: 'María Rodríguez',
    email: 'maria.rodriguez@eliteflower.com',
    cargo: 'Operador',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Norte',
  },
  {
    name: 'Pedro Martínez',
    email: 'pedro.martinez@eliteflower.com',
    cargo: 'Pasante',
    area: 'automatizacion',
    departamento: 'Tecnología',
    finca: 'Norte',
  },

  // Finca Sur
  {
    name: 'Laura Gómez',
    email: 'laura.gomez@eliteflower.com',
    cargo: 'Gerente',
    area: 'automatizacion',
    departamento: 'Tecnología',
    finca: 'Sur',
  },
  {
    name: 'Diego Silva',
    email: 'diego.silva@eliteflower.com',
    cargo: 'Asistente',
    area: 'administrativo',
    departamento: 'Administración',
    finca: 'Sur',
  },
  {
    name: 'Carmen López',
    email: 'carmen.lopez@eliteflower.com',
    cargo: 'Técnico',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Sur',
  },
  {
    name: 'Roberto Díaz',
    email: 'roberto.diaz@eliteflower.com',
    cargo: 'Operador',
    area: 'electrico',
    departamento: 'Mantenimiento',
    finca: 'Sur',
  },
  {
    name: 'Sofía Morales',
    email: 'sofia.morales@eliteflower.com',
    cargo: 'Pasante',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Sur',
  },

  // Finca Este
  {
    name: 'Miguel Torres',
    email: 'miguel.torres@eliteflower.com',
    cargo: 'Gerente',
    area: 'electrico',
    departamento: 'Mantenimiento',
    finca: 'Este',
  },
  {
    name: 'Patricia Vega',
    email: 'patricia.vega@eliteflower.com',
    cargo: 'Asistente',
    area: 'administrativo',
    departamento: 'Administración',
    finca: 'Este',
  },
  {
    name: 'Andrés Ruiz',
    email: 'andres.ruiz@eliteflower.com',
    cargo: 'Técnico',
    area: 'automatizacion',
    departamento: 'Tecnología',
    finca: 'Este',
  },
  {
    name: 'Valeria Castro',
    email: 'valeria.castro@eliteflower.com',
    cargo: 'Operador',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Este',
  },
  {
    name: 'Joaquín Flores',
    email: 'joaquin.flores@eliteflower.com',
    cargo: 'Pasante',
    area: 'electrico',
    departamento: 'Mantenimiento',
    finca: 'Este',
  },

  // Finca Oeste
  {
    name: 'Gabriela Ramírez',
    email: 'gabriela.ramirez@eliteflower.com',
    cargo: 'Gerente',
    area: 'administrativo',
    departamento: 'Administración',
    finca: 'Oeste',
  },
  {
    name: 'Fernando Ortiz',
    email: 'fernando.ortiz@eliteflower.com',
    cargo: 'Asistente',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Oeste',
  },
  {
    name: 'Isabella Vargas',
    email: 'isabella.vargas@eliteflower.com',
    cargo: 'Técnico',
    area: 'automatizacion',
    departamento: 'Tecnología',
    finca: 'Oeste',
  },
  {
    name: 'Sebastián Peña',
    email: 'sebastian.pena@eliteflower.com',
    cargo: 'Operador',
    area: 'electrico',
    departamento: 'Mantenimiento',
    finca: 'Oeste',
  },
  {
    name: 'Alejandra Soto',
    email: 'alejandra.soto@eliteflower.com',
    cargo: 'Pasante',
    area: 'administrativo',
    departamento: 'Administración',
    finca: 'Oeste',
  },

  // Finca Central
  {
    name: 'Ricardo Medina',
    email: 'ricardo.medina@eliteflower.com',
    cargo: 'Gerente',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Central',
  },
  {
    name: 'Natalia Jiménez',
    email: 'natalia.jimenez@eliteflower.com',
    cargo: 'Asistente',
    area: 'electrico',
    departamento: 'Mantenimiento',
    finca: 'Central',
  },
  {
    name: 'Tomás Herrera',
    email: 'tomas.herrera@eliteflower.com',
    cargo: 'Técnico',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Central',
  },
  {
    name: 'Camila Gutiérrez',
    email: 'camila.gutierrez@eliteflower.com',
    cargo: 'Operador',
    area: 'automatizacion',
    departamento: 'Tecnología',
    finca: 'Central',
  },
  {
    name: 'Mateo Aguilar',
    email: 'mateo.aguilar@eliteflower.com',
    cargo: 'Pasante',
    area: 'riego',
    departamento: 'Operaciones',
    finca: 'Central',
  },
]

const departamentos = computed(() => {
  const uniqueDepartamentos = [...new Set(people.map((person) => person.departamento))]
  return uniqueDepartamentos.sort()
})

const cargos = computed(() => {
  const uniqueCargos = [...new Set(people.map((person) => person.cargo))]
  return uniqueCargos.sort()
})

const filteredPeople = computed(() => {
  if (!hasSearched.value) return []

  return people.filter((person) => {
    const matchesSearch =
      !searchQuery.value || person.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesDepartamento =
      !selectedDepartamento.value || person.departamento === selectedDepartamento.value

    const matchesFinca = person.finca === 'Norte'

    const matchesCargo = !selectedCargo.value || person.cargo === selectedCargo.value

    return matchesSearch && matchesDepartamento && matchesCargo
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredPeople.value.length / itemsPerPage)
})

const paginatedPeople = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPeople.value.slice(start, end)
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedDepartamento.value || selectedCargo.value
})

const performSearch = () => {
  hasSearched.value = true
  currentPage.value = 1
  selectedPerson.value = null
}

const selectPerson = (person) => {
  selectedPerson.value = person
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedDepartamento.value = ''
  selectedCargo.value = ''
  hasSearched.value = false
  currentPage.value = 1
  selectedPerson.value = null
}

const clearFilterOne = (numero) => {
  if (searchQuery.value && numero == '1') {
    searchQuery.value = ''
  } else if (selectedDepartamento.value && numero == '2') {
    selectedDepartamento.value = ''
  } else if (selectedCargo.value && numero == '3') {
    selectedCargo.value = ''
  }
  if (searchQuery.value == '' && selectedDepartamento.value == '' && selectedCargo.value == '') {
    searchQuery.value = ''
    selectedDepartamento.value = ''
    selectedCargo.value = ''
    hasSearched.value = false
    currentPage.value = 1
    selectedPerson.value = null
  }
}

const getInitials = (name) => {
  console.log(name)

  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
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
</style>

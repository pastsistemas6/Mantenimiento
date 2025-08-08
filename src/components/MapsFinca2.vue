<template>
  <!-- Componente MapsFinca2.vue -->
  <div
    class="cont w-full flex justify-between flex-wrap items-center gap-2.5 shadow rounded-lg p-4"
  >
    <h2 class="text-2xl text-[#564D87] font-bold">Mapa de ubicaciones</h2>
    <!-- Botón para actualizar la vista del mapa -->
    <button @click="updateView" type="button" class="bg-[#C2DFEA] text-black px-5 py-2 rounded-md">
      Actualizar vista
    </button>
    <div class="divider text-base-content/50 py-1 col-span-full"></div>
    <!-- Contenedor del mapa y la información de los plásticos -->
    <div
      class="card flex flex-col w-full shadow-none rounded-md sm:card-side max-w-sm sm:max-w-full"
    >
      <!-- Mapa de embebido -->
      <div class="map-view rounded-md w-[70%]">
        <!-- Aquí se muestra el mapa embebido de la finca seleccionada -->
        <iframe
          v-if="selectedFincaMap"
          :src="selectedFincaMap"
          width="100%"
          height="100%"
          style="border: 0; border-radius: 8px"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
        <!-- Si no hay finca seleccionada, muestra un mensaje -->
        <div v-else class="flex items-center justify-center h-full bg-gray-100 rounded-md">
          <p class="text-gray-500">Selecciona una finca para ver su ubicación</p>
        </div>
      </div>
      <!-- Información de los plásticos -->
      <div class="card-body w-[30%] p-0 pl-4 flex justify-start">
        <div class="shadow-sm rounded-md p-4">
          <h5 class="card-title mb-2 font-semibold text-black text-xl">Estado de los plásticos</h5>
          <div class="flex items-center gap-1">
            <input type="checkbox" class="checkbox checkbox-success" id="checkboxSuccess" checked />
            <label class="label-text text-base" for="checkboxSuccess"> Plásticos activos </label>
          </div>
          <div class="flex items-center gap-1">
            <input type="checkbox" class="checkbox checkbox-warning" id="checkboxWarning" checked />
            <label class="label-text text-base" for="checkboxWarning"> En mantenimiento </label>
          </div>
          <div class="flex items-center gap-1">
            <input type="checkbox" class="checkbox checkbox-error" id="checkboxError" checked />
            <label class="label-text text-base" for="checkboxError"> Necesita atención </label>
          </div>
          <div class="card-actions mt-5">
            <RouterLink to="dashboard-plasticos" class="btn bg-[#545386] px-2"
              >Ver historial de mantenimiento</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importar dependencias necesarias
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/stores/cart'

// Importar datos de fincas
const cart = useCart()
const router = useRouter()
const fincasData = ref([])
const selectedFincaMap = ref(null)

// Cargar datos del JSON
async function loadFincasData() {
  try {
    // Cargar el archivo JSON de fincas
    const response = await fetch('/lib/fincas.json') // Asegúrate de que la ruta es correcta
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON de fincas')
    }
    // Convertir la respuesta a JSON
    fincasData.value = await response.json()
    updateSelectedFinca()
  } catch (error) {
    console.error('Error cargando datos de fincas:', error)
  }
}

// Actualizar el mapa según la finca seleccionada
function updateSelectedFinca() {
  // Verificar si hay una finca seleccionada en el store
  if (cart.finca && fincasData.value.features) {
    // Buscar la finca seleccionada en los datos cargados
    const fincaEncontrada = fincasData.value.features.find((f) => f.name === cart.finca.nombre)
    selectedFincaMap.value = fincaEncontrada ? fincaEncontrada.link : null
    console.log(selectedFincaMap.value)
  } else {
    selectedFincaMap.value = null
  }
}

// Observar cambios en la finca seleccionada
watch(
  () => cart.finca,
  () => {
    updateSelectedFinca()
  },
  { deep: true },
)

function updateView() {
  // Lógica para actualizar la vista si es necesario
  updateSelectedFinca()
}

// Cargar los datos al montar el componente
onMounted(() => {
  loadFincasData()
})
</script>

<style scoped>
.btn {
  width: 100%;
}
.map-view {
  height: 550px; /* Ajusta según necesites */
}
</style>

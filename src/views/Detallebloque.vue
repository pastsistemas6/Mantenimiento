<template>
  <!-- View para mostrar los detalles de un bloque específico dentro de la aplicación -->
  <header
    class="fixed z-2 flex justify-between items-center py-5 px-10 min-h-16 w-full bg-white shadow-sm border-b-3 border-[#D8D2C4]"
  >
    <div class="flex items-center gap-4">
      <!-- Botón para regresar a la vista de invernaderos -->
      <a
        @click="enviar"
        class="flex items-center text-[#545386] decoration-none mr-4 p-1.5 rounded-sm duration-75 cursor-pointer"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </a>
      <span class="text-3xl text-[#545386] font-bold">Detalles del bloque</span>
    </div>
  </header>
  <!-- Contenedor principal para mostrar los detalles del bloque -->
  <div class="pt-26 py-8 px-8 transition-all duration-300 mx-auto w-full">
    <div class="w-full m-auto bg-white rounded-md shadow-sm p-4 px-6 flex flex-col gap-4">
      <!-- Contenedor para mostrar el contenido del bloque -->
      <div id="contenido">Cargando...</div>
      <div class="flex gap-2">
        <!-- Botones para habilitar la edición y guardar cambios -->
        <button id="btn-editar" class="btn" @click="habilitarEdicion">Habilitar Edición</button>
        <button id="btn-guardar" class="btn" @click="guardarEdicion" disabled>Guardar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importaciones necesarias
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

// Variables reactivas y props
const router = useRouter()
const props = defineProps({
  id: String,
  categoria: String,
})
const id = props.id
const categoria = props.categoria
const featureActual = ref(null)
const geojsonData = ref(null)

// Función para navegar a la vista de invernaderos
function enviar() {
  router.push({ name: 'Invernaderos' })
}

// Función para cargar los datos del bloque desde un archivo GeoJSON
async function cargarDatos() {
  try {
    // Cargar el archivo GeoJSON que contiene los datos de los bloques
    const response = await fetch('/lib/poligonos.geojson')
    geojsonData.value = await response.json()

    // Buscar el bloque específico por ID y categoría
    const feature = geojsonData.value.features.find(
      (f) => f.properties.id == id && f.properties.categoria == categoria,
    )

    // Extraer las imágenes si existen
    let foto_p = ''
    let foto_t = ''
    for (const [key, value] of Object.entries(feature.properties)) {
      if (key === 'FOTO_P') {
        foto_p = String(value)
      }
      if (key === 'FOTO_T') {
        foto_t = String(value)
      }
    }

    // Si no se encuentra el bloque, mostrar un mensaje
    if (!feature) {
      document.getElementById('contenido').innerHTML =
        `No se encontró el bloque con ID ${id} y categoría ${categoria}`
      return
    }

    // Guardar la feature actual para futuras referencias
    featureActual.value = feature

    // Construir el HTML para mostrar los detalles del bloque
    let html = `<form id="form-detalle" class=""><div class=" text-[#545386] text-4xl font-bold mb-8">${categoria} ${id}</div>`
    if (foto_p != '' && foto_t != '') {
      html += `<div class="text-[#545386] text-3xl font-bold mb-6 text-center">Imagenes alusivas</div>`
      html += `<div class="grid grid-cols-2 gap-4 place-content-center place-items-center">`
      html +=
        foto_p != '' && foto_p != 'null'
          ? `<img class="img w-140 h-90 rounded-md" src="${foto_p}" />`
          : `<div class="readonly-note">No cuenta con imagen</div>`
      html +=
        foto_t != '' && foto_t != 'null'
          ? `<img class="img w-140 h-90 rounded-md" src="${foto_t}" />`
          : `<div class="readonly-note">No cuenta con imagen</div>`
      html += `<div class="text-black text-xl font-bold mb-6 text-center">Foto P</div>`
      html += `<div class="text-black text-xl font-bold mb-6 text-center">Foto T</div>`
      html += `</div>`
    }

    // Agregar los campos del formulario con los datos del bloque
    html += `<div class="text-[#545386] text-3xl font-bold mb-6 text-center">Formulario</div>`
    for (const [key, value] of Object.entries(feature.properties)) {
      html += `<div class="flex flex-wrap place-content-center">
          <label class="label-text mb-6 cursor-default w-[30%] font-semibold">${key}</label>
          <input class="input w-[70%]" name="${key}" value="${value ?? '-'}" disabled />
      `

      html += `</div>`
    }

    html += `</form>`
    // Insertar el HTML en el contenedor
    document.getElementById('contenido').innerHTML = html
  } catch (err) {
    document.getElementById('contenido').innerHTML = 'Error al cargar los datos'
    console.error(err)
  }
}

// Función para habilitar la edición de los campos del formulario
function habilitarEdicion() {
  const inputs = document.querySelectorAll('#form-detalle input:not([type="file"])')
  inputs.forEach((input) => input.removeAttribute('disabled'))
  document.getElementById('btn-guardar').removeAttribute('disabled')
}

// Función para guardar los cambios realizados en el formulario
async function guardarEdicion() {
  // Validar que se haya seleccionado un bloque
  const form = document.getElementById('form-detalle')
  const formData = new FormData(form)
  const nuevasProps = {}

  // Recorrer los datos del formulario y convertirlos a un objeto
  formData.forEach((val, key) => {
    nuevasProps[key] = isNaN(val) ? val : Number(val)
  })

  try {
    // Actualizamos los datos en memoria
    const nuevasFeatures = geojsonData.value.features.map((f) => {
      if (f.properties.id == id && f.properties.categoria == categoria) {
        return {
          ...f,
          properties: { ...f.properties, ...nuevasProps },
        }
      }
      return f
    })

    // Creamos el nuevo GeoJSON
    const nuevoGeoJSON = {
      type: 'FeatureCollection',
      features: nuevasFeatures,
    }

    // Guardamos localmente (solo en memoria durante esta sesión)
    geojsonData.value = nuevoGeoJSON

    alert('Cambios guardados (en memoria)')

    // Desactivar inputs nuevamente
    const inputs = document.querySelectorAll('#form-detalle input')
    inputs.forEach((input) => input.setAttribute('disabled', 'true'))
    document.getElementById('btn-guardar').setAttribute('disabled', 'true')
  } catch (err) {
    console.error('Error al guardar:', err)
    alert('Error al guardar los cambios')
  }
}

// Cargar los datos al montar el componente
onMounted(() => {
  cargarDatos()
})
</script>

<style scoped>
/* Estilos para el botón y el formulario */
.btn {
  margin-right: 10px;
  padding: 10px 16px;
  background-color: #545386;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover {
  background-color: #545399;
}
/* Estilos para el contenedor de contenido */
.readonly-note {
  font-style: italic;
  color: #777;
  margin-bottom: 1rem;
}
</style>

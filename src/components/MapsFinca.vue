<template>
  <!-- Componente MapsFinca.vue -->
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
      class="card flex flex-col h-140 w-full shadow-none rounded-md sm:card-side max-w-sm sm:max-w-full"
    >
      <!-- Mapa de Leaflet -->
      <div class="map-view rounded-md w-[70%]">
        <div id="map"></div>
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
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet-draw'
import { useRouter } from 'vue-router'

const router = useRouter()

// Variables para el mapa y los elementos dibujados
let map
let drawnItems

const categoryColors = {}

// Función para obtener un color basado en la categoría
// Si la categoría no tiene un color asignado, se asigna uno de una lista predefinida
function getColorForCategory(category) {
  if (!categoryColors[category]) {
    const colores = [
      'red',
      'red',
      'aqua',
      'violet',
      'black',
      'orange',
      'lime',
      'purple',
      'green',
      'magenta',
      'yellow',
      'aquamarine',
      'aqua',
      'blue',
    ]
    categoryColors[category] = colores[Object.keys(categoryColors).length % colores.length]
  }
  return categoryColors[category]
}

// Función para navegar a la página de detalle de un bloque
function irDetalle(id, categoria) {
  router.push({ name: 'DetalleBloque', params: { id: id, categoria: categoria } })
}

// Función para generar el contenido del popup de edición
function generarPopupEdicion(layer) {
  // Extraer las propiedades del layer
  const props = layer.feature?.properties || {}
  const id = props.id || 0
  const categoria = props.categoria

  // Crear el contenido del popup con la información del layer
  // Incluye un botón para ver el detalle del bloque
  // y muestra las propiedades del layer de forma ordenada
  let contenido = `<div> <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Información</h2>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        ${Object.entries(props)
          .map(
            ([k, v]) => `
          <div style="display: flex; flex-direction: row;">
            <label style="font-weight: bold;">${k}:</label><br>
            <span style="margin-left: 10px;">${v ?? '-'}</span>
          </div>
        `,
          )
          .join('')}
        <button type="button" onclick="window.irDetalle(${id}, '${categoria}')" style="margin-top: 6px; padding: 6px; background: #545386; color: white; border: none; border-radius: 4px;">Ver Detalle</button>
      </div>
    </div>
  `
  layer.bindPopup(contenido)
}

// Función para cargar los datos del GeoJSON
// Esta función se encarga de cargar los datos del archivo GeoJSON y crear los marcadores
// o capas correspondientes en el mapa
async function loadData() {
  // Cargar el archivo GeoJSON y procesar sus datos
  const response = await fetch('/lib/poligonos.geojson')
  const geojsonData = await response.json()

  // Crear una capa de GeoJSON en el mapa
  // Itera sobre cada feature del GeoJSON y crea un marcador o capa según su tipo
  L.geoJSON(geojsonData, {
    onEachFeature: function (feature, layer) {
      if (feature.geometry.type === 'MultiPoint') {
        const coords = feature.geometry.coordinates[0]
        const latlng = L.latLng(coords[1], coords[0])

        const marker = L.marker(latlng, {
          icon: L.divIcon({
            className: 'custom-poste-icon',
            iconSize: [12, 12],
          }),
        })
        marker.feature = feature
        generarPopupEdicion(marker)
        drawnItems.addLayer(marker)
      } else {
        generarPopupEdicion(layer)
        drawnItems.addLayer(layer)

        if (
          feature.properties.categoria === 'CABLEVIA' ||
          feature.properties.categoria === 'EDIFICIOS' ||
          feature.geometry.type.includes('Line')
        ) {
          layer.bringToFront()
        } else {
          layer.bringToBack()
        }
      }
    },
    // Estilo de las capas según la categoría
    // Utiliza la función getColorForCategory para asignar un color a cada categoría
    style: function (feature) {
      return {
        color: getColorForCategory(feature.properties?.categoria),
        weight: 4,
        fillOpacity: 0,
      }
    },
  })
}

// Función para inicializar el mapa
// Configura el mapa, las capas base y los eventos de dibujo
function setupMap() {
  map = L.map('map').setView([4.78285, -74.28604], 16)

  // Capas base
  const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 22,
    minNativeZoom: 0,
    maxNativeZoom: 19,
  }).addTo(map)

  const satelite = L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
    minZoom: 1,
    maxZoom: 22,
    minNativeZoom: 0,
    maxNativeZoom: 24,
  })

  L.control.layers({ OpenStreetMap: osm, Satélite: satelite }).addTo(map)

  // Grupo de capas editables
  drawnItems = new L.FeatureGroup()
  map.addLayer(drawnItems)

  // Evento creación
  map.on(L.Draw.Event.CREATED, (e) => {
    const layer = e.layer
    layer.feature = {
      type: 'Feature',
      properties: {},
      geometry: layer.toGeoJSON().geometry,
    }
    generarPopupEdicion(layer)
    layer.on('click', () => {
      layer.openPopup()
    })
    drawnItems.addLayer(layer)
  })

  loadData()
}

// Función para actualizar la vista del mapa
function updateView() {
  if (map) {
    map.invalidateSize()
  }
}

// Onmounted hook para inicializar el mapa
onMounted(() => {
  setupMap()
  window.irDetalle = irDetalle // Hacemos la función disponible globalmente para los popups
})
</script>

<style scoped>
/* Estilos para el contenedor del mapa y los elementos dibujados */
.btn {
  width: 100%;
}
/* Estilos para el mapa */
#map {
  height: 100%;
  width: 100%;
  z-index: 1;
}
</style>

<style>
/* Estilos para el icono personalizado del poste */
.custom-poste-icon {
  background-color: red;
  border: 2px solid white;
  border-radius: 50%;
  width: 12px;
  height: 12px;
}
</style>

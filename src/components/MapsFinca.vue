<template>
  <div
    class="cont w-full flex justify-between flex-wrap items-center gap-2.5 shadow rounded-lg p-4"
  >
    <h2 class="text-2xl text-[#564D87] font-bold">Mapa de ubicaciones</h2>
    <button @click="updateView" type="button" class="bg-[#C2DFEA] text-black px-5 py-2 rounded-md">
      Actualizar vista
    </button>
    <div class="divider text-base-content/50 py-1 col-span-full"></div>
    <div
      class="card flex flex-col h-140 w-full shadow-none rounded-md sm:card-side max-w-sm sm:max-w-full"
    >
      <div class="map-view rounded-md w-[70%]">
        <div id="map"></div>
      </div>
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
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet-draw'
import { useRouter } from 'vue-router'

const router = useRouter()

let map
let drawnItems

const categoryColors = {}

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

function irDetalle(id, categoria) {
  router.push({ name: 'DetalleBloque', params: { id: id, categoria: categoria } })
}

function generarPopupEdicion(layer) {
  const props = layer.feature?.properties || {}
  const id = props.id || 0
  const categoria = props.categoria

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

async function loadData() {
  const response = await fetch('/lib/poligonos.geojson')
  const geojsonData = await response.json()

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
    style: function (feature) {
      return {
        color: getColorForCategory(feature.properties?.categoria),
        weight: 4,
        fillOpacity: 0,
      }
    },
  })
}

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

function updateView() {
  if (map) {
    map.invalidateSize()
  }
}

onMounted(() => {
  setupMap()
  window.irDetalle = irDetalle // Hacemos la función disponible globalmente para los popups
})
</script>

<style scoped>
.btn {
  width: 100%;
}
#map {
  height: 100%;
  width: 100%;
  z-index: 1;
}
</style>

<style>
.custom-poste-icon {
  background-color: red;
  border: 2px solid white;
  border-radius: 50%;
  width: 12px;
  height: 12px;
}
</style>

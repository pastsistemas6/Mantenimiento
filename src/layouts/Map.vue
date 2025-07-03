<template>
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div id="map-section" class="flex flex-col justify-between gap-4 shadow px-4 py-4 rounded-lg">
        <div class="flex justify-between">
          <h3 class="text-3xl font-bold text-[#545386]">Mapa de finca</h3>
          <button id="layer-filter-btn" class="btn bg-[#545386] border-0" title="Filtrar capas">
            Filtro
          </button>
        </div>
        <div class="divider text-base-content/50 col-span-full"></div>
        <div class="flex h-150 relative overflow-hidden rounded-md shadow">
          <div class="w-9/12 h-full relative overflow-hidden rounded-md">
            <div id="flower-map" class="w-full h-full relative z-1"></div>
            <div id="layer-filter-panel" class="layer-filter-panel shadow-md">
              <div class="layer-filter-header">
                <h4>Filtrar Capas</h4>
                <button class="close-filter-btn">X</button>
              </div>
              <div class="layer-filter-content">
                <div class="filter-group">
                  <h5>Tipos de Cultivo</h5>
                  <div class="filter-options">
                    <label class="filter-option">
                      <input type="checkbox" name="cultivo" value="rosas" checked />
                      <span>Rosas</span>
                    </label>
                    <label class="filter-option">
                      <input type="checkbox" name="cultivo" value="claveles" checked />
                      <span>Claveles</span>
                    </label>
                    <label class="filter-option">
                      <input type="checkbox" name="cultivo" value="lirios" checked />
                      <span>Lirios</span>
                    </label>
                  </div>
                </div>
                <div class="filter-group">
                  <h5>Estado</h5>
                  <div class="filter-options">
                    <label class="filter-option">
                      <input type="checkbox" name="estado" value="activo" checked />
                      <span>Activo</span>
                    </label>
                    <label class="filter-option">
                      <input type="checkbox" name="estado" value="mantenimiento" checked />
                      <span>En Mantenimiento</span>
                    </label>
                    <label class="filter-option">
                      <input type="checkbox" name="estado" value="inactivo" checked />
                      <span>Inactivo</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-4/12 p-4 bg-[#f8f9fa] overflow-y-auto">
            <div class="p-4 shadow rounded-md flex flex-col gap-4">
              <h4 class="font-semibold">🌸 Gestión de Finca</h4>
              <div class="flex flex-col p-3 gap-3 bg-[#D8D2C4] rounded-md">
                <h5 class="text-[#545386] font-medium text-sm mb-1">Estadísticas</h5>
                <div class="text-sm flex justify-between">
                  <span>Total Bloques:</span>
                  <span id="total-blocks">0</span>
                </div>
                <div class="text-sm flex justify-between">
                  <span>Área Total:</span>
                  <span id="total-area">0 m²</span>
                </div>
                <div class="text-sm flex justify-between">
                  <span>Último Riego:</span>
                  <span id="last-irrigation">Hoy</span>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <h5 class="font-semibold">Controles</h5>
                <button id="add-block" class="btn bg-[#545386] border-0 text-sm">
                  <i class="fas fa-plus"></i> Agregar Bloque
                </button>
                <button
                  id="edit-block"
                  class="btn bg-[#C2DFEA] text-black border-0 text-sm"
                  disabled
                >
                  <i class="fas fa-edit"></i> Editar Bloque
                </button>
                <button id="delete-block" class="btn btn-danger border-0 text-sm" disabled>
                  <i class="fas fa-trash"></i> Eliminar Bloque
                </button>
              </div>
              <div class="p-3 bg-[#D8D2C4] rounded-md flex flex-col gap-2">
                <h5 class="text-[#545386] font-medium text-sm">Información del bloque</h5>
                <div id="block-details" class="text-sm">
                  <p>Seleccione un bloque para ver su información</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  // Crear el mapa de flores
  var flowerMap = L.map('flower-map').setView([4.78285, -74.28604], 16)

  // Definir las capas base
  var osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 22,
    minNativeZoom: 0,
    maxNativeZoom: 19,
  })

  var satelliteLayer = L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
    minZoom: 1,
    maxZoom: 22,
    minNativeZoom: 0,
    maxNativeZoom: 24,
  })

  // Agregar la capa base por defecto
  osmLayer.addTo(flowerMap)

  // Crear el control de capas base
  var baseMaps = {
    OpenStreetMap: osmLayer,
    Satélite: satelliteLayer,
  }

  // Agregar el control de capas
  L.control
    .layers(baseMaps, null, {
      position: 'topright',
      collapsed: false,
    })
    .addTo(flowerMap)

  // Estilizar el control de capas
  var layerControl = document.querySelector('.leaflet-control-layers')
  if (layerControl) {
    layerControl.style.background = 'white'
    layerControl.style.borderRadius = '8px'
    layerControl.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'
    layerControl.style.padding = '10px'
    layerControl.style.margin = '10px'
    layerControl.style.minWidth = '200px'
  }

  // Agregar botón de pantalla completa
  var fullscreenButton = L.control({ position: 'topright' })
  fullscreenButton.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control')
    div.innerHTML =
      '<a href="#" title="Pantalla completa" style="width: 36px; height: 36px; line-height: 36px; display: block; text-align: center; text-decoration: none; color: #333; background: white; border-radius: 4px;"><i class="fas fa-expand"></i></a>'

    div.onclick = function (e) {
      e.preventDefault()
      var mapContainer = document.getElementById('flower-map')
      if (!document.fullscreenElement) {
        if (mapContainer.requestFullscreen) {
          mapContainer.requestFullscreen()
        } else if (mapContainer.webkitRequestFullscreen) {
          mapContainer.webkitRequestFullscreen()
        } else if (mapContainer.msRequestFullscreen) {
          mapContainer.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    }

    return div
  }
  fullscreenButton.addTo(flowerMap)

  // Ajustar el mapa cuando cambie el modo de pantalla completa
  document.addEventListener('fullscreenchange', function () {
    setTimeout(function () {
      flowerMap.invalidateSize()
    }, 100)
  })

  // Inicializar el control de dibujo
  var drawnItems = new L.FeatureGroup()
  flowerMap.addLayer(drawnItems)

  var drawControl = new L.Control.Draw({
    draw: {
      polygon: {
        allowIntersection: false,
        drawError: {
          color: '#e1e4e8',
          timeout: 1000,
        },
        shapeOptions: {
          color: '#4CAF50',
        },
      },
      circle: false,
      rectangle: false,
      polyline: false,
      circlemarker: false,
      marker: false,
    },
    edit: {
      featureGroup: drawnItems,
      remove: true,
    },
  })
  flowerMap.addControl(drawControl)

  // Manejar eventos de dibujo
  flowerMap.on('draw:created', function (e) {
    var type = e.layerType
    var layer = e.layer

    if (type === 'polygon') {
      drawnItems.addLayer(layer)
      updateStats()
    }
  })

  // Manejar eventos de edición
  flowerMap.on('draw:edited', function (e) {
    updateStats()
  })

  flowerMap.on('draw:deleted', function (e) {
    updateStats()
  })

  // Función para actualizar estadísticas
  function updateStats() {
    var totalBlocks = drawnItems.getLayers().length
    var totalArea = 0

    drawnItems.eachLayer(function (layer) {
      if (layer instanceof L.Polygon) {
        totalArea += L.GeometryUtil.geodesicArea(layer.getLatLngs()[0])
      }
    })

    document.getElementById('total-blocks').textContent = totalBlocks
    document.getElementById('total-area').textContent = totalArea.toFixed(2) + ' m²'
  }

  // Manejar el panel de filtros
  var layerFilterBtn = document.getElementById('layer-filter-btn')
  var layerFilterPanel = document.getElementById('layer-filter-panel')
  var closeFilterBtn = document.querySelector('.close-filter-btn')

  layerFilterBtn.addEventListener('click', function () {
    layerFilterPanel.classList.toggle('active')
  })

  closeFilterBtn.addEventListener('click', function () {
    layerFilterPanel.classList.remove('active')
  })

  // Manejar los filtros
  var filterInputs = document.querySelectorAll('.filter-option input')
  filterInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      // Aquí implementaremos la lógica de filtrado
      console.log('Filtro cambiado:', this.name, this.value, this.checked)
    })
  })

  /* Prevenir el comportamiento de reinicio de página
      document.querySelector('.map-view').addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
      }, { passive: false });*/
})
</script>

<style scoped>
/* Estilos para el botón de pantalla completa */
.leaflet-control-fullscreen {
  margin-bottom: 10px !important;
}

.leaflet-control-fullscreen a:hover {
  background-color: #f5f5f5 !important;
  color: #4caf50 !important;
}

.leaflet-control-fullscreen a i {
  font-size: 16px !important;
}

/* Estilos para el panel de filtros */
.layer-filter-panel {
  position: absolute;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  background: white;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
}

.layer-filter-panel.active {
  right: 0;
}

.layer-filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid gray;
}

.layer-filter-header h4 {
  margin: 0;
  color: black;
}

.close-filter-btn {
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  padding: 0.5rem;
  transition: black 0.2s ease;
}

.close-filter-btn:hover {
  color: black;
}

.layer-filter-content {
  padding: 1rem;
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group h5 {
  margin: 0 0 1rem 0;
  color: black;
  font-size: 0.9rem;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.filter-option input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.filter-option span {
  font-size: 0.9rem;
  color: var(--text-color);
}
</style>

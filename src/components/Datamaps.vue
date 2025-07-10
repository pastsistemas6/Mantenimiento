<template>
  <h2 class="text-3xl font-bold text-[#383A35] mb-3">Bienvenido al sistema de mantenimiento</h2>
  <p class="mb-5">
    Elite Flower es una empresa líder en la industria de las flores, dedicada a producir flores de
    alta calidad para exportación. Este sistema de mantenimiento ayuda a gestionar recursos y
    realizar seguimiento a las actividades de mantenimiento en todas las fincas.
  </p>

  <!-- Controles de navegación -->
  <div class="map-controls mb-4" v-if="currentView === 'colombia'">
    <button
      @click="resetToWorld"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
    >
      ← Volver al mapa mundial
    </button>
    <span class="ml-4 text-gray-600">Vista: Colombia - Ciudades y Regiones</span>
  </div>

  <div class="map-controls mb-4" v-if="currentView === 'world'">
    <span class="text-gray-600">Haz clic en Colombia para ver el detalle de ciudades</span>
  </div>

  <div id="countries-datamap" style="width: 100%"></div>

  <!-- Leyenda para el mapa de Colombia -->
  <div v-if="currentView === 'colombia'" class="legend mt-4 p-4 bg-gray-50 rounded-lg">
    <h3 class="font-bold mb-2">Leyenda:</h3>
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-[#545386] rounded"></div>
        <span>Fincas Principales</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-[#F4C7CE] rounded"></div>
        <span>Fincas Secundarias</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-[#66BB6A] rounded"></div>
        <span>Ciudades de Distribución</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 bg-[#d3d3d3] rounded"></div>
        <span>Otras Regiones</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue'

const currentView = ref('world')
let currentDataMap = null

// Datos del mapa mundial
const worldDataSet = {
  COL: {
    fincas: {
      value: '20',
      percent: '8.0',
      isGrown: true,
    },
    import: {
      value: '1,800',
      percent: '10.5',
      isGrown: true,
    },
    export: {
      value: '450',
      percent: '8.0',
      isGrown: true,
    },
    fillKey: 'MAJOR',
    short: 'co',
  },
  ECU: {
    fincas: {
      value: '2',
      percent: '4.0',
      isGrown: false,
    },
    import: {
      value: '1,800',
      percent: '10.5',
      isGrown: true,
    },
    export: {
      value: '450',
      percent: '8.0',
      isGrown: true,
    },
    fillKey: 'MAJOR',
    short: 'ecu',
  },
  KEN: {
    fincas: {
      value: '1',
      percent: '2.0',
      isGrown: false,
    },
    import: {
      value: '1,800',
      percent: '10.5',
      isGrown: true,
    },
    export: {
      value: '450',
      percent: '8.0',
      isGrown: true,
    },
    fillKey: 'MAJOR',
    short: 'co',
  },
}

// Datos específicos para Colombia (simulando datos de ciudades/regiones)
const colombiaDataSet = {
  // Cundinamarca (donde está Facatativá)
  'CUNDINAMARCA': {
    name: 'Cundinamarca',
    fincas: 8,
    tipo: 'Principal',
    ciudad: 'Facatativá, Bogotá',
    fillKey: 'PRIMARY_FARM',
  },
  // Antioquia
  'ANTIOQUIA': {
    name: 'Antioquia',
    fincas: 5,
    tipo: 'Principal',
    ciudad: 'Medellín, Rionegro',
    fillKey: 'PRIMARY_FARM',
  },
  // Valle del Cauca
  'VALLE DEL CAUCA': {
    name: 'Valle del Cauca',
    fincas: 3,
    tipo: 'Secundaria',
    ciudad: 'Cali, Palmira',
    fillKey: 'SECONDARY_FARM',
  },
  // Boyacá
  'BOYACÁ': {
    name: 'Boyacá',
    fincas: 2,
    tipo: 'Secundaria',
    ciudad: 'Tunja, Duitama',
    fillKey: 'SECONDARY_FARM',
  },
  // Quindío
  'QUINDÍO': {
    name: 'Quindío',
    fincas: 1,
    tipo: 'Distribución',
    ciudad: 'Armenia',
    fillKey: 'DISTRIBUTION',
  },
  // Caldas
  'CALDAS': {
    name: 'Caldas',
    fincas: 1,
    tipo: 'Distribución',
    ciudad: 'Manizales',
    fillKey: 'DISTRIBUTION',
  },
}

function loadScripts(sources) {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            resolve()
            return
          }
          const script = document.createElement('script')
          script.src = src
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        }),
    ),
  )
}

function waitForLibraries() {
  return new Promise((resolve) => {
    const checkLibraries = () => {
      if (window.d3 && window.topojson && window.Datamap) {
        resolve()
      } else {
        setTimeout(checkLibraries, 100)
      }
    }
    checkLibraries()
  })
}

function createWorldMap() {
  const container = document.querySelector('#countries-datamap')
 if (!container) {
    console.error('El contenedor del mapa no se encontró.')
    return
  }

  // Limpiar contenedor
  container.innerHTML = ''

  // Asegurar que el contenedor tenga dimensiones
  if (container.offsetWidth === 0 || container.offsetHeight === 0) {
    console.warn('El contenedor no tiene dimensiones visibles')
    // Aplicar dimensiones por defecto
    container.style.width = '100%'
    container.style.height = '500px'
  }

  currentDataMap = new window.Datamap({
    element: container,
    projection: 'mercator',
    responsive: true,
    fills: {
      defaultFill: '#d3d3d3',
      MAJOR: '#545386',
    },
    data: worldDataSet,
    done: function(datamap) {
      // Agregar evento click para Colombia
      datamap.svg.selectAll('.datamaps-subunit.COL').on('click', function(geography) {
        zoomToColombia()
      })
    },
    geographyConfig: {
      borderColor: '#000',
      highlightFillColor: '#f00',
      highlightBorderColor: '#f00',
      popupTemplate: function (geo, data) {
        if (!data) return `<div class="datamap-hoverover">${geo.properties.name}</div>`

        const growUp = `↗️`
        const growDown = `↘️`

        return `
          <div class="datamap-hoverover" style="background: white; border: 1px solid #ccc; border-radius: 8px; padding: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 200px; position: absolute; z-index: 1000;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
              <span style="font-size: 16px;">🏳️</span>
              <span style="font-weight: bold; color: #333;">${data.customName || geo.properties.name}</span>
            </div>
            <div style="font-size: 12px; color: #666;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span>Fincass: <strong>${data.fincas.value}</strong></span>
                <span style="color: ${data.fincas.isGrown ? 'green' : 'red'};">
                  ${data.fincas.percent}% ${data.fincas.isGrown ? growUp : growDown}
                </span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span>Import: <strong>${data.import.value}M</strong></span>
                <span style="color: ${data.import.isGrown ? 'green' : 'red'};">
                  ${data.import.percent}% ${data.import.isGrown ? growUp : growDown}
                </span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Export: <strong>${data.export.value}M</strong></span>
                <span style="color: ${data.export.isGrown ? 'green' : 'red'};">
                  ${data.export.percent}% ${data.export.isGrown ? growUp : growDown}
                </span>
              </div>
            </div>
            ${geo.id === 'COL' ? '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee; font-size: 11px; color: #007bff;">🖱️ Haz clic para ver detalle</div>' : ''}
          </div>`
      },
    },
  })
}

async function loadColombiaTopojson() {
  try {
    // Opción 1: Si tienes el archivo en la carpeta public/assets
    // const response = await fetch('/assets/colombia.topojson')

    // Opción 2: Si tienes el archivo en la carpeta src/assets (con import)
    // const colombiaTopojson = await import('@/assets/colombia.topojson')

    // Opción 3: Si tienes el archivo como string/objeto (más común)
    // Aquí necesitarías pegar el contenido de tu archivo TopoJSON
    const response = await fetch('/lib/colombia.geojson') // Ajusta la ruta según tu estructura

    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo TopoJSON de Colombia')
    }

    const colombiaTopojson = await response.json()
    return colombiaTopojson
  } catch (error) {
    console.error('Error cargando TopoJSON de Colombia:', error)
    // Fallback al mapa por defecto si no se puede cargar
    return null
  }
}

async function createColombiaMap() {
  const container = document.querySelector('#countries-datamap')
  if (!container) return

  // Limpiar contenedor
  container.innerHTML = ''

  // Cargar el TopoJSON de Colombia
  const colombiaTopojson = await loadColombiaTopojson()

  if (colombiaTopojson) {
    // Crear mapa personalizado con tu TopoJSON
    createCustomColombiaMap(container, colombiaTopojson)
  } else {
    // Usar el mapa por defecto si no se puede cargar el TopoJSON
    createDefaultColombiaMap(container)
  }
}

function createCustomColombiaMap(container, topojsonData) {
  const width = container.offsetWidth || 800
  const height = 500

  // Crear SVG
  const svg = window.d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // Configurar proyección para Colombia
  const projection = window.d3.geo.mercator()
    .scale(1700)
    .center([-74, 4.5]) // Centrar en Colombia
    .translate([width / 2, height / 2])

  const path = window.d3.geo.path()
    .projection(projection)

  // Convertir TopoJSON a GeoJSON
  const features = topojsonData

  // Dibujar los departamentos
  svg.selectAll('path')
    .data(features.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('class', 'department')
    .style('fill', function(d) {
      // Buscar datos para este departamento
      const deptData = colombiaDataSet[d.properties.DPTO_CNMBR] || colombiaDataSet[d.properties.NAME_1] || colombiaDataSet[d.id]
      if (deptData) {
        switch(deptData.fillKey) {
          case 'PRIMARY_FARM': return '#545386'
          case 'SECONDARY_FARM': return '#F4C7CE'
          case 'DISTRIBUTION': return '#66BB6A'
          default: return '#d3d3d3'
        }
      }
      return '#d3d3d3'
    })
    .style('stroke', '#000')
    .style('stroke-width', 1)
    .style('cursor', 'pointer')
    .on('mouseover', function(d) {
      window.d3.select(this).style('fill', '#c2dfea')
      showTooltip(d, window.d3.event)
    })
    .on('mouseout', function(d) {
      window.d3.select(this).style('fill', function(d) {
        const deptData = colombiaDataSet[d.properties.DPTO_CNMBR] || colombiaDataSet[d.properties.NAME_1] || colombiaDataSet[d.id]
        if (deptData) {
          switch(deptData.fillKey) {
            case 'PRIMARY_FARM': return '#545386'
            case 'SECONDARY_FARM': return '#F4C7CE'
            case 'DISTRIBUTION': return '#66BB6A'
            default: return '#d3d3d3'
          }
        }
        return '#d3d3d3'
      })
      hideTooltip()
    })

  // Función para mostrar tooltip
  function showTooltip(d, event) {
    const deptData = colombiaDataSet[d.properties.DPTO_CNMBR] || colombiaDataSet[d.properties.NAME_1] || colombiaDataSet[d.id]
    const name = d.properties.DPTO_CNMBR || d.properties.NAME_1 || d.properties.name || 'Región'

    let content = `<div class="datamap-hoverover" style="background: white; border: 1px solid #ccc; border-radius: 8px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="font-weight: bold; color: #333;">${name}</div>`

    if (deptData) {
      const iconMap = {
        'Principal': '🏭',
        'Secundaria': '🏪',
        'Distribución': '🚚'
      }

      content += `
        <div style="font-size: 12px; color: #666; margin-top: 8px;">
          <div style="margin-bottom: 4px;">
            <span>${iconMap[deptData.tipo] || '📍'} Tipo: <strong style="color: #007bff;">${deptData.tipo}</strong></span>
          </div>
          <div style="margin-bottom: 4px;">
            <span>Fincas: <strong>${deptData.fincas}</strong></span>
          </div>
          <div style="margin-bottom: 4px;">
            <span>Ciudades: <strong>${deptData.ciudad}</strong></span>
          </div>
        </div>`
    }

    content += '</div>'

    const tooltip = window.d3.select('body')
      .append('div')
      .attr('class', 'datamap-tooltip')
      .style('position', 'absolute')
      .style('z-index', '1000')
      .style('pointer-events', 'none')
      .html(content)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px')
  }

  function hideTooltip() {
    window.d3.selectAll('.datamap-tooltip').remove()
  }

  // Almacenar referencia para redimensionamiento
  currentDataMap = {
    resize: function() {
      // Implementar redimensionamiento si es necesario
      const newWidth = container.offsetWidth || 800
      svg.attr('width', newWidth)
      projection.translate([newWidth / 2, height / 2])
      svg.selectAll('path').attr('d', path)
    }
  }
}

function createDefaultColombiaMap(container) {
  // Mapa por defecto usando Datamaps
  currentDataMap = new window.Datamap({
    element: container,
    scope: 'colombia',
    projection: 'mercator',
    responsive: true,
    fills: {
      defaultFill: '#d3d3d3',
      PRIMARY_FARM: '#545386',
      SECONDARY_FARM: '#F4C7CE',
      DISTRIBUTION: '#66BB6A',
    },
    data: colombiaDataSet,
    geographyConfig: {
      borderColor: '#000',
      borderWidth: 1,
      highlightFillColor: '#c2dfea',
      highlightBorderColor: '#000',
      highlightBorderWidth: 2,
      popupTemplate: function (geo, data) {
        if (!data) return `<div class="datamap-hoverover">${geo.properties.name || geo.properties.NAME_1}</div>`

        const iconMap = {
          'Principal': '🏭',
          'Secundaria': '🏪',
          'Distribución': '🚚'
        }

        return `
          <div class="datamap-hoverover" style="background: white; border: 1px solid #ccc; border-radius: 8px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 220px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
              <span style="font-size: 16px;">${iconMap[data.tipo] || '📍'}</span>
              <span style="font-weight: bold; color: #333;">${data.name}</span>
            </div>
            <div style="font-size: 12px; color: #666;">
              <div style="margin-bottom: 4px;">
                <span>Tipo: <strong style="color: #007bff;">${data.tipo}</strong></span>
              </div>
              <div style="margin-bottom: 4px;">
                <span>Fincas: <strong>${data.fincas}</strong></span>
              </div>
              <div style="margin-bottom: 4px;">
                <span>Ciudades: <strong>${data.ciudad}</strong></span>
              </div>
            </div>
          </div>`
      },
    },
  })
}

function zoomToColombia() {
  currentView.value = 'colombia'
  nextTick(() => {
    createColombiaMap()
  })
}

function resetToWorld() {
  currentView.value = 'world'
  nextTick(() => {
    createWorldMap()
  })
}

onMounted(async () => {
  try {
    await loadScripts([
      'https://d3js.org/d3.v3.min.js',
      'https://unpkg.com/topojson@1.6.9/topojson.min.js',
      'https://unpkg.com/datamaps@0.5.9/dist/datamaps.world.min.js',
    ])

    await waitForLibraries()
    await nextTick()

    // Crear el mapa mundial inicialmente
    createWorldMap()

    // Configurar responsividad
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (currentDataMap && currentDataMap.resize) {
          currentDataMap.resize()
        }
      }, 250)
    })

    console.log('Mapa inicializado correctamente')
  } catch (error) {
    console.error('Error al inicializar el mapa:', error)
  }
})
</script>

<style scoped>
#countries-datamap {
  height: 535px !important;
  overflow: hidden !important;
  padding-bottom: 0 !important;
}

.map-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.legend {
  border: 1px solid #ddd;
}

:global(.datamap) {
  height: 500px !important;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
  scale: 1 !important;
}

:global(.datamaps-subunit) {
  cursor: pointer;
  transition: fill 0.3s ease;
  fill: #d3d3d3 !important;
  stroke: black !important;
  stroke-width: 1px !important;
}

:global(.datamaps-subunit.COL) {
  fill: #545386 !important;
}

:global(.datamaps-subunit[class*='KEN']) {
  fill: #545386 !important;
}

:global(.datamaps-subunit[class*='ECU']) {
  fill: #545386 !important;
}

:global(.datamaps-subunit:hover) {
  fill: #c2dfea !important;
  stroke: black !important;
  stroke-width: 1px !important;
}

:global(.datamap-hoverover) {
  z-index: 1000 !important;
  color: black;
  padding: 5px 8px;
  background-color: #fff;
  border-radius: 5px;
  border: 0.5px solid rgb(80, 80, 80);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Estilos específicos para el mapa de Colombia */
:global(.datamaps-subunit[data-id*='CO-']) {
  stroke: #000 !important;
  stroke-width: 1px !important;
}

:global(.datamaps-subunit[data-id*='CO-']:hover) {
  stroke: #007bff !important;
  stroke-width: 2px !important;
}
</style>

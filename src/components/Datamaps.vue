<template>
  <h2 class="text-3xl font-bold text-[#545386] mb-3">Bienvenido al sistema de mantenimiento</h2>
  <p class="mb-5">
    Elite Flower es una empresa líder en la industria de las flores, dedicada a producir flores de
    alta calidad para exportación. Este sistema de mantenimiento ayuda a gestionar recursos y
    realizar seguimiento a las actividades de mantenimiento en todas las fincas.
  </p>

  <!-- Controles de navegación -->
  <div class="map-controls mb-4" v-if="currentView !== 'world'">
    <button
      @click="resetToWorld"
      class="bg-[#545386] text-white px-4 py-2 rounded-md transition-colors"
    >
      ← Volver al mapa mundial
    </button>
    <span class="ml-4 text-gray-600">Vista: {{ currentViewLabel }}</span>
  </div>

  <div class="map-controls mb-4" v-if="currentView === 'world'">
    <span class="text-gray-600">Haz clic en un país para ver el detalle de regiones</span>
  </div>

  <div class="flex gap-6">
    <!-- Panel izquierdo con lista -->
    <div class="w-80 bg-white border rounded-lg p-4 h-[520px] overflow-y-auto" v-if="currentView !== 'world'">
      <!-- Lista de regiones -->
      <div v-if="!showFarmsList">
        <h3 class="text-lg font-bold text-[#545386] mb-4">
          Regiones - {{ currentView.charAt(0).toUpperCase() + currentView.slice(1) }}
        </h3>
        <div class="space-y-2">
          <div
            v-for="region in currentCountryRegions"
            :key="region.id"
            @click="selectRegion(region)"
            class="p-3 border rounded-lg cursor-pointer hover:bg-base-content/20 hover:border-[#545386] transition-colors"
            :class="{ 'bg-[#f8f9fa] border-[#545386]': selectedRegion?.id === region.id }"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-semibold text-gray-800">{{ region.name }}</h4>
                <p class="text-sm text-gray-600">{{ region.fincas }} fincas • {{ region.tipo }}</p>
                <p class="text-xs text-gray-500">{{ region.ciudad }}</p>
              </div>
              <div class="text-[#545386]">→</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de fincas -->
      <div v-if="showFarmsList && selectedRegion">
        <div class="flex items-center gap-2 mb-4">
          <button
            @click="backToRegions"
            class="btn text-white bg-[#545386] shadow-none border-0 text-sm"
          >
            ← Volver a regiones
          </button>
        </div>

        <h3 class="text-lg font-bold text-[#545386] mb-2">{{ selectedRegion.name }}</h3>
        <p class="text-sm text-gray-600 mb-4">{{ currentRegionFarms.length }} fincas disponibles</p>

        <div class="space-y-2">
          <div
            v-for="farm in currentRegionFarms"
            :key="farm.id"
            @click="selectFarm(farm)"
            class="p-3 border rounded-lg cursor-pointer hover:bg-base-content/20 hover:border-[#545386] transition-colors"
            :class="{ 'bg-[#545386] hover:bg-[#545386]! text-white border-[#545386]': selectedFarm ? selectedFarm?.id === farm.id : cart.finca.id === farm.id }"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h4 class="font-semibold" :class="selectedFarm ? selectedFarm?.id === farm.id : cart.finca.id === farm.id ? 'text-white' : 'text-gray-800'">
                  {{ farm.nombre }}
                </h4>
                <p class="text-sm" :class="selectedFarm ? selectedFarm?.id === farm.id : cart.finca.id === farm.id ? 'text-gray-200' : 'text-gray-600'">
                  {{ farm.ciudad }} • {{ farm.hectareas }}ha
                </p>
                <span
                  class="inline-block px-2 py-1 rounded-full text-xs mt-1"
                  :class="farm.estado === 'Activa'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'"
                >
                  {{ farm.estado }}
                </span>
              </div>
              <div v-if="selectedFarm ? selectedFarm?.id === farm.id : cart.finca.id === farm.id" class="text-white ml-2">
                ✓
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedFarm && cart.finca || selectedFarm || hasFinca" class="mt-8 p-3 bg-[#f8f9fa] rounded-lg border-l-6 border-[#545386]">
          <p class="text-md font-medium text-gray-800">Finca seleccionada:</p>
          <p class="text-sm text-gray-600">{{ selectedFarm ? selectedFarm.nombre : cart.finca.nombre }} ({{ selectedFarm ? selectedFarm.id : cart.finca.id }})</p>
        </div>
      </div>
    </div>

    <!-- Mapa (lado derecho) -->
    <div class="flex-1">
      <div id="countries-datamap" style="width: 100%"></div>
    </div>
  </div>

  <!-- Leyenda dinámica según el país -->
  <div v-if="currentView !== 'world'" class="legend mt-4 p-4 bg-gray-50 rounded-lg">
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
import { onMounted, nextTick, ref, computed } from 'vue'
import { useCart } from '@/stores/cart'

const currentView = ref('world') // 'world', 'colombia', 'ecuador', 'kenya'
const currentViewLabel = computed(() => {
  switch (currentView.value) {
    case 'colombia':
      return 'Colombia - Ciudades y Regiones'
    case 'ecuador':
      return 'Ecuador - Ciudades y Regiones'
    case 'kenya':
      return 'Kenya - Ciudades y Regiones'
    default:
      return ''
  }
})

let currentDataMap = null
const selectedRegion = ref(null)
const selectedFarm = ref(null)
const showFarmsList = ref(false)
const cart = useCart()

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
    short: 'ken',
  },
}

// Datos específicos para Colombia
const colombiaDataSet = {
  CUNDINAMARCA: {
    name: 'Cundinamarca',
    fincas: 8,
    tipo: 'Principal',
    ciudad: 'Facatativá, Bogotá',
    fillKey: 'PRIMARY_FARM',
  },
  ANTIOQUIA: {
    name: 'Antioquia',
    fincas: 5,
    tipo: 'Principal',
    ciudad: 'Medellín, Rionegro',
    fillKey: 'PRIMARY_FARM',
  },
  'VALLE DEL CAUCA': {
    name: 'Valle del Cauca',
    fincas: 3,
    tipo: 'Secundaria',
    ciudad: 'Cali, Palmira',
    fillKey: 'SECONDARY_FARM',
  },
  BOYACÁ: {
    name: 'Boyacá',
    fincas: 2,
    tipo: 'Secundaria',
    ciudad: 'Tunja, Duitama',
    fillKey: 'SECONDARY_FARM',
  },
  QUINDÍO: {
    name: 'Quindío',
    fincas: 1,
    tipo: 'Distribución',
    ciudad: 'Armenia',
    fillKey: 'DISTRIBUTION',
  },
  CALDAS: {
    name: 'Caldas',
    fincas: 1,
    tipo: 'Distribución',
    ciudad: 'Manizales',
    fillKey: 'DISTRIBUTION',
  },
}

// Datos específicos para Ecuador
const ecuadorDataSet = {
  PICHINCHA: {
    name: 'Pichincha',
    fincas: 1,
    tipo: 'Principal',
    ciudad: 'Quito',
    fillKey: 'PRIMARY_FARM',
  },
  COTOPAXI: {
    name: 'Cotopaxi',
    fincas: 1,
    tipo: 'Secundaria',
    ciudad: 'Latacunga',
    fillKey: 'SECONDARY_FARM',
  },
  IMBABURA: {
    name: 'Imbabura',
    fincas: 4,
    tipo: 'Distribución',
    ciudad: 'Ibarra',
    fillKey: 'DISTRIBUTION',
  },
}

// Datos específicos para Kenya
const kenyaDataSet = {
  NAIROBI: {
    name: 'Nairobi',
    fincas: 1,
    tipo: 'Principal',
    ciudad: 'Nairobi',
    fillKey: 'PRIMARY_FARM',
  },
  BARINGO: {
    name: 'Baringo',
    fincas: 2,
    tipo: 'Distribución',
    ciudad: 'Baringo',
    fillKey: 'DISTRIBUTION',
  },
  MARSABIT: {
    name: 'Marsabit',
    fincas: 3,
    tipo: 'Distribución',
    ciudad: 'Marsabit',
    fillKey: 'DISTRIBUTION',
  },
}

//datos de fincas por región
const fincasData = {
  colombia: {
    CUNDINAMARCA: [
      { id: 'CUN001', nombre: 'Finca La Esperanza', ciudad: 'Facatativá', hectareas: 15, estado: 'Activa' },
      { id: 'CUN002', nombre: 'Finca San Rafael', ciudad: 'Facatativá', hectareas: 12, estado: 'Activa' },
      { id: 'CUN003', nombre: 'Finca El Rosal', ciudad: 'Bogotá', hectareas: 8, estado: 'Activa' },
      { id: 'CUN004', nombre: 'Finca Santa María', ciudad: 'Bogotá', hectareas: 10, estado: 'Mantenimiento' },
      { id: 'CUN005', nombre: 'Finca Los Claveles', ciudad: 'Facatativá', hectareas: 18, estado: 'Activa' },
      { id: 'CUN006', nombre: 'Finca Villa Flora', ciudad: 'Bogotá', hectareas: 14, estado: 'Activa' },
      { id: 'CUN007', nombre: 'Finca El Jardín', ciudad: 'Facatativá', hectareas: 20, estado: 'Activa' },
      { id: 'CUN008', nombre: 'Finca Primavera', ciudad: 'Bogotá', hectareas: 16, estado: 'Activa' }
    ],
    ANTIOQUIA: [
      { id: 'ANT001', nombre: 'Finca Medellín Flores', ciudad: 'Medellín', hectareas: 22, estado: 'Activa' },
      { id: 'ANT002', nombre: 'Finca Rionegro Verde', ciudad: 'Rionegro', hectareas: 25, estado: 'Activa' },
      { id: 'ANT003', nombre: 'Finca El Valle', ciudad: 'Medellín', hectareas: 18, estado: 'Activa' },
      { id: 'ANT004', nombre: 'Finca Las Orquídeas', ciudad: 'Rionegro', hectareas: 30, estado: 'Activa' },
      { id: 'ANT005', nombre: 'Finca Antioquia Bella', ciudad: 'Medellín', hectareas: 28, estado: 'Mantenimiento' }
    ],
    'VALLE DEL CAUCA': [
      { id: 'VAL001', nombre: 'Finca Cali Flores', ciudad: 'Cali', hectareas: 20, estado: 'Activa' },
      { id: 'VAL002', nombre: 'Finca Palmira Rosa', ciudad: 'Palmira', hectareas: 15, estado: 'Activa' },
      { id: 'VAL003', nombre: 'Finca Valle Hermoso', ciudad: 'Cali', hectareas: 12, estado: 'Activa' }
    ],
    BOYACÁ: [
      { id: 'BOY001', nombre: 'Finca Tunja Central', ciudad: 'Tunja', hectareas: 10, estado: 'Activa' },
      { id: 'BOY002', nombre: 'Finca Duitama Norte', ciudad: 'Duitama', hectareas: 8, estado: 'Activa' }
    ],
    QUINDÍO: [
      { id: 'QUI001', nombre: 'Centro Distribución Armenia', ciudad: 'Armenia', hectareas: 5, estado: 'Activa' }
    ],
    CALDAS: [
      { id: 'CAL001', nombre: 'Centro Distribución Manizales', ciudad: 'Manizales', hectareas: 4, estado: 'Activa' }
    ]
  },
  ecuador: {
    PICHINCHA: [
      { id: 'PIC001', nombre: 'Finca Quito Flores', ciudad: 'Quito', hectareas: 25, estado: 'Activa' }
    ],
    COTOPAXI: [
      { id: 'COT001', nombre: 'Finca Latacunga Verde', ciudad: 'Latacunga', hectareas: 18, estado: 'Activa' }
    ],
    IMBABURA: [
      { id: 'IMB001', nombre: 'Centro Distribución Ibarra Norte', ciudad: 'Ibarra', hectareas: 6, estado: 'Activa' },
      { id: 'IMB002', nombre: 'Centro Distribución Ibarra Sur', ciudad: 'Ibarra', hectareas: 4, estado: 'Activa' },
      { id: 'IMB003', nombre: 'Centro Distribución Ibarra Este', ciudad: 'Ibarra', hectareas: 5, estado: 'Activa' },
      { id: 'IMB004', nombre: 'Centro Distribución Ibarra Oeste', ciudad: 'Ibarra', hectareas: 3, estado: 'Activa' }
    ]
  },
  kenya: {
    NAIROBI: [
      { id: 'NAI001', nombre: 'Nairobi Flower Farm', ciudad: 'Nairobi', hectareas: 35, estado: 'Activa' }
    ],
    BARINGO: [
      { id: 'BAR001', nombre: 'Baringo Distribution Center A', ciudad: 'Baringo', hectareas: 8, estado: 'Activa' },
      { id: 'BAR002', nombre: 'Baringo Distribution Center B', ciudad: 'Baringo', hectareas: 6, estado: 'Activa' }
    ],
    MARSABIT: [
      { id: 'MAR001', nombre: 'Marsabit Distribution Hub 1', ciudad: 'Marsabit', hectareas: 7, estado: 'Activa' },
      { id: 'MAR002', nombre: 'Marsabit Distribution Hub 2', ciudad: 'Marsabit', hectareas: 5, estado: 'Activa' },
      { id: 'MAR003', nombre: 'Marsabit Distribution Hub 3', ciudad: 'Marsabit', hectareas: 4, estado: 'Mantenimiento' }
    ]
  }
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

  container.innerHTML = ''
  container.className = 'world-map'

  if (container.offsetWidth === 0 || container.offsetHeight === 0) {
    container.style.width = '100%'
    container.style.height = '520px'
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
    done: function (datamap) {
      // Agregar eventos click para los 3 países
      datamap.svg.selectAll('.datamaps-subunit.COL').on('click', function () {
        zoomToCountry('colombia')
      })
      datamap.svg.selectAll('.datamaps-subunit.ECU').on('click', function () {
        zoomToCountry('ecuador')
      })
      datamap.svg.selectAll('.datamaps-subunit.KEN').on('click', function () {
        zoomToCountry('kenya')
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
            ${
              ['COL', 'ECU', 'KEN'].includes(geo.id)
                ? '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee; font-size: 11px; color: #007bff;">🖱️ Haz clic para ver detalle</div>'
                : ''
            }
          </div>`
      },
    },
  })
}

async function loadCountryTopojson(country) {
  try {
    const response = await fetch(`/lib/${country}.geojson`) // Ajusta la ruta según tu estructura

    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo TopoJSON de ${country}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error cargando geojson de ${country}:`, error)
    return null
  }
}

function getCountryDataSet(country) {
  switch (country) {
    case 'colombia':
      return colombiaDataSet
    case 'ecuador':
      return ecuadorDataSet
    case 'kenya':
      return kenyaDataSet
    default:
      return {}
  }
}

async function createCountryMap(country) {
  const container = document.querySelector('#countries-datamap')
  if (!container) return

  container.innerHTML = ''
  container.className = `${country}-map`

  const topojsonData = await loadCountryTopojson(country)
  const countryDataSet = getCountryDataSet(country)

  if (topojsonData) {
    createCustomCountryMap(container, topojsonData, countryDataSet)
  } else {
    createDefaultCountryMap(container, country, countryDataSet)
  }
}

function createCustomCountryMap(container, topojsonData, countryDataSet) {
  const width = container.offsetWidth || 800
  const height = 500

  const svg = window.d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .classed('datamap', true)

  // Ajustar la proyección según el país
  let projection
  switch (currentView.value) {
    case 'colombia':
      projection = window.d3.geo
        .mercator()
        .scale(1700)
        .center([-74, 4.5])
        .translate([width / 2, height / 2])
      break
    case 'ecuador':
      projection = window.d3.geo
        .mercator()
        .scale(4200)
        .center([-78.5, -1.7])
        .translate([width / 2, height / 2])
      break
    case 'kenya':
      projection = window.d3.geo
        .mercator()
        .scale(2800)
        .center([37.7, 0.5])
        .translate([width / 2, height / 2])
      break
    default:
      projection = window.d3.geo
        .mercator()
        .scale(1700)
        .translate([width / 2, height / 2])
  }

  const path = window.d3.geo.path().projection(projection)

  svg
    .selectAll('path')
    .data(topojsonData.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('class', 'region')
    .style('fill', function (d) {
      const regionData =
        countryDataSet[d.properties.DPTO_CNMBR] ||
        countryDataSet[d.properties.COUNTY_NAM] ||
        countryDataSet[d.properties.dpa_despro]
      if (regionData) {
        switch (regionData.fillKey) {
          case 'PRIMARY_FARM':
            return '#545386'
          case 'SECONDARY_FARM':
            return '#F4C7CE'
          case 'DISTRIBUTION':
            return '#66BB6A'
          default:
            return '#d3d3d3'
        }
      }
      return '#d3d3d3'
    })
    .style('stroke', '#000')
    .style('stroke-width', 1)
    .style('cursor', 'pointer')
    .on('mouseover', function (d) {
      window.d3.select(this).style('fill', '#c2dfea')
      showTooltip(d, window.d3.event, countryDataSet)
    })
    .on('mouseout', function (d) {
      window.d3.select(this).style('fill', function () {
        const regionData =
          countryDataSet[d.properties.DPTO_CNMBR] ||
          countryDataSet[d.properties.COUNTY_NAM] ||
          countryDataSet[d.properties.dpa_despro]
        if (regionData) {
          switch (regionData.fillKey) {
            case 'PRIMARY_FARM':
              return '#545386'
            case 'SECONDARY_FARM':
              return '#F4C7CE'
            case 'DISTRIBUTION':
              return '#66BB6A'
            default:
              return '#d3d3d3'
          }
        }
        return '#d3d3d3'
      })
      hideTooltip()
    })

  function showTooltip(d, event, dataSet) {
    const regionData =
      dataSet[d.properties.DPTO_CNMBR] ||
      dataSet[d.properties.COUNTY_NAM] ||
      dataSet[d.properties.dpa_despro]
    const name =
      d.properties.DPTO_CNMBR || d.properties.COUNTY_NAM || d.properties.dpa_despro || 'Región'

    let content = `<div class="datamap-hoverover" style="background: white; border: 1px solid #ccc; border-radius: 8px; padding: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="font-weight: bold; color: #333;">${name}</div>`

    if (regionData) {
      const iconMap = {
        Principal: '🏭',
        Secundaria: '🏪',
        Distribución: '🚚',
      }

      content += `
        <div style="font-size: 12px; color: #666; margin-top: 8px;">
          <div style="margin-bottom: 4px;">
            <span>${iconMap[regionData.tipo] || '📍'} Tipo: <strong style="color: #007bff;">${regionData.tipo}</strong></span>
          </div>
          <div style="margin-bottom: 4px;">
            <span>Fincas: <strong>${regionData.fincas}</strong></span>
          </div>
          <div style="margin-bottom: 4px;">
            <span>Ciudades: <strong>${regionData.ciudad}</strong></span>
          </div>
        </div>`
    }

    content += '</div>'

    const tooltip = window.d3
      .select('body')
      .append('div')
      .attr('class', 'datamap-tooltip')
      .style('position', 'absolute')
      .style('z-index', '1000')
      .style('pointer-events', 'none')
      .html(content)
      .style('left', event.pageX + 10 + 'px')
      .style('top', event.pageY - 10 + 'px')
  }

  function hideTooltip() {
    window.d3.selectAll('.datamap-tooltip').remove()
  }

  currentDataMap = {
    resize: function () {
      const newWidth = container.offsetWidth || 800
      svg.attr('width', newWidth)
      projection.translate([newWidth / 2, height / 2])
      svg.selectAll('path').attr('d', path)
    },
  }
}

function createDefaultCountryMap(container, country, countryDataSet) {
  currentDataMap = new window.Datamap({
    element: container,
    scope: country,
    projection: 'mercator',
    responsive: true,
    fills: {
      defaultFill: '#d3d3d3',
      PRIMARY_FARM: '#545386',
      SECONDARY_FARM: '#F4C7CE',
      DISTRIBUTION: '#66BB6A',
    },
    data: countryDataSet,
    geographyConfig: {
      borderColor: '#000',
      borderWidth: 1,
      highlightFillColor: '#c2dfea',
      highlightBorderColor: '#000',
      highlightBorderWidth: 2,
      popupTemplate: function (geo, data) {
        if (!data)
          return `<div class="datamap-hoverover">${geo.properties.name || geo.properties.NAME_1}</div>`

        const iconMap = {
          Principal: '🏭',
          Secundaria: '🏪',
          Distribución: '🚚',
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

// 3. Computed para obtener regiones del país actual:
const currentCountryRegions = computed(() => {
  if (currentView.value === 'world') return []

  const countryDataSet = getCountryDataSet(currentView.value)
  return Object.entries(countryDataSet).map(([key, data]) => ({
    id: key,
    ...data
  }))
})

const hasFinca = computed(() => {
  return cart.finca && Object.keys(cart.finca).length > 0;
});

// 4. Computed para obtener fincas de la región seleccionada:
const currentRegionFarms = computed(() => {
  if (!selectedRegion.value || currentView.value === 'world') return []

  return fincasData[currentView.value]?.[selectedRegion.value.id] || []
})

// 5. Funciones para manejar selección:
function selectRegion(region) {
  selectedRegion.value = region
  selectedFarm.value = null
  showFarmsList.value = true
}

function selectFarm(farm) {
  selectedFarm.value = farm
  cart.finca = farm

  // Aquí puedes emitir un evento o actualizar un store global
  // emit('farm-selected', farm)
}

function backToRegions() {
  showFarmsList.value = false
  selectedRegion.value = null
  selectedFarm.value = null
}

// 6. Función para resetear selección cuando cambias de vista:
function resetToWorld() {
  currentView.value = 'world'
  selectedRegion.value = null
  selectedFarm.value = null
  showFarmsList.value = false
  nextTick(() => {
    createWorldMap()
  })
}

function zoomToCountry(country) {
  currentView.value = country
  nextTick(() => {
    createCountryMap(country)
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

    createWorldMap()

    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (currentDataMap && currentDataMap.resize) {
          currentDataMap.resize()
        }
      }, 250)
    })

  } catch (error) {
    console.error('Error al inicializar el mapa:', error)
  }
})
</script>

<style scoped>
#countries-datamap.world-map {
  height: 550px !important;
}

#countries-datamap.colombia-map,
#countries-datamap.ecuador-map,
#countries-datamap.kenya-map {
  display: block !important;
  grid-template-columns: none !important;
}

#countries-datamap {
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
  margin-bottom: 30px;
}

:deep(.datamap) {
  width: 100% !important;
  height: 520px !important;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
}

:global(.datamaps-subunit) {
  cursor: pointer;
  transition: fill 0.3s ease;
  fill: #d3d3d3 !important;
  stroke: black !important;
  stroke-width: 1px !important;
}

:global(.datamaps-subunit.COL),
:global(.datamaps-subunit.ECU),
:global(.datamaps-subunit.KEN) {
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

:global(
  .datamaps-subunit[data-id*='CO-'],
  .datamaps-subunit[data-id*='EC-'],
  .datamaps-subunit[data-id*='KE-']
) {
  stroke: #000 !important;
  stroke-width: 1px !important;
}

:global(
  .datamaps-subunit[data-id*='CO-']:hover,
  .datamaps-subunit[data-id*='EC-']:hover,
  .datamaps-subunit[data-id*='KE-']:hover
) {
  stroke: #007bff !important;
  stroke-width: 2px !important;
}
</style>

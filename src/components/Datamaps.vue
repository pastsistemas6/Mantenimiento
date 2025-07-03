<template>
  <h2 class="text-3xl font-bold text-[#383A35] mb-3">Bienvenido al sistema de mantenimiento</h2>
  <p class="mb-5">
    Elite Flower es una empresa líder en la industria de las flores, dedicada a producir flores de
    alta calidad para exportación. Este sistema de mantenimiento ayuda a gestionar recursos y
    realizar seguimiento a las actividades de mantenimiento en todas las fincas.
  </p>
  <div id="countries-datamap" style="width: 100%"></div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'

const dataSet = {
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

function loadScripts(sources) {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise((resolve, reject) => {
          // Verificar si el script ya está cargado
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

onMounted(async () => {
  try {
    // Cargar los scripts necesarios
    await loadScripts([
      'https://d3js.org/d3.v3.min.js',
      'https://unpkg.com/topojson@1.6.9/topojson.min.js',
      'https://unpkg.com/datamaps@0.5.9/dist/datamaps.world.min.js',
    ])

    // Esperar a que las librerías estén disponibles
    await waitForLibraries()

    // Esperar al siguiente tick para asegurar que el DOM esté renderizado
    await nextTick()

    // Verificar que el contenedor existe
    const container = document.querySelector('#countries-datamap')
    if (!container) {
      console.error('El contenedor del mapa no se encontró.')
      return
    }

    // Asegurar que el contenedor tenga dimensiones
    if (container.offsetWidth === 0 || container.offsetHeight === 0) {
      console.warn('El contenedor no tiene dimensiones visibles')
      // Aplicar dimensiones por defecto
      container.style.width = '100%'
      container.style.height = '500px'
    }

    // Inicializar Datamap una sola vez
    const dataMap = new window.Datamap({
      element: container,
      projection: 'mercator',
      responsive: true,
      fills: {
        defaultFill: '#d3d3d3',
        MAJOR: '#545386',
      },
      data: dataSet,
      geographyConfig: {
        borderColor: '#000',
        highlightFillColor: '#f00',
        highlightBorderColor: '#f00',
        popupTemplate: function (geo, data) {
          if (!data) return `<div class="datamap-hoverover">${geo.properties.name}</div>`

          const growUp = `↗️`
          const growDown = `↘️`

          return `
            <div class="datamap-hoverover" style="background: white; border: 1px solid #ccc; border-radius: 8px; padding: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 200px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
                <span style="font-size: 16px;">🏳️</span>
                <span style="font-weight: bold; color: #333;">${data.customName || geo.properties.name}</span>
              </div>
              <div style="font-size: 12px; color: #666;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>Fincas: <strong>${data.fincas.value}</strong></span>
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
            </div>`
        },
      },
    })

    // Configurar responsividad
    let resizeTimeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (dataMap && dataMap.resize) {
          dataMap.resize()
        }
      }, 250)
    })

    console.log('Datamap inicializado correctamente')
  } catch (error) {
    console.error('Error al inicializar el mapa:', error)
  }
})
</script>

<style scoped>
#countries-datamap {
  height: 450px !important;
  border: 1px solid #ddd;
  padding-bottom: 0 !important;
  border-radius: 8px;
}

:global(.datamap) {
  height: 450px !important;
}

:global(.datamaps-subunit) {
  fill: #d3d3d3 !important;
  stroke: black !important;
}

:global(.datamaps-subunit[class*='COL']) {
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
}
</style>

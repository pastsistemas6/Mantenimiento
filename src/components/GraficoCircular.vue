<template>
  <!-- Componente GraficoCircular.vue -->
  <div class="shadow rounded-md w-full flex flex-col items-center justify-center">
    <h2 class="text-[#545386] text-2xl font-bold p-4 w-full mb-auto">Mantenimientos por Tipo</h2>
    <!-- Gráfico circular de ApexCharts -->
    <div id="apex-doughnut-chart" class="mb-auto"></div>
  </div>
</template>

<script setup>
/* Componente para mostrar un gráfico circular de mantenimientos por tipo
 Este componente utiliza ApexCharts para renderizar un gráfico de dona.
 */
// Importar la función buildChart desde helpers/apexcharts
import { onMounted } from 'vue'
import { buildChart } from '@/assets/js/helpers/apexcharts'

// Importar estilos de ApexCharts
onMounted(async () => {
  ;(function () {
    buildChart('#apex-doughnut-chart', (mode) => ({
      chart: {
        height: 300,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                fontSize: '2rem',
              },
              value: {
                fontSize: '1.5rem',
                color: 'var(--color-base-content)',
                formatter: function (val) {
                  return parseInt(val, 10) + '%'
                },
              },
              total: {
                show: true,
                fontSize: '1rem',
                label: 'Operational',
                color: 'var(--color-primary)',
                formatter: function (w) {
                  return '42%'
                },
              },
            },
          },
        },
      },
      // Data del gráfico
      series: [42, 7, 25, 25],
      labels: ['Operational', 'Networking', 'Hiring', 'R&D'],
      legend: {
        show: true,
        position: 'bottom',
        markers: { offsetX: -3 },
        labels: {
          useSeriesColors: true,
        },
      },
      // Configuración de tooltip
      dataLabels: {
        enabled: false,
      },
      // Configuración de colores y estilos
      stroke: {
        show: false,
        curve: 'straight',
      },
      // Configuración de colores
      colors: [
        'var(--color-primary)',
        'var(--color-success)',
        'var(--color-error)',
        'var(--color-warning)',
      ],
      // Configuración de hover
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      // Configuración de animación
      tooltip: {
        enabled: true,
      },
    }))
  })()
})
</script>

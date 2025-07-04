<template>
  <div class="shadow rounded-md w-full flex flex-col items-center justify-center">
    <h2 class="text-black text-xl font-semibold p-4 w-full mb-auto">Mantenimientos por Tipo</h2>
    <div id="apex-doughnut-chart" class="mb-auto"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { buildChart } from '@/assets/js/helpers/apexcharts'

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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        curve: 'straight',
      },
      colors: [
        'var(--color-primary)',
        'var(--color-success)',
        'var(--color-error)',
        'var(--color-warning)',
      ],
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    }))
  })()
})
</script>

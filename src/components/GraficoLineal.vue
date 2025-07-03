<template>
  <div class="shadow rounded-md w-full">
    <h2 class="text-black text-xl font-semibold p-4">Costos por Mes (Últimos 6 meses)</h2>
    <div id="apex-multiple-area-charts-compare-alt" class="w-full"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  ;(function () {
    buildChart('#apex-multiple-area-charts-compare-alt', (mode) => ({
      chart: {
        height: 400,
        type: 'area',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      series: [
        {
          name: '2024',
          data: [
            5000, 15000, 8000, 60000, 75000, 85000, 93000, 102000, 87000, 95000, 120000, 130000,
          ],
        },
        {
          name: '2023',
          data: [
            20000, 45000, 70000, 30000, 90000, 40000, 95000, 75000, 105000, 50000, 35000, 65000,
          ],
        },
      ],
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          useSeriesColors: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      grid: {
        strokeDashArray: 2,
        borderColor: 'color-mix(in oklab, var(--color-base-content) 40%, transparent)',
      },
      colors: ['var(--color-info)', 'var(--color-accent)'],
      fill: {
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          gradientToColors: ['var(--color-base-100)'],
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        type: 'category',
        tickPlacement: 'on',
        categories: [
          '1 January',
          '1 February',
          '1 March',
          '1 April',
          '1 May',
          '1 June',
          '1 July',
          '1 August',
          '1 September',
          '1 October',
          '1 November',
          '1 December',
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          stroke: {
            dashArray: 0,
          },
          dropShadow: {
            show: false,
          },
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px',
            fontWeight: 400,
          },
          formatter: (title) => {
            let t = title

            if (t) {
              const newT = t.split(' ')
              t = `${newT[1].slice(0, 3)}`
            }

            return t
          },
        },
      },
      yaxis: {
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: 'var(--color-base-content)',
            fontSize: '12px',
            fontWeight: 400,
          },
          formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        },
      },
      tooltip: {
        x: {
          format: 'MMMM yyyy',
        },
        y: {
          formatter: (value) => `$${value >= 1000 ? `${value / 1000}k` : value}`,
        },
        custom: function (props) {
          return buildTooltipCompareTwoAlt(props, {
            title: 'Revenue',
            mode,
            valuePrefix: '$',
            hasTextLabel: true,
            wrapperExtClasses: '',
            markerExtClasses: '',
          })
        },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: {
              height: 300,
            },
            labels: {
              style: {
                fontSize: '10px',
                colors: 'var(--color-base-content)',
              },
              offsetX: -2,
              formatter: (title) => title.slice(0, 3),
            },
            yaxis: {
              labels: {
                align: 'left',
                minWidth: 0,
                maxWidth: 140,
                style: {
                  fontSize: '10px',
                  colors: 'var(--color-base-content)',
                },
                formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
              },
            },
          },
        },
      ],
    }))
  })()
})
</script>

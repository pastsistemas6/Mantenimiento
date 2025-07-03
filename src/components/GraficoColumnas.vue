<template>
  <div class="shadow rounded-md w-full flex flex-col items-center justify-center">
    <h2 class="text-black text-xl font-semibold p-4 w-full mb-auto">
      Nivel de Agua por Reservorio
    </h2>
    <div id="apex-column-bar-chart" class="w-full"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  buildChart('#apex-column-bar-chart', (mode) => ({
    chart: {
      type: 'bar',
      height: 400,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'Investment',
        data: [25000, 39000, 65000, 45000, 79000, 80000, 69000, 63000, 60000, 66000, 90000, 78000],
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30px',
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['var(--color-primary)', 'var(--color-base-100)'],
    xaxis: {
      categories: [
        'Cook',
        'Erin',
        'Jack',
        'Will',
        'Gayle',
        'Megan',
        'John',
        'Luke',
        'Ellis',
        'Mason',
        'Elvis',
        'Liam',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: 'var(--color-base-content)',
          fontSize: '12px',
          fontWeight: 400,
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
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.9,
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value >= 1000 ? `${value / 1000}k` : value}`,
      },
      custom: function (props) {
        const { categories } = props.ctx.opts.xaxis
        const { dataPointIndex } = props
        const title = categories[dataPointIndex]
        const newTitle = `${title}`

        return buildTooltip(props, {
          title: newTitle,
          mode,
          hasTextLabel: true,
          wrapperExtClasses: 'min-w-28',
          labelDivider: ':',
          labelExtClasses: 'ms-2',
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
          plotOptions: {
            bar: {
              columnWidth: '10px',
            },
          },
          stroke: {
            width: 8,
          },
          labels: {
            style: {
              fontSize: '10px',
              colors: 'var(--color-base-content)',
            },
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
})
</script>

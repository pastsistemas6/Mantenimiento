<template>
  <!-- Layout dashboard -->
  <div class="min-h-full">
    <div class="py-4 pb-6 pr-5 flex flex-col gap-4">
      <!-- Componente CardDashboard para mostrar tarjetas de información -->
      <CardDashboard></CardDashboard>
      <div class="flex flex-nowrap justify-evenly gap-4">
        <!-- Gráficos circulares y lineales -->
        <GraficoCircular></GraficoCircular>
        <GraficoLineal></GraficoLineal>
      </div>
      <!-- Tabla de datos y gráfico circular con barras -->
      <Datatable2></Datatable2>
      <GraficoCircular2></GraficoCircular2>
    </div>
  </div>
</template>

<script setup>
// Importación de componentes necesarios
import CardDashboard from '@/components/CardDashboard.vue'
import GraficoCircular from '@/components/GraficoCircular.vue'
import GraficoLineal from '@/components/GraficoLineal.vue'
import Datatable2 from '@/components/Datatable2.vue'
import GraficoCircular2 from '@/components/GraficoCircular2.vue'
</script>

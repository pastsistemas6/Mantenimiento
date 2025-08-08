<template>
  <!-- Layout para la página de Invernaderos -->
  <div class="py-2 pb-6 pr-5 flex flex-col gap-4">
    <!-- Componente Datatable para mostrar datos de invernaderos -->
    <Datatable></Datatable>
    <!-- Componente MapsFinca para mostrar mapas de invernaderos -->
    <MapsFinca></MapsFinca>
  </div>
  <!-- Espacio para el router-view, donde se cargarán las vistas hijas -->
  <router-view></router-view>
</template>

<script setup>
// Importación de componentes necesarios
import Datatable from '@/components/Datatable.vue'
import MapsFinca from '@/components/MapsFinca2.vue'
</script>

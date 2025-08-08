<template>
  <!-- Layout principal del cuerpo de la aplicación -->
  <div class="min-h-full">
    <div class="py-2 pr-5 pb-6">
      <!-- Componente Datamaps para mostrar mapas interactivos -->
      <Datamaps />
      <!-- Componente CardBody para mostrar contenido adicional -->
      <CardBody />
    </div>
  </div>
</template>

<script setup>
// Importación de componentes necesarios
import Datamaps from '@/components/Datamaps.vue'
import CardBody from '@/components/CardBody.vue'
</script>

<template>
  <!-- Layout para la página de Lecturas de energia -->
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div class="flex flex-col place-content-center shadow px-4 pb-4 rounded-lg">
        <div class="flex justify-start">
          <!-- Botones de navegación para cambiar entre vistas -->
          <!-- Botón para acceder a la tabla de datos -->
          <button
            @click="enviar('Data-tabla')"
            class="btn bg-white hover:bg-base-content/10 border-0 shadow-none text-[#545386] font-bold text-md"
          >
            Gestión de lecturas
          </button>
          <div class="divider before:w-1 after:w-1 divider-horizontal"></div>
          <!-- Botón para acceder al historial de calendario -->
          <button
            @click="enviar('Calendario')"
            class="btn bg-white hover:bg-base-content/10 border-0 shadow-none text-[#545386] font-bold text-md"
          >
            Historial caledario
          </button>
        </div>
        <div class="divider text-base-content/50 pb-4 col-span-full"></div>
        <!-- Espacio para el router-view, donde se cargarán las vistas hijas -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importación de la función useRouter para la navegación
import { useRouter } from 'vue-router'

// Función para navegar a una vista específica
const router = useRouter()

// Función para enviar al usuario a la vista deseada
function enviar(name) {
  router.push({ name: name })
}
</script>

<style scoped>
/* Estilos para el botón de navegación */
.divider::before,
::after {
  border-top-width: 2px !important;
  border-inline-end-width: 2px !important;
}
</style>

<script setup lang="ts">
// Importación de componentes necesarios
import { RouterLink } from 'vue-router'
import { useCart } from '@/stores/cart'

// Variables de estado
const cart = useCart()
</script>

<template>
  <!-- Vista de error 404 personalizada -->
  <div class="frem">
    <p>ACCESO DENEGADO</p>
    <h2>Parece que estás perdido</h2>
    <h5>la página que buscas no esta disponible</h5>
    <!-- Enlace para volver a la página principal o al layout del cuerpo -->
    <RouterLink
      v-if="cart.token"
      to="bodylayout"
      class="absolute bottom-4 bg-[#545386] p-3 px-4 text-md rounded-xl text-white"
      >Volver</RouterLink
    >
    <!-- Enlace para volver a la página de inicio si no hay token -->
    <RouterLink
      v-if="!cart.token"
      to="/"
      class="absolute bottom-4 bg-[#545386] p-3 px-4 text-md rounded-xl text-white"
      >Volver</RouterLink
    >
  </div>
</template>

<style scoped>
/* Estilos para la vista de error 404 personalizada y el gif de fondo */
.frem {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(../components/Imgs/gif.gif);
  background-position: center;
  background-repeat: no-repeat;
}
/* Estilos para el texto y los enlaces */
.frem p {
  position: absolute;
  top: 1rem;
  font-size: 7rem;
  color: #00000063;
}
.frem h2 {
  position: absolute;
  bottom: 8rem;
  font-size: 34px;
}
.frem h5 {
  position: absolute;
  bottom: 6rem;
  color: #9c9c9c;
}
</style>

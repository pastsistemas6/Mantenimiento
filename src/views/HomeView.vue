<script setup>
// Importación de componentes necesarios
import AnimationFlower from '@/components/AnimationFlower.vue'
import Login from '@/components/Login.vue'
</script>

<template>
  <!-- Vista principal que incluye una animación y un formulario de inicio de sesión -->
  <main>
    <!-- Componente de animación de flores -->
    <AnimationFlower />
    <!-- Componente de inicio de sesión -->
    <Login />
  </main>
</template>

<style scoped>
/* Estilos para el contenedor principal */
main {
  width: 95%;
  height: 100dvh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: auto;
}
</style>

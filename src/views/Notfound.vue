<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useCart } from '@/stores/cart';

const cart = useCart()
</script>

<template>
  <div class="frem">
    <p>ACCESO DENEGADO</p>
    <h2>Parece que estás perdido</h2>
    <h5>la página que buscas no esta disponible</h5>
    <RouterLink v-if="cart.token" to="bodylayout" class="absolute bottom-4 bg-[#545386] p-3 px-4 text-md rounded-xl text-white">Volver</RouterLink>
    <RouterLink v-if="!cart.token" to="/" class="absolute bottom-4 bg-[#545386] p-3 px-4 text-md rounded-xl text-white">Volver</RouterLink>
  </div>
</template>

<style scoped>
.frem{
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

.frem p{
    position: absolute;
    top: 1rem;
    font-size: 7rem;
    color: #00000063;
}
.frem h2{
    position: absolute;
    bottom: 8rem;
    font-size: 34px;
}
.frem h5{
    position: absolute;
    bottom: 6rem;
    color: #9c9c9c;
}

</style>

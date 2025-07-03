<script setup>
import AnimationFlower from '@/components/AnimationFlower.vue'
import Login from '@/components/Login.vue'
</script>

<template>
  <main>
    <AnimationFlower />
    <Login />
  </main>
</template>

<style scoped>
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

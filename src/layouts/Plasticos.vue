<template>
  <div class="py-2 pb-6 pr-5 flex flex-col gap-4">
    <Datatable></Datatable>
    <MapsFinca></MapsFinca>
  </div>
  <router-view></router-view>
</template>

<script setup>
import Datatable from '@/components/Datatable.vue'
import MapsFinca from '@/components/MapsFinca.vue'
</script>

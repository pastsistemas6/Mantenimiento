<template>
  <div class="min-h-full">
    <div class="py-4 pb-6 pr-5 flex flex-col gap-4">
      <CardDashboard></CardDashboard>
      <div class="flex flex-nowrap justify-evenly gap-4">
        <GraficoColumnas></GraficoColumnas>
        <GraficoLineal></GraficoLineal>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardDashboard from '@/components/CardDashboard.vue'
import GraficoColumnas from '@/components/GraficoColumnas.vue'
import GraficoLineal from '@/components/GraficoLineal.vue'
</script>

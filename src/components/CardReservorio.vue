<template>
  <div class="bg-gray-100 shadow rounded-lg w-full flex flex-wrap items-center justify-between">
    <h2 class="text-xl text-[#545386] font-semibold m-3 ml-5">Reservorio #1</h2>
    <span class="bg-green-300 rounded-md m-3 mr-5 px-3 py-1">Operativo</span>
    <ul class="*:py-3 px-6 bg-white grid grid-cols-2 w-full border-t-1 border-t-base-content/25">
      <li class="text-black text-sm">Capacidad:</li>
      <li class="text-[#545386] text-right font-bold text-2xl">5000L</li>
      <li class="text-black text-sm">Nivel actual:</li>
      <li class="text-[#545386] text-right font-bold text-2xl">78%</li>
      <li class="text-black text-sm">Temperatura:</li>
      <li class="text-[#545386] text-right font-bold text-2xl">22°C</li>
    </ul>
    <div class="w-full flex justify-end gap-2 px-6 py-4 bg-white rounded-b-lg">
      <button
        type="button"
        @click="enviar()"
        class="bg-[#C2DFEA] px-3 py-1.5 rounded-md text-black"
      >
        Detalles
      </button>
      <button type="button" class="bg-[#545386] px-3 py-1.5 rounded-md text-white">
        Monitorear
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function enviar() {
  router.push({ name: 'DashboardReservorios' })
}
</script>

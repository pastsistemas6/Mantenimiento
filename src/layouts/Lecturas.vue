<template>
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div class="flex flex-col place-content-center shadow px-4 pb-4 rounded-lg">
        <div class="flex justify-start">
          <button
            @click="enviar('TablaLecturas')"
            class="btn bg-white hover:bg-base-content/10 border-0 shadow-none text-[#545386] font-bold text-md"
          >
            Gestión de lecturas
          </button>
          <div class="divider before:w-1 after:w-1 divider-horizontal"></div>
          <button
            @click="enviar('Calendario')"
            class="btn bg-white hover:bg-base-content/10 border-0 shadow-none text-[#545386] font-bold text-md"
          >
            Historial caledario
          </button>
        </div>
        <div class="divider text-base-content/50 pb-4 col-span-full"></div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function enviar(name) {
  router.push({ name: name })
}
</script>

<style scoped>
.divider::before,
::after {
  border-top-width: 2px !important;
  border-inline-end-width: 2px !important;
}
</style>

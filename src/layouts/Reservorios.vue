<template>
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div class="grid grid-cols-2 gap-4 place-content-center shadow p-4 rounded-lg">
        <h2 class="text-[#545386] font-bold text-2xl">Control de reservorios</h2>
        <button type="button" class="btn ml-auto bg-[rgb(84,83,134)] rounded-md text-white py-2 shadow-none">
          <span class="flex items-center gap-3">
            <span class="icon-[mingcute--add-line] size-4"></span>
            <span class="max-sm:hidden">Agregar reservorio</span>
          </span>
        </button>
        <div class="divider text-base-content/50 py-1 col-span-full"></div>
        <div class="flex flex-col gap-4">
          <CardReservorio></CardReservorio>
          <CardReservorio></CardReservorio>
        </div>
        <div class="flex flex-col pt-2">
          <h3 class="font-semibold text-xl">Ubicación de reservorios</h3>
          <div class="divider text-base-content/50 py-4"></div>
          <img src="#" alt="Mapa" class="w-full h-full bg-amber-50 shadow rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardReservorio from '@/components/CardReservorio.vue'
</script>

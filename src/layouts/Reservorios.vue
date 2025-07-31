<template>
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div class="grid grid-cols-2 gap-4 place-content-center shadow p-4 rounded-lg">
        <h2 class="text-[#545386] font-bold text-3xl">Control de reservorios</h2>
        <button
          v-if="disable[2][2]"
          type="button"
          class="btn ml-auto bg-[rgb(84,83,134)] rounded-md text-white py-2 shadow-none"
        >
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
          <h3 class="text-[#545386] font-semibold text-xl">Ubicación de reservorios</h3>
          <div class="divider text-base-content/50 py-4"></div>
          <div class="w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3789.476546483983!2d-74.32202323557733!3d4.7735715922560304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sco!4v1748486641808!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style="border: 0; border-radius: 8px"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@/stores/cart'
import CardReservorio from '@/components/CardReservorio.vue'
import { ref } from 'vue'

const cart = useCart()
const disable = ref(cart.disable)
</script>

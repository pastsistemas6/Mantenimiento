<template>
  <div class="flex flex-row items-start gap-4">
    <div class="bg-[#545386] p-0 rounded-lg w-full">
      <h2 class="text-2xl text-white font-semibold m-3 ml-5">
        <!-- Título dinámico basado en la finca seleccionada -->
        {{
          cart.finca.nombre != undefined
            ? `Resumen de ${cart.finca.nombre}`
            : 'Resumen de Elite Flower'
        }}
      </h2>
      <div class="stats w-full">
        <!-- Estadísticas cuando NO hay finca seleccionada -->
        <template v-if="cart.finca.nombre == undefined">
          <div class="stat gap-4">
            <div class="stat-figure flex items-center text-[#545386] size-12">
              <span class="icon-[tabler--world] size-12"></span>
            </div>
            <div class="stat-title">Presencia global</div>
            <div class="stat-value">3 Países</div>
            <div class="stat-desc">Colombia, Ecuador y Kenia</div>
          </div>

          <div class="stat gap-4">
            <div class="stat-figure text-[#545386] flex items-center size-12">
              <span class="icon-[tabler--flower] size-12"></span>
            </div>
            <div class="stat-title">Producción anual</div>
            <div class="stat-value">12M</div>
            <div class="stat-desc">Tallos de flores premium</div>
          </div>

          <div class="stat gap-4">
            <div class="stat-figure text-[#545386] flex items-center size-12">
              <span class="icon-[tabler--building-factory] size-12"></span>
            </div>
            <div class="stat-title">Fincas activas</div>
            <div class="stat-value">28</div>
            <div class="stat-desc">En operación</div>
          </div>

          <div class="stat gap-4">
            <div class="stat-figure text-[#545386] flex items-center size-12">
              <span class="icon-[tabler--truck-delivery] size-12"></span>
            </div>
            <div class="stat-title">Exportaciones</div>
            <div class="stat-value">15</div>
            <div class="stat-desc">Países destino</div>
          </div>
        </template>

        <!-- Estadísticas cuando SÍ hay finca seleccionada -->
        <template v-else>
          <div class="stat gap-4">
            <div class="stat-figure text-[#545386] flex items-center size-10">
              <span class="icon-[tabler--map-pin] size-10"></span>
            </div>
            <div class="stat-title">Ubicación</div>
            <!-- Mostrar ciudad y región de la finca -->
            <div class="stat-value">{{ cart.finca.ciudad }}</div>
            <div class="stat-desc">{{ cart.finca.regionName }}</div>
          </div>

          <div class="stat gap-4">
            <div class="stat-figure text-[#545386] flex items-center size-10">
              <span class="icon-[tabler--ruler] size-10"></span>
            </div>
            <div class="stat-title">Área Total</div>
            <!-- Mostrar hectáreas cultivadas -->
            <div class="stat-value">{{ cart.finca.hectareas }} hectáreas</div>
            <div class="stat-desc">Superficie cultivada</div>
          </div>

          <div class="stat gap-4">
            <div class="stat-figure text-[#545386] flex items-center size-10">
              <span class="icon-[tabler--activity] size-10"></span>
            </div>
            <div class="stat-title">Estado</div>
            <!-- Mostrar estado de la finca con colores -->
            <!-- Verde si está activa, amarillo si no -->
            <div
              class="stat-value"
              :class="{
                'text-green-500!': cart.finca.estado === 'Activa',
                'text-yellow-500!': cart.finca.estado !== 'Activa',
              }"
            >
              {{ cart.finca.estado }}
            </div>
            <div class="stat-desc">Operaciones</div>
          </div>

          <div class="stat gap-4">
            <div class="stat-figure text-[#545386] flex items-center size-10">
              <span class="icon-[tabler--calendar] size-10"></span>
            </div>
            <div class="stat-title">Antigüedad</div>
            <div class="stat-value">5 años</div>
            <div class="stat-desc">En producción</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importar el store
import { useCart } from '@/stores/cart'

// Usar el store de cart
const cart = useCart()
</script>

<style scoped></style>

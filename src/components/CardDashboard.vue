<template>
  <!-- Componente CardDashboard.vue -->
  <div class="flex flex-col">
    <div class="w-full flex justify-between">
      <h2 class="text-3xl text-[#545386] font-bold mb-6">
        Dashboard de mantenimiento de plásticos
      </h2>
      <!-- Selector de período -->
      <select class="select w-2/12 appearance-none" aria-label="select">
        <option disabled selected>Últimos 30 días</option>
        <option>Últimos 7 días</option>
        <option>Últimos 30 días</option>
        <option>Últimos 3 meses</option>
        <option>Último año</option>
      </select>
    </div>

    <!-- Resumen de finca -->
    <div class="stats w-full">
      <!-- Título dinámico basado en la finca seleccionada -->
      <div class="stat place-items-center">
        <div class="stat-title">Total de mantenimientos</div>
        <div class="stat-value">128</div>
        <div class="stat-desc">+12% vs período anterior</div>
      </div>

      <!-- Mostrar finca seleccionada o mensaje por defecto -->
      <div class="stat place-items-center">
        <div class="stat-title">Costo total</div>
        <div class="stat-value">$12,450</div>
        <div class="stat-desc">-5% vs período anterior</div>
      </div>

      <!-- Estadísticas de mantenimiento -->
      <div class="stat place-items-center">
        <div class="stat-title">Promedio por mantenimiento</div>
        <div class="stat-value">$97.27</div>
        <div class="stat-desc">+3% vs período anterior</div>
      </div>

      <!-- Tiempo promedio de mantenimiento -->
      <div class="stat place-items-center">
        <div class="stat-title">Tiempo promedio</div>
        <div class="stat-value">2.5h</div>
        <div class="stat-desc">-15% vs período anterior</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-value {
  color: #545386;
  font-size: 44px;
  font-weight: 700;
}
</style>

<template>
  <div class="flex flex-col">
    <div class="w-full flex justify-between">
      <h2 class="text-3xl text-black font-semibold mb-6">
        Dashboard de Mantenimiento de Plásticos
      </h2>
      <select class="select w-2/12 appearance-none" aria-label="select">
        <option disabled selected>Últimos 30 días</option>
        <option>Últimos 7 días</option>
        <option>Últimos 30 días</option>
        <option>Últimos 3 meses</option>
        <option>Último año</option>
      </select>
    </div>

    <div class="stats w-full">
      <div class="stat place-items-center">
        <div class="stat-title">Total Sales</div>
        <div class="stat-value">$52K</div>
        <div class="stat-desc">From Jan 1st to Feb 1st</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Active Customers</div>
        <div class="stat-value">$8,350</div>
        <div class="stat-desc">↗︎ 150 (1.8%)</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">New Signups</div>
        <div class="stat-value">$2,400</div>
        <div class="stat-desc">↘︎ 180 (7%)</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Active Customers</div>
        <div class="stat-value">$8,350</div>
        <div class="stat-desc">↗︎ 150 (1.8%)</div>
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

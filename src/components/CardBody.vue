<template>
  <div class="flex flex-row items-start gap-4 mt-6">
    <div class="bg-[#545386] p-0 rounded-lg">
      <h2 class="text-2xl text-white font-semibold m-3 ml-5">Resumen de la compañia</h2>
      <div class="stats">
        <div class="stat gap-4">
          <div class="stat-figure text-base-content size-8">
            <span class="icon-[tabler--world] size-8"></span>
          </div>
          <div class="stat-title">Website Traffic</div>
          <div class="stat-value">32K</div>
          <div class="stat-desc">5% ↗︎ than last week</div>
        </div>

        <div class="stat gap-4">
          <div class="stat-figure text-base-content size-8">
            <span class="icon-[tabler--users-group] size-8"></span>
          </div>
          <div class="stat-title">New Signups</div>
          <div class="stat-value">1.2K</div>
          <div class="stat-desc">12% increase this month</div>
        </div>

        <div class="stat gap-4">
          <div class="stat-figure size-12">
            <div class="avatar">
              <div class="size-12 rounded-full">
                <img
                  src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png"
                  alt="User Avatar"
                />
              </div>
            </div>
          </div>
          <div class="stat-value text-success">95%</div>
          <div class="stat-title">Customer Retention</div>
          <div class="stat-desc">Steady over last quarter</div>
        </div>
      </div>
    </div>
    <div class="bg-[#545386] rounded-lg w-full">
      <h2 class="text-2xl text-white font-semibold m-3 ml-5">Estado del sistema</h2>
      <ul
        class="divide-base-content/25 divide-y *:py-4 px-6 bg-white shadow rounded-b-lg grid grid-cols-2 w-full"
      >
        <li class="font-semibold">Recent Posts</li>
        <li class="text-green-500 text-right font-semibold">Operativo</li>
        <li class="font-semibold">Upcoming Events</li>
        <li class="text-green-500 text-right font-semibold">Operativo</li>
        <li class="font-semibold">Notifications</li>
        <li class="text-green-500 text-right font-semibold">Operativo</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.stats {
  border-radius: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 0;
}
.stat {
  display: grid;
}
.stat-value {
  color: #545386;
}
</style>

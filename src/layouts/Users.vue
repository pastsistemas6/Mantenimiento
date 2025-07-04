<template>
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div class="flex flex-col gap-4 shadow p-4 rounded-lg">
        <div class="flex gap-2">
          <h2 class="text-[#545386] font-bold text-2xl">Administración de usuarios</h2>
          <button type="button" class="px-4 ml-auto bg-[rgb(84,83,134)] rounded-md text-white">
            Exportar
          </button>
          <button type="button" class="px-4 bg-[rgb(84,83,134)] rounded-md text-white">
            Importar
          </button>
          <button type="button" class="px-4 bg-[rgb(84,83,134)] rounded-md text-white">
            Nuevo usuario
          </button>
        </div>
        <div class="flex items-center justify-evenly gap-3">
          <div class="stat shadow rounded-md">
            <div class="stat-figure">
              <div class="avatar">
                <div class="size-12 rounded-full">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
            <div class="stat-title">Total page views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% ↗︎ than last month</div>
          </div>
          <div class="stat shadow rounded-md">
            <div class="stat-figure">
              <div class="avatar">
                <div class="size-12 rounded-full">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
            <div class="stat-title">Total page views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% ↗︎ than last month</div>
          </div>
          <div class="stat shadow rounded-md">
            <div class="stat-figure">
              <div class="avatar">
                <div class="size-12 rounded-full">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
            <div class="stat-title">Total page views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% ↗︎ than last month</div>
          </div>
          <div class="stat shadow rounded-md">
            <div class="stat-figure">
              <div class="avatar">
                <div class="size-12 rounded-full">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
            <div class="stat-title">Total page views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% ↗︎ than last month</div>
          </div>
        </div>
        <div>
          <Datatable2></Datatable2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Datatable2 from '@/components/Datatable2.vue';
</script>

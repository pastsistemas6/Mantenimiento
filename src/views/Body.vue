<template>
  <div class="w-full overflow-hidden">
    <header class="bg-white shadow-sm fixed w-full z-2">
      <div
        class="mx-auto max-w-full px-3 py-1.5 flex gap-5 items-center border-b-3 border-[#D8D2C4]"
      >
        <div class="flex justify-center items-center p-2">
          <button
            @click="toggleDrawer"
            class="btn shadow-none bg-white border-0 text-[#545386] hover:bg-gray-100"
          >
            <span
              :class="
                isExpanded
                  ? 'icon-[mingcute--menu-fill]'
                  : 'icon-[iconamoon--menu-burger-vertical-bold]'
              "
              class="size-7 text-[#545386]"
            ></span>
          </button>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-[#545386]">Mantenimiento</h1>
        <div class="dropdown relative inline-flex ml-auto">
          <button
            id="dropdown-header"
            type="button"
            class="dropdown-toggle btn bg-white text-[#545386] border-0 shadow-none hover:bg-gray-200 text-center"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            <span>
              <img
                src="../assets/by customer-morado-32px-03.svg"
                alt="Consumo"
                width="24"
                height="24"
              />
            </span>
            Usuario
            <span class="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
          </button>
          <ul
            class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60 shadow"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-header"
          >
            <li>
              <a class="dropdown-item hover:bg-white" title="Rol">
                <span>
                  <img
                    src="../components/icons/icons8-worker-96.png"
                    alt="Rol"
                    width="20"
                    height="20"
                  />
                </span>
                Pasante
              </a>
            </li>
            <li>
              <RouterLink class="dropdown-item" to="users">
                <span>
                  <img
                    src="../components/icons/icons8-admin-settings-male-100.png"
                    alt="Consumo"
                    width="24"
                    height="24"
                  />
                </span>
                Administrar usuarios
              </RouterLink>
            </li>
            <li class="dropdown-footer gap-2">
              <RouterLink to="/" class="btn btn-error btn-soft btn-block">Cerrar sesión</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div
      class="fixed h-full transition-all duration-300"
      :class="isExpanded ? 'w-2/12' : 'w-20'"
    >
      <Drawer></Drawer>
    </div>
    <div
      class="pt-20 transition-all duration-300"
      :class="isExpanded ? 'w-9/11 ml-auto' : 'w-11/12 ml-auto'"
    >
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref, provide } from 'vue'
import Drawer from '@/components/Drawer.vue'

// Estado del drawer
const isExpanded = ref(true)

// Función para alternar el drawer
const toggleDrawer = () => {
  isExpanded.value = !isExpanded.value
}

// Proveer el estado y la función al componente hijo
provide('drawerState', {
  isExpanded,
  toggleDrawer,
})
</script>

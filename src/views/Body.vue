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
            class="dropdown-toggle btn bg-white text-[#545386] border-0 shadow-none hover:bg-gray-200 flex items-center gap-2.5 text-center text-lg py-6 px-3"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
            @click.stop="showDropdown = !showDropdown"
          >
            <div class="size-10 text-sm flex-none rounded-full flex items-center justify-center text-white font-bold" :style="{ backgroundColor: `var(--color-${cart.rol.toLowerCase()})` }">
              {{ getInitials(cart.name) }}
            </div>
            {{ cart.name }}
            <span
              class="icon-[tabler--chevron-down] size-4"
              :class="{ 'rotate-180': showDropdown }"
            ></span>
          </button>
          <ul
            class="dropdown-menu absolute min-w-60 shadow bg-white z-50"
            :class="[
              showDropdown
                ? 'opacity-100 fixed top-16 left-auto right-3 bottom-auto m-0'
                : 'hidden',
            ]"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-header"
            data-placement="bottom-end"
          >
            <li>
              <a class="dropdown-item py-1.5 hover:bg-white" title="Rol">
                <span class="icon-[solar--user-id-linear] size-6 text-[#545386] mr-1"></span>
                {{ cart.rol }}
              </a>
            </li>
            <li
              v-if="disable[6]"
            >
              <RouterLink
                class="dropdown-item py-1.5"
                to="users"
                @click.stop="showDropdown = !showDropdown"
              >
                <span class="icon-[la--users-cog] size-6 text-[#545386] mr-1"></span>
                Administrar usuarios
              </RouterLink>
            </li>
            <li class="dropdown-footer gap-2">
              <a @click="cerrar" class="btn btn-error btn-soft btn-block">Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="fixed h-full transition-all duration-300" :class="isExpanded ? 'w-2/12' : 'w-20'">
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
import { ref, computed, provide, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/stores/cart'
import Drawer from '@/components/Drawer.vue'

// Estado del drawer
const cart = useCart()
const router = useRouter()
const disable = ref(cart.disable)
const isExpanded = ref(true)

// Función para alternar el drawer
const toggleDrawer = () => {
  isExpanded.value = !isExpanded.value
}

const getInitials = (name) => {
  return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
}

function cerrar() {
  cart.resetCart()
  router.push({ name: 'home' })
}
// Proveer el estado y la función al componente hijo
provide('drawerState', {
  isExpanded,
  toggleDrawer,
})

const showDropdown = ref(false)

// Cierra el dropdown al hacer clic fuera
const closeDropdown = (e) => {
  if (!e.target.closest('.dropdown')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>

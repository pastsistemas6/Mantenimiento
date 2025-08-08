<script setup lang="ts">
// Importar dependencias necesarias
import { RouterLink } from 'vue-router'
import { inject, ref, onMounted, computed } from 'vue'
import { useCart } from '@/stores/cart'

// Inyectar el estado del drawer desde el componente padre
const cart = useCart()
const disable = ref(cart.disable)
const drawerState = inject('drawerState', null)

// Si no hay provider, usar valores por defecto
const isExpanded = drawerState ? drawerState.isExpanded : ref(true)
const toggleDrawer = drawerState
  ? drawerState.toggleDrawer
  : () => {
      isExpanded.value = !isExpanded.value
    }

// Estado para manejar el tooltip activo
const activeTooltip = ref<null | { text: string; style: Record<string, string> }>(null)

// Función para manejar el evento de mouse enter y mostrar el tooltip
const handleMouseEnter = (e: MouseEvent, text: string) => {
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  activeTooltip.value = {
    text,
    style: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + 4}px`,
      transform: 'translateY(-50%)',
      position: 'fixed',
    },
  }
}

// Computed para verificar si hay una finca seleccionada
const hasFinca = computed(() => {
  return cart.finca && Object.keys(cart.finca).length > 0
})

// Función para manejar el mouse leave y ocultar el tooltip
const handleMouseLeave = () => {
  activeTooltip.value = null
}
</script>

<template>
  <!-- Botón para alternar el estado del drawer -->
  <button
    type="button"
    class="btn btn-text max-sm:btn-square sm:hidden"
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-controls="multilevel-with-separator"
    data-overlay="#multilevel-with-separator"
  >
    <span class="icon-[tabler--menu-2] size-5"></span>
  </button>

  <!-- Drawer principal -->
  <aside
    id="multilevel-with-separator"
    :class="[
      'overlay [--auto-close:sm] overlay-open:translate-x-0 drawer drawer-start hidden sm:absolute sm:z-0 sm:flex sm:translate-x-0 pt-20 border-r-3 border-[#D8D2C4] fixed bottom-0 transition-all duration-300',
      isExpanded ? 'max-w-54' : 'max-w-20 pt-22',
    ]"
    tabindex="-1"
  >
    <!-- Contenedor del tooltip -->
    <div class="drawer-body pt-4">
      <ul class="menu space-y-0.5 pb-6 p-0">
        <!-- Botón para alternar el estado del drawer -->
        <li
          class="relative hover:bg-white cursor-default!"
          @mouseenter="(e) => handleMouseEnter(e, 'Elite Flower')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Logo y nombre de la finca -->
          <RouterLink
            to="BodyLayout"
            :class="[
              'flex flex-col justify-center items-center gap-0 hover:bg-white cursor-default! list-none',
              !isExpanded && 'px-2',
            ]"
          >
            <img
              src="./icons/elite flower-morado-64px-05.svg"
              :class="isExpanded ? 'h-10 mb-3 cursor-default' : 'h-8 mb-1'"
            />
            <!-- Nombre de la finca -->
            <h3 v-if="isExpanded" class="font-semibold cursor-default">Elite Flower</h3>
            <p v-if="isExpanded" class="text-gray-500! text-xs cursor-default">Finca Productora</p>
          </RouterLink>

          <!-- Tooltip para el logo -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Elite Flower'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Solo mostrar si está expandido y hay una finca con nombre -->
        <div v-if="isExpanded && hasFinca" class="w-full divider text-base-content/50 py-1"></div>

        <li v-if="isExpanded && hasFinca" class="relative hover:bg-white cursor-default">
          <div
            class="flex flex-col justify-center items-center w-full px-2 cursor-default hover:bg-white"
          >
            <label class="label-text text-[#545386] font-medium p-0 cursor-default"
              >Finca seleccionada:</label
            >
            <p
              class="text-gray-700 text-sm cursor-default w-full text-center py-1 rounded-md bg-base-content/10"
            >
              {{ cart.finca.nombre }}
            </p>
          </div>
        </li>

        <!-- Divisor para separar la finca seleccionada -->
        <div v-if="isExpanded" class="w-full divider text-base-content/50 py-1"></div>

        <!-- Elementos del menú -->
        <!-- Cada elemento del menú tiene un tooltip que se muestra al pasar el mouse -->
        <!-- Home -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Home')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace al bodylayout -->
          <RouterLink
            to="BodyLayout"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img
                src="../components/icons/dashboard-morado-32px-03.svg"
                alt="Dashboard"
                width="24"
                height="24"
              />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Home</span>
          </RouterLink>

          <!-- Tooltip para el enlace Home -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Home'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Fincas -->
        <li
          v-if="disable[1] && hasFinca"
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Invernaderos')"
          @mouseleave="handleMouseLeave"
        >
          <!--- Enlace a invernaderos -->
          <RouterLink
            to="invernaderos"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img
                src="../components/icons/by location-morado-32px-03.svg"
                alt="Invernaderos"
                width="24"
                height="24"
              />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Invernaderos</span>
          </RouterLink>

          <!-- Tooltip para el enlace Invernaderos -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Invernaderos'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Reservorios -->
        <li
          v-if="disable[2][1] && hasFinca"
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Reservorios')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a reservorios -->
          <RouterLink
            to="Reservorios"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img
                src="../components/icons/rutas & georeferencia-morado-32px-03.svg"
                alt="Reservorios"
                width="24"
                height="24"
              />
            </span>
            <!--- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Reservorios</span>
          </RouterLink>

          <!-- Tooltip para el enlace Reservorios -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Reservorios'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Consumo -->
        <li
          v-if="disable[3]"
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Consumo')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a consumo -->
          <RouterLink
            to="data-tabla"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img src="../components/icons/icons8-energy-96.png" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Consumo</span>
          </RouterLink>

          <!-- Tooltip para el enlace Consumo -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Consumo'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Rutas y georeferencia -->
        <li
          v-if="disable[4]"
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Map')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a rutas y georeferencia -->
          <RouterLink to="map" :class="['flex items-center', !isExpanded && 'justify-center px-2']">
            <span>
              <img
                src="../components/icons/rutas & georeferencia-morado-32px-03.svg"
                alt=""
                width="24"
                height="24"
              />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Map</span>
          </RouterLink>

          <!-- Tooltip para el enlace Map -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Map'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Biblioteca -->
        <li
          v-if="disable[5]"
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Biblioteca')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a biblioteca -->
          <RouterLink
            to="biblioteca"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img
                src="../components/icons/audit-morado-24px-01.svg"
                alt="Biblioteca"
                width="24"
                height="24"
              />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Biblioteca</span>
          </RouterLink>

          <!-- Tooltip para el enlace Biblioteca -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Biblioteca'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Tickets -->
        <li
          v-if="disable[7]"
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Tickets')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a tickets -->
          <RouterLink
            to="pendientes"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span class="icon-[fluent--clock-bill-32-regular] size-6"></span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Tickets</span>
          </RouterLink>

          <!-- Tooltip para el enlace Tickets -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Tickets'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Directorio -->
        <li
          v-if="hasFinca"
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Directorio')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace al directorio -->
          <RouterLink
            to="directorio"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span class="icon-[oui--documentation] size-5"></span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Directorio</span>
          </RouterLink>

          <!-- Tooltip para el enlace Directorio -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Directorio'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Notas -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Notas')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a notas -->
          <RouterLink
            to="notas"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img
                src="../components/icons/planos-morado-32px-03.svg"
                alt="Notas"
                width="24"
                height="24"
              />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Notas</span>
          </RouterLink>

          <!-- Tooltip para el enlace Notas -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Notas'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Plataformas Externas -->
        <div v-if="isExpanded" class="divider text-base-content/50 py-1 after:border-0">
          Plataformas Externas
        </div>

        <!-- Sgmwin -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'SGMWIN')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a sgmwin -->
          <RouterLink
            to="sgmwin"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img
                src="../components/icons/sistemas it-morado-32px-03.svg"
                alt="SGMWIN"
                width="24"
                height="24"
              />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">SGMWIN</span>
          </RouterLink>

          <!-- Tooltip para el enlace SGMWIN -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'SGMWIN'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- FDIM -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'FDIM')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a fdim -->
          <RouterLink
            to="fdim"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img src="../components/icons/icons8-link-96.png" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">FDIM</span>
          </RouterLink>

          <!-- Tooltip para el enlace FDIM -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'FDIM'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Divisor para separar ayuda -->
        <div v-if="isExpanded" class="divider text-base-content/50 py-1 after:border-0">Ayuda</div>

        <!-- Support -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Support')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a support -->
          <RouterLink
            to="support"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span class="icon-[tabler--users-group] size-5"></span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Support</span>
          </RouterLink>

          <!-- Tooltip para el enlace Support -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Support'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Documentation -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Documentation')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a documentation -->
          <RouterLink to="" :class="['flex items-center', !isExpanded && 'justify-center px-2']">
            <span class="icon-[tabler--files] size-5"></span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Documentation</span>
          </RouterLink>

          <!-- Tooltip para el enlace Documentation -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Documentation'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <!-- Acerca de -->
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Acerca de')"
          @mouseleave="handleMouseLeave"
        >
          <!-- Enlace a acerca de -->
          <RouterLink
            to="about"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img src="../components/icons/icons8-info-96.png" alt="" width="24" height="24" />
            </span>
            <!-- Título del enlace -->
            <span v-if="isExpanded" class="ml-2">Acerca de</span>
          </RouterLink>

          <!-- Tooltip para el enlace Acerca de -->
          <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Acerca de'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <div v-if="isExpanded" class="w-full divider text-base-content/50 py-1"></div>

        <!-- Mostrar la version del prototipo -->
        <li v-if="isExpanded" class="hover:bg-white cursor-default! list-none">
          <span class="text-start hover:bg-white text-xs cursor-default!"
            >© 2025 Prototipo web. v0.1.0</span
          >
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
/* Estilos para el drawer */
.drawer-body {
  padding: 0;
  padding-left: 3px;
  padding-bottom: 10px;
}
li {
  color: #545386;
}

/* Transiciones suaves */
.drawer {
  transition: max-width 0.4s ease-in-out;
}

/* Ajustes para modo contraído */
.drawer.max-w-20 .menu li a {
  padding-left: 8px;
  padding-right: 8px;
}
/* Asegura que el drawer permita overflow visible */
.drawer {
  overflow: visible !important;
}

.drawer-body {
  overflow-y: auto;
  overflow-x: hidden;
}

/* Contexto de apilamiento forzado */
.menu {
  isolation: isolate;
  position: relative;
}
</style>

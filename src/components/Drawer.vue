<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { inject, ref, onMounted } from 'vue'

// Inyectar el estado del drawer desde el componente padre
const drawerState = inject('drawerState', null)

// Si no hay provider, usar valores por defecto
const isExpanded = drawerState ? drawerState.isExpanded : ref(true)
const toggleDrawer = drawerState
  ? drawerState.toggleDrawer
  : () => {
      isExpanded.value = !isExpanded.value
    }

const activeTooltip = ref<null | { text: string; style: Record<string, string> }>(null)

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

const handleMouseLeave = () => {
  activeTooltip.value = null
}
</script>

<template>
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

  <aside
    id="multilevel-with-separator"
    :class="[
      'overlay [--auto-close:sm] overlay-open:translate-x-0 drawer drawer-start hidden sm:absolute sm:z-0 sm:flex sm:translate-x-0 pt-20 border-r-3 border-[#D8D2C4] fixed bottom-0 transition-all duration-300',
      isExpanded ? 'max-w-54' : 'max-w-20 pt-22',
    ]"
    tabindex="-1"
  >
    <div class="drawer-body pt-4">

      <ul class="menu space-y-0.5 pb-6 p-0">
        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Elite Flower')"
          @mouseleave="handleMouseLeave"
        >
          <RouterLink
            to="BodyLayout"
            :class="['flex flex-col justify-center items-center gap-0', !isExpanded && 'px-2']"
          >
            <img
              src="./icons/elite flower-morado-64px-05.svg"
              :class="isExpanded ? 'h-10 mb-3' : 'h-8 mb-1'"
            />
            <h3 v-if="isExpanded" class="font-semibold">Elite Flower</h3>
            <p v-if="isExpanded" class="text-gray-500! text-xs">Finca Productora</p>
          </RouterLink>

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

        <div v-if="isExpanded" class="w-full divider text-base-content/50 py-1"></div>

        <li v-if="isExpanded">
          <div class="flex flex-col justify-center items-start w-full px-2">
            <label class="label-text text-[#545386] font-medium" for="favorite-simpson"
              >Finca productora:</label
            >
            <select class="select text-xs h-7 w-full" id="favorite-simpson">
              <option>Elite Flower</option>
              <option>Finca Santa Maria</option>
              <option>Finca La Nena</option>
              <option>Finca El Morado</option>
            </select>
          </div>
        </li>

        <div v-if="isExpanded" class="w-full divider text-base-content/50 py-1"></div>

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Home')"
          @mouseleave="handleMouseLeave"
        >
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
            <span v-if="isExpanded" class="ml-2">Home</span>
          </RouterLink>

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

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Plásticos')"
          @mouseleave="handleMouseLeave"
        >
          <RouterLink
            to="Plasticos"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img
                src="../components/icons/by location-morado-32px-03.svg"
                alt="Plásticos"
                width="24"
                height="24"
              />
            </span>
            <span v-if="isExpanded" class="ml-2">Plásticos</span>
          </RouterLink>

           <Teleport to="#tooltip-container">
            <div
              v-if="!isExpanded && activeTooltip?.text === 'Plásticos'"
              :style="activeTooltip.style"
              class="fixed z-50 bg-[#D8D2C4] text-black text-sm px-2 py-1 rounded shadow-lg transition"
            >
              {{ activeTooltip.text }}
            </div>
          </Teleport>
        </li>

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Reservorios')"
          @mouseleave="handleMouseLeave"
        >
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
            <span v-if="isExpanded" class="ml-2">Reservorios</span>
          </RouterLink>

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

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Consumo')"
          @mouseleave="handleMouseLeave"
        >
          <RouterLink
            to="tabla-lecturas"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img src="../components/icons/icons8-energy-96.png" alt="" width="24" height="24"/>
            </span>
            <span v-if="isExpanded" class="ml-2">Consumo</span>
          </RouterLink>

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

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Map')"
          @mouseleave="handleMouseLeave"
        >
          <RouterLink to="map" :class="['flex items-center', !isExpanded && 'justify-center px-2']">
            <span>
              <img
                src="../components/icons/rutas & georeferencia-morado-32px-03.svg"
                alt="Map"
                width="24"
                height="24"
              />
            </span>
            <span v-if="isExpanded" class="ml-2">Map</span>
          </RouterLink>

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

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Notas')"
          @mouseleave="handleMouseLeave"
        >
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
            <span v-if="isExpanded" class="ml-2">Notas</span>
          </RouterLink>

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

        <div v-if="isExpanded" class="divider text-base-content/50 py-1 after:border-0">
          Plataformas Externas
        </div>

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'SGMWIN')"
          @mouseleave="handleMouseLeave"
        >
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
            <span v-if="isExpanded" class="ml-2">SGMWIN</span>
          </RouterLink>

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

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'FDIM')"
          @mouseleave="handleMouseLeave"
        >
          <RouterLink
            to="fdim"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img src="../components/icons/icons8-link-96.png" alt="" width="24" height="24" />
            </span>
            <span v-if="isExpanded" class="ml-2">FDIM</span>
          </RouterLink>

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

        <div v-if="isExpanded" class="divider text-base-content/50 py-1 after:border-0">Ayuda</div>

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Support')"
          @mouseleave="handleMouseLeave"
        >
          <RouterLink to="404" :class="['flex items-center', !isExpanded && 'justify-center px-2']">
            <span class="icon-[tabler--users-group] size-5"></span>
            <span v-if="isExpanded" class="ml-2">Support</span>
          </RouterLink>

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

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Documentation')"
          @mouseleave="handleMouseLeave"
        >
          <RouterLink to="#" :class="['flex items-center', !isExpanded && 'justify-center px-2']">
            <span class="icon-[tabler--files] size-5"></span>
            <span v-if="isExpanded" class="ml-2">Documentation</span>
          </RouterLink>

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

        <li
          class="relative"
          @mouseenter="(e) => handleMouseEnter(e, 'Acerca de')"
          @mouseleave="handleMouseLeave"
        >
          <RouterLink
            to="about"
            :class="['flex items-center', !isExpanded && 'justify-center px-2']"
          >
            <span>
              <img src="../components/icons/icons8-info-96.png" alt="" width="24" height="24" />
            </span>
            <span v-if="isExpanded" class="ml-2">Acerca de</span>
          </RouterLink>

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

        <li v-if="isExpanded" class="hover:bg-white cursor-none list-none">
          <span class="text-start hover:bg-white text-xs">© 2025 Prototipo web. v0.1.0</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
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

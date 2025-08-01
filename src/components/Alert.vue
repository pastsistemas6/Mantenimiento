<template>
  <div>
    <!-- Modal raíz con animaciones de entrada/salida. Se muestra cuando `open` es true -->
    <TransitionRoot as="template" :show="open">
      <!-- Componente Dialog de Headless UI. Se cierra cuando se dispara el evento `@close` -->
      <Dialog class="relative z-10" @close="open = false">

        <!-- Fondo semitransparente del modal con transición de opacidad -->
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <!-- Capa oscura detrás del modal -->
          <div class="fixed inset-0 bg-gray-500/55 transition-opacity" />
        </TransitionChild>

        <!-- Contenedor principal del contenido del modal -->
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <!-- Animación de aparición para el contenido del modal -->
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <!-- Panel del modal: caja blanca con contenido, sombra y bordes redondeados -->
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <!-- Contenido principal del modal -->
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <!-- Icono de advertencia en un círculo rojo -->
                    <div
                      class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
                    >
                      <ExclamationTriangleIcon class="size-6 text-red-600" aria-hidden="true" />
                    </div>
                    <!-- Texto del modal: título y descripción -->
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <!-- Título del diálogo (propiedad `title`) -->
                      <DialogTitle as="h3" class="text-base font-semibold text-gray-900">
                        {{ title }}
                      </DialogTitle>
                      <!-- Texto descriptivo del diálogo (propiedad `text`) -->
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">{{ text }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Botón de acción (Aceptar) para cerrar el modal -->
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    @click="open = false"
                  >
                    Aceptar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
// Importamos las utilidades necesarias desde Vue y Headless UI
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

// Definimos las propiedades que puede recibir el componente (título y texto del diálogo)
const props = defineProps({
  title: {
    type: String,
    default: 'Error', // Título por defecto si no se especifica
  },
  text: {
    type: String,
    default: 'Ha ocurrido un error', // Texto por defecto si no se especifica
  },
})

// Variable reactiva para controlar la visibilidad del modal
const open = ref(false)

// Función para abrir el modal desde el componente padre
const showAlert = () => {
  open.value = true
}

// Exponemos la función `showAlert` al componente padre para que pueda invocar el modal
defineExpose({
  showAlert,
})
</script>

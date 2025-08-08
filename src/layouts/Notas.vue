<template>
  <!-- Layout para la página de Notas -->
  <div class="min-h-full">
    <div class="py-2 pr-5 pb-6">
      <div class="shadow rounded-lg p-4 flex flex-col items-center0">
        <div class="w-full flex items-center gap-3">
          <h2 class="text-2xl font-bold text-[#545386]">Notas y recordatorios</h2>
          <div class="w-50 ml-auto">
            <!-- Select para filtrar por finca -->
            <select class="select" id="filtro">
              <option disabled selected>Finca</option>
              <option>Finca santa maria</option>
              <option>Finca la nena</option>
              <option>Finca fantasy</option>
              <option>Finca el colegio</option>
            </select>
          </div>
          <!--- Botón para abrir el modal de nueva nota -->
          <button
            type="button"
            class="btn bg-[#545386] shadow-none border-0"
            aria-haspopup="dialog"
            aria-expanded="false"
            @click="openModal"
            aria-controls="form-modal"
          >
            Nueva nota
          </button>

          <!-- Modal para crear una nueva nota -->
          <div
            id="form-modal"
            :class="
              !isModalOpen
                ? 'modal hidden'
                : 'modal opacity-100 duration-300 open w-full h-full bg-base-content/50'
            "
          >
            <div
              :class="
                !isModalOpen
                  ? 'modal-dialog hidden'
                  : 'modal-dialog top-40 opacity-100 duration-300'
              "
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title text-2xl font-bold text-[#545386]">Nota</h3>
                  <!-- Botón para cerrar el modal -->
                  <button
                    type="button"
                    class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                    aria-label="Close"
                  >
                    <span class="icon-[tabler--x] size-4" @click="closeModal"></span>
                  </button>
                </div>
                <!-- Formulario para crear una nueva nota -->
                <form>
                  <div class="modal-body pt-0">
                    <div class="mb-2">
                      <!-- Campo de entrada para el título de la nota -->
                      <label class="label-text" for="titulo"> Titulo </label>
                      <input
                        type="text"
                        placeholder="Titulo alusivo a la nota"
                        class="input"
                        id="titulo"
                      />
                    </div>
                    <div>
                      <!-- Campo de texto para la descripción de la nota -->
                      <label class="label-text" for="descripcion"> Descripción </label>
                      <textarea
                        class="textarea textarea-bordered w-full border-base-content/30"
                        placeholder="Descripción de la nota..."
                        rows="3"
                        id="descripcion"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <!-- Select para seleccionar la prioridad de la nota -->
                      <label class="label-text" for="favorite-simpson"
                        >Seleccione la prioridad</label
                      >
                      <select class="select" id="favorite-simpson">
                        <option selected disabled>Seleccione la prioridad...</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>
                  </div>
                  <!-- Botones para cancelar o guardar la nota -->
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-soft btn-secondary shadow-none border-0"
                      @click="closeModal"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      class="btn bg-[#545386] shadow-none border-0"
                      @click="closeModal"
                    >
                      Guardar nota
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="divider text-base-content/50 py-4"></div>
        <!-- Grid para mostrar las notas -->
        <div class="grid grid-cols-2 gap-4">
          <CardNotas></CardNotas>
          <CardNotas></CardNotas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importación del componente CardNotas para mostrar las notas
import CardNotas from '@/components/CardNotas.vue'
import { ref, onMounted, onUnmounted } from 'vue'

// Estado para controlar la visibilidad del modal
const isModalOpen = ref(false)

// Función para abrir el modal
const openModal = () => {
  isModalOpen.value = true
}

// Función para cerrar el modal
const closeModal = () => {
  isModalOpen.value = false
}
</script>

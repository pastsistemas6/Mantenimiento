<template>
  <div class="min-h-full">
    <div class="py-2 pr-5 pb-6">
      <div class="shadow rounded-lg p-4 flex flex-col items-center0">
        <div class="w-full flex items-center gap-3">
          <h2 class="text-2xl font-bold text-[#545386]">Notas y recordatorios</h2>
          <div class="w-50 ml-auto">
            <select class="select" id="filtro">
              <option disabled selected>Finca</option>
              <option>Finca santa maria</option>
              <option>Finca la nena</option>
              <option>Finca fantasy</option>
              <option>Finca el colegio</option>
            </select>
          </div>
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
                  <button
                    type="button"
                    class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                    aria-label="Close"
                  >
                    <span class="icon-[tabler--x] size-4" @click="closeModal"></span>
                  </button>
                </div>
                <form>
                  <div class="modal-body pt-0">
                    <div class="mb-2">
                      <label class="label-text" for="titulo"> Titulo </label>
                      <input
                        type="text"
                        placeholder="Titulo alusivo a la nota"
                        class="input"
                        id="titulo"
                      />
                    </div>
                    <div>
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
        <div class="grid grid-cols-2 gap-4">
          <CardNotas></CardNotas>
          <CardNotas></CardNotas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardNotas from '@/components/CardNotas.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

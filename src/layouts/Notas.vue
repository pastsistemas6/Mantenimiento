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
            class="btn bg-[#545386]"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="form-modal"
            data-overlay="#form-modal"
          >
            Nueva nota
          </button>

          <div
            id="form-modal"
            class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden"
            role="dialog"
            tabindex="-1"
          >
            <div class="modal-dialog overlay-open:opacity-100 overlay-open:duration-300">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title text-[#545386]">Nota</h3>
                  <button
                    type="button"
                    class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                    aria-label="Close"
                    data-overlay="#form-modal"
                  >
                    <span class="icon-[tabler--x] size-4"></span>
                  </button>
                </div>
                <form>
                  <div class="modal-body pt-0">
                    <div class="mb-2">
                      <label class="label-text" for="titulo"> Titulo </label>
                      <input type="text" placeholder="John Doe" class="input" id="titulo" />
                    </div>
                    <div>
                      <label class="label-text" for="descripcion"> Descripción </label>
                      <textarea
                        class="input pt-1"
                        placeholder="Descripción de la nota"
                        name=""
                        id="descripcion"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label class="label-text" for="favorite-simpson"
                        >Seleccione la prioridad</label
                      >
                      <select class="select" id="favorite-simpson">
                        <option disabled>Seleccione una...</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-soft btn-secondary"
                      data-overlay="#form-modal"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn bg-[#545386]">Guardar nota</button>
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
</script>

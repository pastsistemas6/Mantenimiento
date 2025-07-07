<template>
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div class="flex flex-col gap-4 shadow p-4 rounded-lg">
        <div class="flex gap-2 items-center">
          <h2 class="text-[#545386] font-bold text-2xl">Administración de usuarios</h2>
          <div id="dropdown-datatable-with-export" class="dropdown relative inline-flex ml-auto">
            <button
              id="datatable-export-dropdown"
              type="button"
              class="dropdown-toggle max-sm:btn-square btn btn-soft btn-sm bg-[rgb(84,83,134)] text-white text-sm py-4.5"
              @click="abrir"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <span class="flex items-center gap-3">
                <span class="icon-[tabler--download] size-4"></span>
                <span class="max-sm:hidden">Exportar</span>
              </span>
              <span
                :class="!isOpen ? 'icon-[tabler--chevron-down] max-sm:hidden dropdown-open:rotate-180 size-4' : 'icon-[tabler--chevron-down] rotate-180 size-4'"
              ></span>
            </button>
            <div
              :class="!isOpen ? 'dropdown-menu dropdown-open:opacity-100 hidden' : 'dropdown-menu opacity-100 absolute block top-8 shadow'"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="datatable-export-dropdown"
            >
              <button type="button" class="dropdown-item" data-datatable-action-type="copy" @click="close">
                <span class="icon-[tabler--clipboard-copy] size-3.5 shrink-0"></span>
                Copy
              </button>
              <button type="button" class="dropdown-item" data-datatable-action-type="print" @click="close">
                <span class="icon-[tabler--printer] size-3.5 shrink-0"></span>
                Print
              </button>
              <hr class="border-base-content/25 -mx-2 my-3" />
              <button type="button" class="dropdown-item" data-datatable-action-type="excel" @click="close">
                <span class="icon-[tabler--file-excel] size-3.5 shrink-0"></span>
                Excel
              </button>
              <button type="button" class="dropdown-item" data-datatable-action-type="csv" @click="close">
                <span class="icon-[tabler--file-type-csv] size-3.5 shrink-0"></span>
                CSV
              </button>
              <button type="button" class="dropdown-item" data-datatable-action-type="pdf" @click="close">
                <span class="icon-[tabler--file-type-pdf] size-3.5 shrink-0"></span>
                PDF
              </button>
            </div>
          </div>
          <button type="button" class="btn bg-[rgb(84,83,134)] shadow-none text-sm"
            aria-haspopup="dialog"
            aria-expanded="false"
            @click="openModal"
            aria-controls="form-modal">
            <span class="flex items-center gap-2">
              <span class="icon-[mingcute--add-line] size-4"></span>
              <span class="max-sm:hidden">Nuevo usuario</span>
            </span>
          </button>

          <div id="form-modal" :class="!isModalOpen ? 'modal hidden' : 'modal opacity-100 duration-300 w-full h-full bg-base-content/50'">
            <div :class="!isModalOpen ? 'modal-dialog' : 'modal-dialog opacity-100 duration-300'">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title">Agregar usuario</h3>
                  <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" @click="closeModal"><span class="icon-[tabler--x] size-4"></span></button>
                </div>
                <form>
                  <div class="modal-body pt-0">
                    <div class="mb-4">
                      <label class="label-text" for="fullName"> Usuario </label>
                      <input type="text" placeholder="John Doe" class="input" id="fullName" />
                    </div>
                    <div class="mb-4 flex gap-4 max-sm:flex-col">
                      <div class="w-full">
                        <label class="label-text" for="email"> Correo </label>
                        <input type="email" placeholder="johndoe@123@eliteflower.com" class="input" id="email" />
                      </div>
                      <div class="w-full">
                        <label class="label-text" for="favorite-simpson">Rol</label>
                        <select class="select" id="favorite-simpson">
                          <option>Admin</option>
                          <option>Asistente zona</option>
                          <option>Operario</option>
                          <option>Ingeniero soporte</option>
                          <option>Pasante</option>
                          <option>Usuario general</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label class="label-text" for="favorite-simpson">Ubicación</label>
                      <select class="select" id="favorite-simpson">
                        <option>Finca la nena</option>
                        <option>Finca santa maria</option>
                        <option>Finca el morado</option>
                        <option>Finca florex</option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-soft btn-secondary" @click="closeModal">Cancelar</button>
                    <button type="submit" class="btn bg-[rgb(84,83,134)]" @click="closeModal">Guardar usuario</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-evenly gap-3">
          <div class="stat shadow-sm rounded-md">
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
          <div class="stat shadow-sm rounded-md">
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
          <div class="stat shadow-sm rounded-md">
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
          <div class="stat shadow-sm rounded-md">
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
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false);
const isModalOpen = ref(false);

function abrir() {
  if (isOpen.value == false) {
    isOpen.value = true
  } else if (isOpen.value == true) {
    isOpen.value = false
  }
}

const close = () => {
  isOpen.value = false
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

onMounted(async () => {
  const dataTable = $('#datatable-with-export table').DataTable({
    dom: 'B', // Required for buttons to work
    pageLength: 5,
    buttons: [
      {
        extend: 'copy',
        exportOptions: {
          columns: [1, 2, 3], // Columns to include (adjust indices as needed)
        },
      },
      {
        extend: 'csv',
        exportOptions: {
          columns: [1, 2, 3],
        },
      },
      {
        extend: 'excel',
        exportOptions: {
          columns: [1, 2, 3],
        },
      },
      {
        extend: 'pdf',
        exportOptions: {
          columns: [1, 2, 3],
        },
      },
      {
        extend: 'print',
        exportOptions: {
          columns: [1, 2, 3],
        },
      },
    ],
  })
  // Remove extra button due to dom: 'B', ;
  const buttons = document.querySelectorAll('#dropdown-datatable-with-export .dropdown-menu button')
  document.querySelectorAll('#datatable-with-export .dt-buttons').forEach((buttonContainer) => {
    buttonContainer.style.display = 'none'
  })

  buttons.forEach((btn) => {
    const type = btn.getAttribute('data-datatable-action-type')
    btn.addEventListener('click', () => dataTable.button(`.buttons-${type}`).trigger())
  })
})
</script>

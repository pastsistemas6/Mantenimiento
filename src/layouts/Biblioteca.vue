<template>
  <div class="min-h-full">
    <div class="py-2 pr-5 pb-6">
      <div class="shadow rounded-lg p-4 flex flex-col items-center flex-nowrap">
        <div class="w-full mb-6 flex justify-between gap-4 px-4">
          <div class="w-[17%]"></div>
          <h2 class="text-3xl font-bold text-[#545386] mb-2">Biblioteca virtual</h2>
          <button
            type="button"
            class="btn w-[17%] bg-[#545386] border-0 shadow-none flex items-center"
            @click="showModal = true"
          >
            <span class="icon-[mingcute--add-fill] size-4 px-1 py-1"></span>
            Agregar ticket
          </button>

          <div
            v-if="showModal"
            class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full fixed inset-0 z-50"
            role="dialog"
            tabindex="-1"
          >
            <div class="modal-dialog opacity-100 duration-300">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title font-semibold text-[#545386]">Crear ticket</h3>
                  <button
                    type="button"
                    class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                    aria-label="Close"
                    @click="showModal = false"
                  >
                    <span class="icon-[tabler--x] size-4"></span>
                  </button>
                </div>
                <form @submit.prevent="submitForm" class="overflow-y-auto">
                  <div class="modal-body pt-0 flex flex-col gap-2">
                    <div>
                      <label class="label-text" for="campo">Elemento solicitado</label>
                      <input
                        type="text"
                        placeholder="Digite el nombre del elemento..."
                        class="input"
                        id="campo"
                        v-model="formData.elemento"
                      />
                    </div>
                    <div>
                      <label class="label-text" for="description">Descripción</label>
                      <textarea
                        class="input py-2 h-28"
                        name="description"
                        id="description"
                        placeholder="Describe detalladamente el elemento que necesitas (Tipo, marca y voltaje si se requiere)"
                        v-model="formData.descripcion"
                      ></textarea>
                    </div>
                    <div>
                      <label class="label-text" for="images">Adjunta imágenes alusivas</label>
                      <div
                        class="bg-base-200/60 rounded-box flex flex-col justify-center border-2 border-base-content/20 border-dashed"
                        @dragover.prevent
                        @drop.prevent="handleDrop"
                      >
                        <div
                          class="text-center cursor-pointer px-12 py-4"
                          @click="triggerFileInput"
                        >
                          <p class="text-base-content/50 mb-3 text-sm">
                            Selecciona imágenes con tamaño máximo de 2MB cada una.
                          </p>
                          <button
                            type="button"
                            class="btn btn-soft btn-sm bg-[#545386] shadow-none text-white text-nowrap"
                          >
                            <span class="icon-[tabler--file-upload] size-4.5 shrink-0"></span>
                            Arrastra y suelta imágenes
                          </button>
                        </div>
                        <input
                          ref="fileInput"
                          type="file"
                          multiple
                          accept="image/*"
                          @change="handleFileSelect"
                          style="display: none"
                        />
                        <div class="mx-6 mb-6 space-y-2" v-if="selectedImages.length > 0">
                          <div
                            v-for="(image, index) in selectedImages"
                            :key="index"
                            class="flex items-center justify-between p-2 bg-white rounded-sm border-1 border-accent-content/150"
                          >
                            <div class="flex items-center gap-2">
                              <img
                                :src="image.preview"
                                alt="Preview"
                                class="w-9 h-9 object-cover rounded"
                              />
                              <span class="text-sm">{{ image.name }}</span>
                              <span class="text-xs text-gray-500"
                                >({{ formatFileSize(image.size) }})</span
                              >
                            </div>
                            <button
                              type="button"
                              @click="removeImage(index)"
                              class="btn shadow-none border-0 px-3 text-red-500 bg-red-200"
                            >
                              <span class="icon-[tabler--x] size-4"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-soft btn-secondary shadow-none"
                      @click="showModal = false"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn bg-[#545386] shadow-none">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Filtros de búsqueda -->
        <div class="relative max-w-4xl mb-4 w-full">
          <div class="flex items-center gap-3 mb-4">
            <div class="relative w-lg">
              <input
                v-model="searchTerm"
                class="input py-6 ps-8 bg-transparent shadow-none focus:border-0 w-full"
                type="text"
                placeholder="Buscar componente por nombre..."
                autocomplete="off"
              />
              <span
                class="icon-[tabler--search] text-base-content absolute start-3 top-1/2 size-4 shrink-0 -translate-y-1/2"
              ></span>
            </div>

            <select
              class="select join-item max-w-sm w-sm h-12"
              aria-label="select"
              v-model="selectedEspecialidad"
            >
              <option value="" disabled>Todas las especialidades</option>
              <option
                v-for="especialidad in especialidades"
                :key="especialidad"
                :value="especialidad"
              >
                {{ especialidad }}
              </option>
            </select>

            <select class="select join-item max-w-xs w-xs h-12" v-model="selectedTipoComponente">
              <option value="" disabled>Tipo de componente</option>
              <option value="insumos">Insumos</option>
              <option value="equipos">Equipos</option>
            </select>

            <button
              class="btn btn-outline bg-[#545386] text-white join-item py-3 h-auto"
              :disabled="!hasActiveFilters"
              @click="performSearch"
            >
              Buscar
            </button>
          </div>

          <!-- Filtros activos -->
          <div v-if="hasActiveFilters" class="flex items-center gap-2 mb-4">
            <button
              type="button"
              class="btn bg-[#D8D2C4] text-white font-bold border-0 shadow-none flex items-center justify-center py-0.5 px-4"
              @click="clearAllFilters"
              title="Limpiar todos los filtros"
            >
              ✕
            </button>

            <span
              v-if="searchTerm"
              @click="clearFilter('search')"
              class="relative btn bg-[#D8D2C4] text-white| Z< border-0 shadow-none py-3 px-4 cursor-pointer group"
            >
              <span class="group-hover:hidden duration-300">Nombre: {{ searchTerm }}</span>
              <span class="hidden group-hover:inline text-xl duration-300 w-36">×</span>
            </span>

            <span
              v-if="selectedEspecialidad"
              @click="clearFilter('especialidad')"
              class="relative btn bg-[#D8D2C4] text-white border-0 shadow-none py-3 px-4 cursor-pointer group"
            >
              <span class="group-hover:hidden duration-300"
                >Especialidad: {{ selectedEspecialidad }}</span
              >
              <span class="hidden group-hover:inline text-xl duration-300 w-36">×</span>
            </span>

            <span
              v-if="selectedTipoComponente"
              @click="clearFilter('tipo')"
              class="relative btn bg-[#D8D2C4] text-white border-0 shadow-none py-3 px-4 cursor-pointer group"
            >
              <span class="group-hover:hidden duration-300"
                >Tipo: {{ selectedTipoComponente === 'insumos' ? 'Insumos' : 'Equipos' }}</span
              >
              <span class="hidden group-hover:inline text-xl duration-300 w-36">×</span>
            </span>
          </div>
        </div>

        <!-- Resultados de búsqueda -->
        <div v-if="showResults && filteredComponents.length > 0" class="w-full max-w-4xl mb-6">
          <h3 class="text-xl font-semibold text-[#545386] mb-4">
            Resultados de búsqueda ({{ filteredComponents.length }})
          </h3>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="component in filteredComponents"
              :key="component.id"
              @click="selectComponent(component)"
              class="bg-white rounded-lg shadow border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <h4 class="font-medium text-[#545386] mb-2">{{ component.name }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ component.category }}</p>
              <p class="text-xs text-gray-500">Especialidad: {{ component.especialidad }}</p>
              <p class="text-xs text-gray-500">Código: {{ component.code }}</p>
            </div>
          </div>
        </div>

        <!-- Mensaje cuando no hay resultados -->
        <div
          v-if="showResults && filteredComponents.length === 0"
          class="w-full max-w-4xl text-center py-8"
        >
          <p class="text-gray-500">
            No se encontraron componentes que coincidan con los filtros seleccionados.
          </p>
        </div>

        <!-- Acordeón de ayuda (se oculta cuando hay resultados) -->
        <div
          v-if="!showResults"
          class="accordion accordion-shadow *:accordion-item-active:shadow w-full max-w-4xl"
        >
          <div class="accordion-item active shadow" id="payment-shadow">
            <button
              class="accordion-toggle inline-flex items-center gap-x-4 px-5 py-4 w-full"
              @click="toggleAccordion('usage')"
              :aria-expanded="activeAccordion === 'usage'"
            >
              <span
                v-if="activeAccordion !== 'usage'"
                class="text-base-content size-4.5 flex items-center"
                >+</span
              >
              <span v-else class="text-base-content size-4.5 flex items-center">-</span>
              ¿Cómo usar la biblioteca?
            </button>
            <div
              v-if="activeAccordion === 'usage'"
              class="accordion-content w-full overflow-hidden transition-[height] duration-300"
            >
              <div class="px-5 pb-4">
                <p class="text-base-content/80 font-normal">
                  Use los filtros superiores para buscar elementos por nombre, especialidad o tipo.
                  Los <strong>insumos</strong> son elementos generales disponibles para cada
                  especialidad, mientras que los <strong>equipos</strong> son herramientas
                  específicas con documentación detallada.
                </p>
              </div>
            </div>
          </div>

          <div class="accordion-item" id="types-shadow">
            <button
              class="accordion-toggle inline-flex items-center gap-x-4 px-5 py-4 text-start w-full"
              @click="toggleAccordion('types')"
              :aria-expanded="activeAccordion === 'types'"
            >
              <span
                v-if="activeAccordion !== 'types'"
                class="text-base-content size-4.5 flex items-center"
                >+</span
              >
              <span v-else class="text-base-content size-4.5 flex items-center">-</span>
              ¿Qué tipos de elementos encuentro aquí?
            </button>
            <div
              v-if="activeAccordion === 'types'"
              class="accordion-content w-full overflow-hidden transition-[height] duration-300"
            >
              <div class="px-5 pb-4">
                <p class="text-base-content/80 font-normal">
                  <strong>Especialidades:</strong> Eléctricos, Electromecánicos, Invernadores,
                  Mecánicos, Obras Civiles, Soldadores.<br /><br />
                  <strong>Insumos:</strong> Elementos generales de uso común para cada
                  especialidad.<br /><br />
                  <strong>Equipos:</strong> Herramientas específicas como atadoras, bombas,
                  cosedoras, estibadores, máquinas sembradoras, etc.
                </p>
              </div>
            </div>
          </div>

          <div class="accordion-item" id="filters-shadow">
            <button
              class="accordion-toggle inline-flex items-center gap-x-4 px-5 py-4 text-start w-full"
              @click="toggleAccordion('filters')"
              :aria-expanded="activeAccordion === 'filters'"
            >
              <span
                v-if="activeAccordion !== 'filters'"
                class="text-base-content size-4.5 flex items-center"
                >+</span
              >
              <span v-else class="text-base-content size-4.5 flex items-center">-</span>
              ¿Cómo funcionan los filtros?
            </button>
            <div
              v-if="activeAccordion === 'filters'"
              class="accordion-content w-full overflow-hidden transition-[height] duration-300"
            >
              <div class="px-5 pb-4">
                <p class="text-base-content/80 font-normal">
                  <strong>Búsqueda por nombre:</strong> Escriba el nombre del componente para
                  filtrar los resultados.<br /><br />
                  <strong>Especialidades:</strong> Filtre por área de trabajo (Eléctricos,
                  Mecánicos, etc.).<br /><br />
                  <strong>Tipo:</strong> Seleccione "Insumos" para elementos generales o "Equipos"
                  para herramientas específicas.<br /><br />
                  Los filtros se pueden combinar para búsquedas más precisas.
                </p>
              </div>
            </div>
          </div>

          <div class="accordion-item" id="access-shadow">
            <button
              class="accordion-toggle inline-flex items-center gap-x-4 px-5 py-4 text-start w-full"
              @click="toggleAccordion('access')"
              :aria-expanded="activeAccordion === 'access'"
            >
              <span
                v-if="activeAccordion !== 'access'"
                class="text-base-content size-4.5 flex items-center"
                >+</span
              >
              <span v-else class="text-base-content size-4.5 flex items-center">-</span>
              ¿Cómo accedo a la información completa?
            </button>
            <div
              v-if="activeAccordion === 'access'"
              class="accordion-content w-full overflow-hidden transition-[height] duration-300"
            >
              <div class="px-5 pb-4">
                <p class="text-base-content/80 font-normal">
                  Después de seleccionar un elemento, encontrará enlaces directos a SmartSheet donde
                  podrá ver toda la información detallada, historial de uso, disponibilidad y
                  documentación técnica completa. También encontrará manuales de usuario y guías de
                  mantenimiento cuando estén disponibles.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Información del componente seleccionado -->
        <div
          v-if="selectedComponent"
          class="w-full max-w-4xl shadow-sm mt-5 p-8 rounded-lg bg-white"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="px-4 sm:px-0">
              <h3 class="text-2xl font-semibold text-[#545386]">Información del elemento</h3>
              <p class="mt-1 max-w-full text-base-content/80">
                {{ selectedComponent.description }}
              </p>
            </div>
            <button
              @click="clearSelection"
              class="btn btn-soft btn-sm text-gray-500 hover:text-gray-700"
              title="Cerrar"
            >
              <span class="icon-[tabler--x] size-4"></span>
            </button>
          </div>
          <div class="mt-6 border-t border-base-content/25">
            <dl class="divide-y divide-base-content/25">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Nombre del elemento</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                  {{ selectedComponent.name }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Especialidad</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                  {{ selectedComponent.especialidad }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Categoría</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                  {{ selectedComponent.category }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Código</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                  {{ selectedComponent.code }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Especificaciones</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                  {{ selectedComponent.specifications }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Enlaces</dt>
                <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    class="divide-y divide-base-content/25 rounded-md border border-base-content/25"
                  >
                    <li
                      v-for="link in selectedComponent.links"
                      :key="link.name"
                      class="flex items-center justify-between py-4 ps-4 pe-5"
                    >
                      <div class="flex w-0 flex-1 items-center">
                        <span class="text-lg">📄</span>
                        <div class="ms-4 flex min-w-0 flex-1 gap-2">
                          <span class="truncate font-medium">{{ link.name }}</span>
                          <span class="shrink-0 text-base-content/50">{{ link.type }}</span>
                        </div>
                      </div>
                      <div class="ms-4 shrink-0">
                        <a :href="link.url" target="_blank" class="link link-primary">Abrir</a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Estado reactivo
const showModal = ref(false)
const searchTerm = ref('')
const selectedComponent = ref(null)
const selectedEspecialidad = ref('')
const selectedTipoComponente = ref('')
const activeAccordion = ref('usage')
const selectedImages = ref([])
const fileInput = ref(null)
const hasSearched = ref(false)

// Datos del formulario
const formData = ref({
  elemento: '',
  descripcion: '',
})

// Especialidades según las imágenes
const especialidades = [
  'ELECTRICOS',
  'ELECTROMECANICOS',
  'INVERNADORES',
  'MECANICOS',
  'OBRAS CIVILES',
  'SOLDADORES',
]

// Componentes organizados por tipo
const allComponents = ref([
  // INSUMOS - Elementos generales por especialidad
  {
    id: 1,
    name: 'GENERAL',
    category: 'Insumos Generales',
    especialidad: 'ELECTRICOS',
    type: 'insumos',
    code: 'INS-ELE-001',
    description: 'Insumos generales para trabajos eléctricos',
    specifications: 'Materiales y herramientas básicas para instalaciones eléctricas',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/insumos-electricos',
      },
    ],
  },
  {
    id: 2,
    name: 'GENERAL',
    category: 'Insumos Generales',
    especialidad: 'ELECTROMECANICOS',
    type: 'insumos',
    code: 'INS-ELM-001',
    description: 'Insumos generales para trabajos electromecánicos',
    specifications: 'Materiales y herramientas básicas para equipos electromecánicos',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/insumos-electromecanicos',
      },
    ],
  },
  {
    id: 3,
    name: 'GENERAL',
    category: 'Insumos Generales',
    especialidad: 'INVERNADORES',
    type: 'insumos',
    code: 'INS-INV-001',
    description: 'Insumos generales para invernadores',
    specifications: 'Materiales para construcción y mantenimiento de invernaderos',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/insumos-invernadores',
      },
    ],
  },
  {
    id: 4,
    name: 'GENERAL',
    category: 'Insumos Generales',
    especialidad: 'MECANICOS',
    type: 'insumos',
    code: 'INS-MEC-001',
    description: 'Insumos generales para trabajos mecánicos',
    specifications: 'Herramientas y materiales básicos para mantenimiento mecánico',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/insumos-mecanicos',
      },
    ],
  },
  {
    id: 5,
    name: 'GENERAL',
    category: 'Insumos Generales',
    especialidad: 'OBRAS CIVILES',
    type: 'insumos',
    code: 'INS-CIV-001',
    description: 'Insumos generales para obras civiles',
    specifications: 'Materiales de construcción y herramientas para obras civiles',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/insumos-obras-civiles',
      },
    ],
  },
  {
    id: 6,
    name: 'GENERAL',
    category: 'Insumos Generales',
    especialidad: 'SOLDADORES',
    type: 'insumos',
    code: 'INS-SOL-001',
    description: 'Insumos generales para soldadura',
    specifications: 'Electrodos, gases, materiales de seguridad para soldadura',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/insumos-soldadores',
      },
    ],
  },

  // EQUIPOS - Herramientas específicas
  {
    id: 101,
    name: 'ATADORAS',
    category: 'Herramientas Agrícolas',
    especialidad: 'INVERNADORES',
    type: 'equipos',
    code: 'EQ-ATA-001',
    description: 'Máquinas atadoras para cultivos en invernadero',
    specifications: 'Atadora automática para plantas, capacidad 500 nudos/hora',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/atadoras',
      },
      {
        name: 'Manual de Operación',
        type: 'PDF',
        url: 'https://example.com/manual-atadoras.pdf',
      },
    ],
  },
  {
    id: 102,
    name: 'BANDAS TRANSPORTADORAS',
    category: 'Equipos de Transporte',
    especialidad: 'MECANICOS',
    type: 'equipos',
    code: 'EQ-BAN-001',
    description: 'Sistemas de bandas transportadoras industriales',
    specifications: 'Banda transportadora 10m, capacidad 500kg/h, motor 2HP',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/bandas-transportadoras',
      },
    ],
  },
  {
    id: 103,
    name: 'BOMBAS DE TORNILLO',
    category: 'Bombas Industriales',
    especialidad: 'ELECTROMECANICOS',
    type: 'equipos',
    code: 'EQ-BOM-001',
    description: 'Bombas de tornillo para fluidos viscosos',
    specifications: 'Bomba de tornillo 5HP, caudal 100L/min, presión 10bar',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/bombas-tornillo',
      },
    ],
  },
  {
    id: 104,
    name: 'COSEDORAS',
    category: 'Equipos de Empaque',
    especialidad: 'MECANICOS',
    type: 'equipos',
    code: 'EQ-COS-001',
    description: 'Máquinas cosedoras para sacos y empaques',
    specifications: 'Cosedora industrial, velocidad 1200 puntadas/min',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/cosedoras',
      },
    ],
  },
  {
    id: 105,
    name: 'DUOFLOR',
    category: 'Equipos Especializados',
    especialidad: 'INVERNADORES',
    type: 'equipos',
    code: 'EQ-DUO-001',
    description: 'Sistema Duoflor para cultivo en invernadero',
    specifications: 'Sistema automatizado de riego y nutrición para flores',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/duoflor',
      },
    ],
  },
  {
    id: 106,
    name: 'ESTIBADORES',
    category: 'Equipos de Manejo',
    especialidad: 'MECANICOS',
    type: 'equipos',
    code: 'EQ-EST-001',
    description: 'Estibadores para manejo de materiales',
    specifications: 'Estibador hidráulico, capacidad 2000kg, altura 3m',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/estibadores',
      },
    ],
  },
])

// Métodos para archivos
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const processFiles = (files) => {
  files.forEach((file) => {
    // Verificar que sea una imagen
    if (!file.type.startsWith('image/')) {
      alert(`El archivo ${file.name} no es una imagen válida.`)
      return
    }

    // Verificar tamaño máximo (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert(`El archivo ${file.name} es demasiado grande. El tamaño máximo es 2MB.`)
      return
    }

    // Crear preview
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedImages.value.push({
        file: file,
        name: file.name,
        size: file.size,
        preview: e.target.result,
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  selectedImages.value.splice(index, 1)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const submitForm = () => {
  console.log('Formulario enviado:', {
    elemento: formData.value.elemento,
    descripcion: formData.value.descripcion,
    imagenes: selectedImages.value,
  })

  // Limpiar formulario
  formData.value.elemento = ''
  formData.value.descripcion = ''
  selectedImages.value = []
  showModal.value = false
}

// Métodos para filtros y búsqueda
const hasActiveFilters = computed(() => {
  return searchTerm.value || selectedEspecialidad.value || selectedTipoComponente.value
})

const showResults = computed(() => {
  return hasSearched.value && hasActiveFilters.value
})

const filterComponents = () => {
  if (!searchTerm.value) return
  hasSearched.value = true
}

const onEspecialidadChange = () => {
  hasSearched.value = true
}

const onTipoComponenteChange = () => {
  hasSearched.value = true
}

const performSearch = () => {
  hasSearched.value = true
}

const clearFilter = (type) => {
  switch (type) {
    case 'search':
      searchTerm.value = ''
      break
    case 'especialidad':
      selectedEspecialidad.value = ''
      break
    case 'tipo':
      selectedTipoComponente.value = ''
      break
  }

  if (
    searchTerm.value == '' &&
    selectedEspecialidad.value == '' &&
    selectedTipoComponente.value == ''
  ) {
    selectedComponent.value = ''
  }
}

const clearAllFilters = () => {
  searchTerm.value = ''
  selectedEspecialidad.value = ''
  selectedTipoComponente.value = ''
  selectedComponent.value = ''
  hasSearched.value = false
}

// Métodos para manejar la selección de componentes
const selectComponent = (component) => {
  selectedComponent.value = component
}

const clearSelection = () => {
  selectedComponent.value = null
}

// Computed para filtrar componentes
const filteredComponents = computed(() => {
  let result = allComponents.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(
      (component) =>
        component.name.toLowerCase().includes(term) ||
        component.category.toLowerCase().includes(term) ||
        component.code.toLowerCase().includes(term),
    )
  }

  if (selectedEspecialidad.value) {
    result = result.filter((component) => component.especialidad === selectedEspecialidad.value)
  }

  if (selectedTipoComponente.value) {
    result = result.filter((component) => component.type === selectedTipoComponente.value)
  }

  return result
})

// Métodos para acordeón
const toggleAccordion = (section) => {
  activeAccordion.value = activeAccordion.value === section ? '' : section
}
</script>

<style scoped>
.accordion-toggle {
  transition: all 0.3s ease;
}

.accordion-content {
  transition: all 0.3s ease;
}

.link-primary {
  color: #3b82f6;
  text-decoration: underline;
}

.link-primary:hover {
  color: #1d4ed8;
}

.dropdown-menu {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn:checked {
  background-color: #545386;
}

.input {
  &::file-selector-button {
    background-color: #545386 !important;
    --input-color: #545386 !important;
  }
}

.modal {
  transition: opacity 0.3s ease;
}

.modal-dialog {
  transition: all 0.3s ease;
}

.component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.active-filter {
  background-color: #d8d2c4;
  color: #333;
}
</style>

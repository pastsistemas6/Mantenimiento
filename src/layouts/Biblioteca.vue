<template>
  <div class="min-h-full">
    <div class="py-2 pr-5 pb-6">
      <div class="shadow rounded-lg p-4 flex flex-col items-center flex-nowrap">
        <div class="w-full mb-6 flex justify-between gap-4 px-4">
          <div class="w-[17%]"></div>
          <h2 class="text-3xl font-bold text-[#545386]">Biblioteca de elementos</h2>
          <button type="button" class="btn w-[17%] bg-[#545386] border-0 shadow-none flex items-center" @click="showModal = true">
            <span class="icon-[mingcute--add-fill] size-4 px-1 py-1"></span>
            Agregar ticket
          </button>

          <div
            v-if="showModal"
            class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full"
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
                <form @submit.prevent="submitForm" class=" overflow-y-auto">
                  <div class="modal-body pt-0 flex flex-col gap-2">
                    <div>
                      <label class="label-text" for="campo"> Elemento solicitado </label>
                      <input type="text" placeholder="Digite el nombre del elemento..." class="input" id="campo" v-model="formData.elemento"/>
                    </div>
                    <div>
                      <label class="label-text" for="description"> Descripción </label>
                      <textarea class="input py-2 h-28" name="description" id="description" placeholder="Describe detalladamente el elemento que necesitas (Tipo, marca y voltaje si se requiere)" v-model="formData.descripcion"></textarea>
                    </div>
                    <div>
                      <label class="label-text" for="images"> Adjunta imágenes alusivas </label>
                      <div class="bg-base-200/60 rounded-box flex flex-col justify-center border-2 border-base-content/20 border-dashed" @dragover.prevent @drop.prevent="handleDrop">
                        <div class="text-center cursor-pointer px-12 py-4" @click="triggerFileInput">
                          <p class="text-base-content/50 mb-3 text-sm">Selecciona imágenes con tamaño máximo de 2MB cada una.</p>
                          <button type="button" class="btn btn-soft btn-sm bg-[#545386] shadow-none text-white text-nowrap">
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
                          <div v-for="(image, index) in selectedImages" :key="index" class="flex items-center justify-between p-2 bg-white rounded-sm border-1 border-accent-content/150">
                            <div class="flex items-center gap-2">
                              <img :src="image.preview" alt="Preview" class="w-9 h-9 object-cover rounded" />
                              <span class="text-sm">{{ image.name }}</span>
                              <span class="text-xs text-gray-500">({{ formatFileSize(image.size) }})</span>
                            </div>
                            <button type="button" @click="removeImage(index)" class="btn shadow-none border-0 px-3 text-red-500 bg-red-200">
                              <span class="icon-[tabler--x] size-4"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-soft btn-secondary shadow-none" @click="showModal = false">Cancelar</button>
                    <button type="submit" class="btn bg-[#545386] shadow-none">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Dropdown personalizado con filtro -->
        <div class="dropdown relative inline-flex items-center max-w-lg mb-4 w-full">

            <input
              v-model="searchTerm"
              @click="toggleDropdown"
              @input="filterItems"
              class="input py-6 ps-8 bg-transparent shadow-none focus:border-0"
              type="text"
              placeholder="Buscar elemento..."
              autocomplete="off"
            />
            <span class="icon-[tabler--search] text-base-content absolute start-3 top-1/2 size-4 shrink-0 -translate-y-1/2"></span>
            <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>

          <ul
            v-show="isDropdownOpen"
            class="dropdown-menu opacity-100 block absolute top-12 right-0 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            role="menu"
          >
            <li v-for="item in filteredItems" :key="item.id">
              <a
                class="dropdown-item px-4 py-2 cursor-pointer block text-sm"
                @click="selectItem(item)"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="flex gap-2 w-4xl" v-if="searchTerm">
          <input class="btn bg-[#D8D2C4] shadow-none border-0" type="radio" name="destination" aria-label="X" @click="reset"/>
          <input class="btn bg-[#D8D2C4] shadow-none border-0" type="radio" name="destination" :aria-label="searchTerm"/>
        </div>

        <!-- Acordeón (se oculta cuando se selecciona un elemento) -->
        <div v-if="!selectedItem" class="accordion accordion-shadow *:accordion-item-active:shadow-md w-full max-w-4xl">
          <div class="accordion-item active shadow" id="payment-shadow">
            <button
              class="accordion-toggle inline-flex items-center gap-x-4 px-5 py-4 w-full"
              @click="toggleAccordion('payment')"
              :aria-expanded="activeAccordion === 'payment'"
            >
              <span v-if="activeAccordion !== 'payment'" class="text-base-content size-4.5 flex items-center">+</span>
              <span v-else class="text-base-content size-4.5 flex items-center">-</span>
              ¿Cómo usar la biblioteca?
            </button>
            <div v-if="activeAccordion === 'payment'" class="accordion-content w-full overflow-hidden transition-[height] duration-300">
              <div class="px-5 pb-4">
                <p class="text-base-content/80 font-normal">
                  Utilice el selector superior para buscar y seleccionar el elemento que necesita. Una vez seleccionado,
                  aparecerá toda la información detallada del elemento y los enlaces para acceder a la documentación completa.
                </p>
              </div>
            </div>
          </div>

          <div class="accordion-item" id="delivery-shadow">
            <button
              class="accordion-toggle inline-flex items-center gap-x-4 px-5 py-4 text-start w-full"
              @click="toggleAccordion('delivery')"
              :aria-expanded="activeAccordion === 'delivery'"
            >
              <span v-if="activeAccordion !== 'delivery'" class="text-base-content size-4.5 flex items-center">+</span>
              <span v-else class="text-base-content size-4.5 flex items-center">-</span>
              ¿Qué tipos de elementos encuentro aquí?
            </button>
            <div v-if="activeAccordion === 'delivery'" class="accordion-content w-full overflow-hidden transition-[height] duration-300">
              <div class="px-5 pb-4">
                <p class="text-base-content/80 font-normal">
                  Encontrará herramientas, equipos de oficina, dispositivos tecnológicos, material educativo y
                  otros elementos de uso común en la organización. Cada elemento incluye especificaciones técnicas
                  y enlaces a documentación detallada.
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
              <span v-if="activeAccordion !== 'access'" class="text-base-content size-4.5 flex items-center">+</span>
              <span v-else class="text-base-content size-4.5 flex items-center">-</span>
              ¿Cómo accedo a la información completa?
            </button>
            <div v-if="activeAccordion === 'access'" class="accordion-content w-full overflow-hidden transition-[height] duration-300">
              <div class="px-5 pb-4">
                <p class="text-base-content/80 font-normal">
                  Después de seleccionar un elemento, encontrará enlaces directos a SmartSheet donde podrá
                  ver toda la información detallada, historial de uso, disponibilidad y documentación técnica completa.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Información del producto seleccionado -->
        <div v-if="selectedItem" class="w-full max-w-4xl shadow-sm mt-5 p-8 rounded-lg">
          <div class="px-4 sm:px-0">
            <h3 class="text-2xl font-semibold text-[#545386]">Información del elemento</h3>
            <p class="mt-1 max-w-full text-base-content/80">{{ selectedItem.description }}</p>
          </div>
          <div class="mt-6 border-t border-base-content/25">
            <dl class="divide-y divide-base-content/25">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Nombre del elemento</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">{{ selectedItem.name }}</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Categoría</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">{{ selectedItem.category }}</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Código</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">{{ selectedItem.code }}</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Especificaciones</dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                  {{ selectedItem.specifications }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                <dt class="font-medium text-base-content">Enlaces</dt>
                <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0">
                  <ul role="list" class="divide-y divide-base-content/25 rounded-md border border-base-content/25">
                    <li v-for="link in selectedItem.links" :key="link.name" class="flex items-center justify-between py-4 ps-4 pe-5">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Estado reactivo
const showModal = ref(false)
const searchTerm = ref('')
const selectedItem = ref(null)
const activeAccordion = ref('payment')
const isDropdownOpen = ref(false)
const selectedImages = ref([])
const fileInput = ref(null)

// Datos del formulario
const formData = ref({
  elemento: '',
  descripcion: ''
})

// Datos del inventario
const inventoryItems = ref([
  {
    id: 1,
    name: 'Laptop Dell Inspiron 15',
    category: 'Tecnología',
    code: 'TECH-001',
    description: 'Laptop para uso administrativo con especificaciones estándar de oficina.',
    specifications: 'Intel Core i5, 8GB RAM, 256GB SSD, Windows 11 Pro, Pantalla 15.6" Full HD',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/laptop-dell-inspiron'
      },
      {
        name: 'Manual de Usuario',
        type: 'PDF',
        url: 'https://example.com/manual-laptop-dell.pdf'
      }
    ]
  },
  {
    id: 2,
    name: 'Proyector Epson PowerLite',
    category: 'Audiovisuales',
    code: 'AV-002',
    description: 'Proyector para presentaciones y reuniones con alta resolución.',
    specifications: '3LCD, 3200 lúmenes, resolución XGA (1024x768), conectividad HDMI/VGA',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/proyector-epson'
      },
      {
        name: 'Guía de Instalación',
        type: 'PDF',
        url: 'https://example.com/guia-proyector-epson.pdf'
      }
    ]
  },
  {
    id: 3,
    name: 'Taladro Inalámbrico Bosch',
    category: 'Herramientas',
    code: 'TOOL-003',
    description: 'Taladro inalámbrico para trabajos de mantenimiento y construcción.',
    specifications: '18V, batería de ion de litio, mandril de 13mm, 2 velocidades, incluye maletín',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/taladro-bosch'
      },
      {
        name: 'Manual de Seguridad',
        type: 'PDF',
        url: 'https://example.com/manual-seguridad-taladro.pdf'
      }
    ]
  },
  {
    id: 4,
    name: 'Impresora HP LaserJet Pro',
    category: 'Oficina',
    code: 'OFF-004',
    description: 'Impresora láser monocromática para documentos oficiales.',
    specifications: 'Impresión láser, 22 ppm, resolución 1200x1200 dpi, conectividad WiFi y Ethernet',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/impresora-hp-laserjet'
      },
      {
        name: 'Guía de Mantenimiento',
        type: 'PDF',
        url: 'https://example.com/mantenimiento-impresora-hp.pdf'
      }
    ]
  },
  {
    id: 5,
    name: 'Microscopio Olympus CX23',
    category: 'Laboratorio',
    code: 'LAB-005',
    description: 'Microscopio óptico para análisis y investigación científica.',
    specifications: 'Objetivos 4x, 10x, 40x, 100x, iluminación LED, oculares 10x, enfoque fino y grueso',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/microscopio-olympus'
      },
      {
        name: 'Manual de Operación',
        type: 'PDF',
        url: 'https://example.com/manual-microscopio-olympus.pdf'
      }
    ]
  },
  {
    id: 6,
    name: 'Cámara Canon EOS Rebel',
    category: 'Fotografía',
    code: 'PHOTO-006',
    description: 'Cámara DSLR para documentación fotográfica y eventos.',
    specifications: '24.1MP, sensor APS-C, video Full HD, pantalla LCD 3", incluye lente 18-55mm',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/camara-canon-eos'
      },
      {
        name: 'Guía Rápida',
        type: 'PDF',
        url: 'https://example.com/guia-camara-canon.pdf'
      }
    ]
  },
  {
    id: 7,
    name: 'Tablet Samsung Galaxy Tab',
    category: 'Tecnología',
    code: 'TECH-007',
    description: 'Tablet para presentaciones móviles y trabajo de campo.',
    specifications: '10.1" Full HD, Android 12, 64GB almacenamiento, WiFi + LTE',
    links: [
      {
        name: 'Información Completa - SmartSheet',
        type: 'SmartSheet',
        url: 'https://app.smartsheet.com/sheets/tablet-samsung'
      },
      {
        name: 'Guía de Configuración',
        type: 'PDF',
        url: 'https://example.com/guia-tablet-samsung.pdf'
      }
    ]
  }
])

// Computed para filtrar elementos
const filteredItems = computed(() => {
  if (!searchTerm.value) return inventoryItems.value

  return inventoryItems.value.filter(item =>
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

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
  files.forEach(file => {
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
        preview: e.target.result
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
    imagenes: selectedImages.value
  })

  // Limpiar formulario
  formData.value.elemento = ''
  formData.value.descripcion = ''
  selectedImages.value = []
  showModal.value = false
}

// Métodos existentes
const filterItems = () => {
  isDropdownOpen.value = true
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectItem = (item) => {
  selectedItem.value = item
  searchTerm.value = item.name
  isDropdownOpen.value = false
}

const reset = () => {
  selectedItem.value = false
  searchTerm.value = null
  isDropdownOpen.value = false
  activeAccordion.value = 'payment'
}

const toggleAccordion = (section) => {
  activeAccordion.value = activeAccordion.value === section ? '' : section
}

// Cerrar dropdown al hacer clic fuera
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.dropdown')
  if (!dropdown) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
</style>

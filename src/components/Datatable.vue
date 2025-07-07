<template>
  <div
    id="datatable-with-export"
    class="bg-base-100 --prevent-on-load-init flex flex-col rounded-md shadow-base-300/20 shadow"
  >
    <div class="w-full pt-4 pb-2 px-5 flex justify-between">
      <h2 class="text-[#545386] font-bold text-2xl">Gestión de plásticos</h2>
      <button
        type="button"
        class="btn bg-[#545386]"
        @click="showModal = true"
      >
        Nuevo registro
      </button>

      <!-- Modal -->
      <div
        v-if="showModal"
        class="overlay modal opacity-100 duration-300 bg-base-content/50 w-full h-full pt-15"
        role="dialog"
        tabindex="-1"
      >
        <div class="modal-dialog opacity-100 duration-300">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Registro de Plásticos</h3>
              <button
                type="button"
                class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                aria-label="Close"
                @click="showModal = false"
              >
                <span class="icon-[tabler--x] size-4"></span>
              </button>
            </div>
            <form @submit.prevent="addNewRecord">
              <div class="modal-body pt-0">
                <div class="mb-4">
                  <label class="label-text" for="tipo">Tipo</label>
                  <input
                    v-model="newRecord.tipo"
                    type="text"
                    placeholder="Tipo de plástico"
                    class="input"
                    id="tipo"
                    required
                  />
                </div>
                <div class="mb-0.5 flex gap-4 max-sm:flex-col">
                  <div class="w-full">
                    <label class="label-text" for="bloque">Bloque</label>
                    <input
                      v-model="newRecord.bloque"
                      type="text"
                      placeholder="Bloque #"
                      class="input"
                      id="bloque"
                      required
                    />
                  </div>
                  <div class="w-full">
                    <label class="label-text" for="cultivo">Tipo de Cultivo</label>
                    <input
                      v-model="newRecord.cultivo"
                      type="text"
                      class="input"
                      id="cultivo"
                      placeholder="Rosas"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-soft" @click="showModal = false">
                  Cancelar
                </button>
                <button type="submit" class="btn bg-[#545386] text-white">
                  Guardar registro
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="border-base-content/25 flex items-center border-b px-5 py-3 gap-3">
      <div class="input input-sm max-w-60">
        <span class="icon-[tabler--search] text-base-content/80 my-auto me-3 size-4 shrink-0"></span>
        <label class="sr-only" for="table-export-search"></label>
        <input
          v-model="searchQuery"
          type="search"
          class="grow"
          placeholder="Buscar registros..."
          id="table-export-search"
          @input="filterData"
        />
      </div>
      <div class="flex flex-1 items-center justify-end gap-3">
        <!-- Select de cantidad de elementos -->
        <select
          v-model="pageLength"
          @change="updatePageLength"
          class="advance-select-toggle advance-select-sm w-12 p-0 pl-0.2 text-center"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>

        <!-- Dropdown de exportación -->
        <div class="dropdown relative inline-flex">
          <button
            type="button"
            class="dropdown-toggle max-sm:btn-square btn bg-white text-base-content/100 border-gray-400 btn-sm shadow-none"
            @click="showExportDropdown = !showExportDropdown"
          >
            <span class="flex items-center gap-3">
              <span class="icon-[tabler--download] size-4"></span>
              <span class="max-sm:hidden">Export</span>
            </span>
            <span class="icon-[tabler--chevron-down] max-sm:hidden size-4"></span>
          </button>
          <div
            v-if="showExportDropdown"
            class="dropdown-menu opacity-100 absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2 z-10"
            role="menu"
          >
            <button type="button" class="dropdown-item" @click="exportData('copy')">
              <span class="icon-[tabler--clipboard-copy] size-3.5 shrink-0"></span>
              Copy
            </button>
            <button type="button" class="dropdown-item" @click="exportData('print')">
              <span class="icon-[tabler--printer] size-3.5 shrink-0"></span>
              Print
            </button>
            <hr class="border-base-content/25 -mx-2 my-3" />
            <button type="button" class="dropdown-item" @click="exportData('excel')">
              <span class="icon-[tabler--file-excel] size-3.5 shrink-0"></span>
              Excel
            </button>
            <button type="button" class="dropdown-item" @click="exportData('csv')">
              <span class="icon-[tabler--file-type-csv] size-3.5 shrink-0"></span>
              CSV
            </button>
            <button type="button" class="dropdown-item" @click="exportData('pdf')">
              <span class="icon-[tabler--file-type-pdf] size-3.5 shrink-0"></span>
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden">
          <table class="table min-w-full">
            <thead>
              <tr>
                <th scope="col" class="--exclude-from-ordering w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      v-model="selectAll"
                      @change="toggleSelectAll"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                    />
                    <label class="sr-only">Checkbox</label>
                  </div>
                </th>
                <th scope="col" class="group w-fit" @click="sortBy('id')">
                  <div class="flex items-center justify-between cursor-pointer">
                    ID
                    <span v-if="sortField === 'id'" class="icon-[tabler--chevron-up]" :class="sortDirection === 'asc' ? 'block' : 'hidden'"></span>
                    <span v-if="sortField === 'id'" class="icon-[tabler--chevron-down]" :class="sortDirection === 'desc' ? 'block' : 'hidden'"></span>
                  </div>
                </th>
                <th scope="col" class="group w-fit" @click="sortBy('tipo')">
                  <div class="flex items-center justify-between cursor-pointer">
                    TIPO
                    <span v-if="sortField === 'tipo'" class="icon-[tabler--chevron-up]" :class="sortDirection === 'asc' ? 'block' : 'hidden'"></span>
                    <span v-if="sortField === 'tipo'" class="icon-[tabler--chevron-down]" :class="sortDirection === 'desc' ? 'block' : 'hidden'"></span>
                  </div>
                </th>
                <th scope="col" class="group w-fit" @click="sortBy('bloque')">
                  <div class="flex items-center justify-between cursor-pointer">
                    BLOQUE
                    <span v-if="sortField === 'bloque'" class="icon-[tabler--chevron-up]" :class="sortDirection === 'asc' ? 'block' : 'hidden'"></span>
                    <span v-if="sortField === 'bloque'" class="icon-[tabler--chevron-down]" :class="sortDirection === 'desc' ? 'block' : 'hidden'"></span>
                  </div>
                </th>
                <th scope="col" class="group w-fit" @click="sortBy('cultivo')">
                  <div class="flex items-center justify-between cursor-pointer">
                    TIPO DE CULTIVO
                    <span v-if="sortField === 'cultivo'" class="icon-[tabler--chevron-up]" :class="sortDirection === 'asc' ? 'block' : 'hidden'"></span>
                    <span v-if="sortField === 'cultivo'" class="icon-[tabler--chevron-down]" :class="sortDirection === 'desc' ? 'block' : 'hidden'"></span>
                  </div>
                </th>
                <th scope="col" class="group w-fit" @click="sortBy('estado')">
                  <div class="flex items-center justify-between cursor-pointer">
                    ESTADO
                    <span v-if="sortField === 'estado'" class="icon-[tabler--chevron-up]" :class="sortDirection === 'asc' ? 'block' : 'hidden'"></span>
                    <span v-if="sortField === 'estado'" class="icon-[tabler--chevron-down]" :class="sortDirection === 'desc' ? 'block' : 'hidden'"></span>
                  </div>
                </th>
                <th scope="col" class="--exclude-from-ordering">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedData" :key="item.id">
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      v-model="selectedRows"
                      :value="item.id"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                    />
                    <label class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>{{ item.id }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.bloque }}</td>
                <td>{{ item.cultivo }}</td>
                <td>
                  <span
                    class="badge badge-soft badge-sm"
                    :class="{
                      'badge-success': item.estado === 'Disponible',
                      'badge-warning': item.estado === 'Limitado',
                      'badge-error': item.estado === 'Agotado'
                    }"
                  >
                    {{ item.estado }}
                  </span>
                </td>
                <td>
                  <button
                    @click="editRecord(item)"
                    class="btn btn-circle btn-text btn-sm"
                    aria-label="Edit"
                  >
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button
                    @click="deleteRecord(item.id)"
                    class="btn btn-circle btn-text btn-sm"
                    aria-label="Delete"
                  >
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="More options">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div class="border-base-content/25 flex items-center justify-between gap-3 border-t p-3 max-md:flex-wrap max-md:justify-center">
      <div class="text-base-content/80 text-sm">
        Mostrando {{ startIndex + 1 }} a {{ Math.min(startIndex + pageLength, filteredData.length) }} de {{ filteredData.length }} registros
      </div>
      <div class="flex items-center space-x-1">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          type="button"
          class="btn btn-text btn-circle btn-sm"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          <span aria-hidden="true">«</span>
          <span class="sr-only">Previous</span>
        </button>

        <div class="flex items-center space-x-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            type="button"
            class="btn btn-text btn-circle btn-sm"
            :class="{ 'bg-[#545386] text-white': page === currentPage }"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          type="button"
          class="btn btn-text btn-circle btn-sm"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        >
          <span class="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Data reactiva
const data = ref([
  { id: 1, tipo: 'Polietileno', bloque: 'Bloque 1', cultivo: 'Rosas', estado: 'Disponible' },
  { id: 2, tipo: 'Polipropileno', bloque: 'Bloque 2', cultivo: 'Hortencias', estado: 'Limitado' },
  { id: 3, tipo: 'PVC', bloque: 'Bloque 3', cultivo: 'Rosas', estado: 'Agotado' },
  { id: 4, tipo: 'Poliestireno', bloque: 'Bloque 4', cultivo: 'Claveles', estado: 'Disponible' },
  { id: 5, tipo: 'ABS', bloque: 'Bloque 5', cultivo: 'Claveles', estado: 'Limitado' },
  { id: 6, tipo: 'Nylon', bloque: 'Bloque 6', cultivo: 'Rosas', estado: 'Disponible' },
  { id: 7, tipo: 'Policarbonato', bloque: 'Bloque 7', cultivo: 'Claveles', estado: 'Agotado' },
  { id: 8, tipo: 'PETG', bloque: 'Bloque 8', cultivo: 'Hortencias', estado: 'Limitado' },
  { id: 9, tipo: 'TPU', bloque: 'Bloque 9', cultivo: 'Hortencias', estado: 'Disponible' },
  { id: 10, tipo: 'HDPE', bloque: 'Bloque 10', cultivo: 'Rosas', estado: 'Agotado' },
  { id: 11, tipo: 'LDPE', bloque: 'Bloque 1', cultivo: 'Rosas', estado: 'Disponible' },
  { id: 12, tipo: 'PP-R', bloque: 'Bloque 1', cultivo: 'Rosas', estado: 'Limitado' },
  { id: 13, tipo: 'PE-X', bloque: 'Bloque 1', cultivo: 'Rosas', estado: 'Disponible' },
  { id: 14, tipo: 'POM', bloque: 'Bloque 1', cultivo: 'Rosas', estado: 'Limitado' },
  { id: 15, tipo: 'PA6', bloque: 'Bloque 1', cultivo: 'Rosas', estado: 'Disponible' },
])

// Estados del componente
const showModal = ref(false)
const showExportDropdown = ref(false)
const searchQuery = ref('')
const sortField = ref('id')
const sortDirection = ref('asc')
const pageLength = ref(5)
const currentPage = ref(1)
const selectAll = ref(false)
const selectedRows = ref([])

// Nuevo registro
const newRecord = ref({
  tipo: '',
  bloque: '',
  cultivo: '',
  estado: 'Disponible'
})

// Computed properties
const filteredData = computed(() => {
  if (!searchQuery.value) return sortedData.value

  return sortedData.value.filter(item =>
    item.tipo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.bloque.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.cultivo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.estado.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const sortedData = computed(() => {
  const sorted = [...data.value].sort((a, b) => {
    let aVal = a[sortField.value]
    let bVal = b[sortField.value]

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }

    if (sortDirection.value === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    }
  })

  return sorted
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / pageLength.value)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * pageLength.value
})

const paginatedData = computed(() => {
  const start = startIndex.value
  const end = start + pageLength.value
  return filteredData.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const total = totalPages.value

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
    const end = Math.min(total, start + maxVisible - 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

// Methods
const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}

const filterData = () => {
  currentPage.value = 1
}

const updatePageLength = () => {
  currentPage.value = 1
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedRows.value = paginatedData.value.map(item => item.id)
  } else {
    selectedRows.value = []
  }
}

const addNewRecord = () => {
  const newId = Math.max(...data.value.map(item => item.id)) + 1

  data.value.push({
    id: newId,
    tipo: newRecord.value.tipo,
    bloque: newRecord.value.bloque,
    cultivo: newRecord.value.cultivo,
    estado: newRecord.value.estado
  })

  // Reset form
  newRecord.value = {
    tipo: '',
    bloque: '',
    cultivo: '',
    estado: 'Disponible'
  }

  showModal.value = false
}

const editRecord = (item) => {
  // Aquí puedes implementar la lógica para editar
  console.log('Editar:', item)
}

const deleteRecord = (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
    data.value = data.value.filter(item => item.id !== id)
  }
}

const exportData = (format) => {
  const exportableData = selectedRows.value.length > 0
    ? data.value.filter(item => selectedRows.value.includes(item.id))
    : filteredData.value

  switch (format) {
    case 'copy':
      const copyText = exportableData.map(item =>
        `${item.id}\t${item.tipo}\t${item.bloque}\t${item.cultivo}\t${item.estado}`
      ).join('\n')
      navigator.clipboard.writeText(copyText)
      alert('Datos copiados al portapapeles')
      break

    case 'csv':
      const csvContent = [
        'ID,Tipo,Bloque,Cultivo,Estado',
        ...exportableData.map(item =>
          `${item.id},"${item.tipo}","${item.bloque}","${item.cultivo}","${item.estado}"`
        )
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'plasticos.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      break

    case 'excel':
      // Crear contenido HTML para Excel
      const excelContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
          <head>
            <!--[if gte mso 9]>
            <xml>
              <x:ExcelWorkbook>
                <x:ExcelWorksheets>
                  <x:ExcelWorksheet>
                    <x:Name>Plásticos</x:Name>
                    <x:WorksheetOptions>
                      <x:DisplayGridlines/>
                    </x:WorksheetOptions>
                  </x:ExcelWorksheet>
                </x:ExcelWorksheets>
              </x:ExcelWorkbook>
            </xml>
            <![endif]-->
            <meta charset="UTF-8">
          </head>
          <body>
            <table>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Bloque</th>
                <th>Cultivo</th>
                <th>Estado</th>
              </tr>
              ${exportableData.map(item => `
                <tr>
                  <td>${item.id}</td>
                  <td>${item.tipo}</td>
                  <td>${item.bloque}</td>
                  <td>${item.cultivo}</td>
                  <td>${item.estado}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `

      // Crear blob y descargar
      const excelBlob = new Blob([excelContent], { type: 'application/vnd.ms-excel' })
      const excelLink = document.createElement('a')
      const excelUrl = URL.createObjectURL(excelBlob)
      excelLink.setAttribute('href', excelUrl)
      excelLink.setAttribute('download', 'plasticos.xls')
      document.body.appendChild(excelLink)
      excelLink.click()
      document.body.removeChild(excelLink)
      break

    case 'pdf':
    // Usaremos jsPDF para generar el PDF directamente sin html2canvas
    import('jspdf').then((jsPDFModule) => {
      const { jsPDF } = jsPDFModule;

      // Crear un nuevo documento PDF
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Configuración del documento
      const margin = 40;
      const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      let yPos = margin;

      // Título del documento
      pdf.setFontSize(18);
      pdf.text('Gestión de Plásticos', margin, yPos);
      yPos += 30;

      // Encabezados de la tabla
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');

      // Definir columnas
      const headers = [
        { header: 'ID', width: 40 },
        { header: 'Tipo', width: 100 },
        { header: 'Bloque', width: 80 },
        { header: 'Cultivo', width: 100 },
        { header: 'Estado', width: 80 }
      ];

      // Dibujar encabezados
      let xPos = margin;
      headers.forEach(col => {
        pdf.text(col.header, xPos, yPos);
        xPos += col.width;
      });
      yPos += 20;

      // Contenido de la tabla
      pdf.setFont(undefined, 'normal');
      exportableData.forEach(item => {
        // Verificar si necesitamos una nueva página
        if (yPos > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          yPos = margin;
        }

        xPos = margin;
        pdf.text(item.id.toString(), xPos, yPos);
        xPos += headers[0].width;

        pdf.text(item.tipo, xPos, yPos);
        xPos += headers[1].width;

        pdf.text(item.bloque, xPos, yPos);
        xPos += headers[2].width;

        pdf.text(item.cultivo, xPos, yPos);
        xPos += headers[3].width;

        pdf.text(item.estado, xPos, yPos);

        yPos += 20;
      });

      // Guardar el PDF
      pdf.save('plasticos.pdf');
    }).catch(err => {
      console.error('Error al generar PDF:', err);
      alert('Error al generar el PDF. Inténtalo de nuevo.');
    });
    break;

    case 'print':
      const printContent = `
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Bloque</th>
              <th>Cultivo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${exportableData.map(item =>
              `<tr>
                <td>${item.id}</td>
                <td>${item.tipo}</td>
                <td>${item.bloque}</td>
                <td>${item.cultivo}</td>
                <td>${item.estado}</td>
              </tr>`
            ).join('')}
          </tbody>
        </table>
      `

      const printWindow = window.open('', '', 'height=600,width=800')
      printWindow.document.write(`
        <html>
          <head>
            <title>Gestión de Plásticos</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Gestión de Plásticos</h1>
            ${printContent}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
      break

    default:
      alert(`Exportación en formato ${format} no implementada`)
  }

  showExportDropdown.value = false
}

// Cerrar dropdown cuando se hace clic fuera
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      showExportDropdown.value = false
    }
  })
})
</script>

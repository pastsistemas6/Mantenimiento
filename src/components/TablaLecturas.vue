<template>
  <div
    id="datatable-filter"
    class="bg-base-100 --prevent-on-load-init flex flex-col rounded-lg shadow-base-300/20 shadow"
    data-datatable='{
  "pageLength": 5,
  "pagingOptions": {
    "pageBtnClasses": "btn btn-text btn-circle btn-sm"
  },
  "selecting": true,
  "rowSelectingOptions": {
    "selectAllSelector": "#datatable-filter-select-all-rows",
    "individualSelector": ".datatable-filter-select-row"
  },
  "language": {
      "zeroRecords": "<div class=\"py-10 px-5 flex flex-col justify-center items-center text-center\"><span class=\"icon-[tabler--search] shrink-0 size-6 text-base-content\"></span><div class=\"max-w-sm mx-auto\"><p class=\"mt-2 text-sm text-base-content/80\">No search results</p></div></div>"
    }
}'
  >
    <h2 class="w-full text-2xl text-[#545386] font-bold pt-4 pl-4 pb-3">Gestión de lecturas</h2>

    <div class="border-base-content/25 flex items-center border-b px-5 py-3 gap-3">
      <div class="input input-sm max-w-60">
        <span
          class="icon-[tabler--search] text-base-content/80 my-auto me-3 size-4 shrink-0"
        ></span>
        <label class="sr-only" for="filter-search"></label>
        <input
          type="search"
          class="grow"
          placeholder="Search for items"
          id="filter-search"
          data-datatable-search=""
        />
      </div>
      <div class="flex flex-1 items-center justify-end gap-3">
        <!-- Select -->
        <select
          data-select='{
          "placeholder": "Select option...",
          "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
          "toggleClasses": "advance-select-toggle advance-select-sm",
          "dropdownClasses": "advance-select-menu w-24 max-sm:w-16",
          "optionClasses": "advance-select-option selected:select-active",
          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"icon-[tabler--check] shrink-0 size-3 text-primary hidden selected:block \"></span></div>",
          "extraMarkup": "<span class=\"icon-[tabler--caret-up-down] shrink-0 size-4 text-base-content absolute top-1/2 end-2 -translate-y-1/2 \"></span>"
          }'
          class="hidden"
          data-datatable-page-entities=""
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        <!-- End Select -->
        <select
          data-select='{
          "placeholder": "Select option...",
          "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
          "toggleClasses": "advance-select-toggle advance-select-sm max-sm:w-20 w-36",
          "dropdownClasses": "advance-select-menu max-sm:w-28 w-full",
          "optionClasses": "advance-select-option selected:select-active",
          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"icon-[tabler--check] shrink-0 size-3 text-primary hidden selected:block \"></span></div>",
          "extraMarkup": "<span class=\"icon-[tabler--caret-up-down] shrink-0 size-4 text-base-content absolute top-1/2 end-2 -translate-y-1/2 \"></span>"
          }'
          class="hidden"
          id="select-stock"
        >
          <option value="all">PREDIOS</option>
          <option value="EMGESA">EMGESA</option>
          <option value="RUITOQUE">RUITOQUE</option>
          <option value="CODENSA">CODENSA</option>
        </select>
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
                      id="datatable-filter-select-all-rows"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                    />
                    <label for="datatable-filter-select-all-rows" class="sr-only">Checkbox</label>
                  </div>
                </th>
                <th scope="col" class="group w-fit">
                  <div class="flex items-center justify-between">
                    CUENTA
                    <span
                      class="icon-[tabler--chevron-up] datatable-ordering-asc:block hidden"
                    ></span>
                    <span
                      class="icon-[tabler--chevron-down] datatable-ordering-desc:block hidden"
                    ></span>
                  </div>
                </th>
                <th scope="col" class="group w-fit">
                  <div class="flex items-center justify-between">
                    LECTURA ACTUAL
                    <span
                      class="icon-[tabler--chevron-up] datatable-ordering-asc:block hidden"
                    ></span>
                    <span
                      class="icon-[tabler--chevron-down] datatable-ordering-desc:block hidden"
                    ></span>
                  </div>
                </th>
                <th scope="col" class="group w-fit">
                  <div class="flex items-center justify-between">
                    FECHA ACTUAL
                    <span
                      class="icon-[tabler--chevron-up] datatable-ordering-asc:block hidden"
                    ></span>
                    <span
                      class="icon-[tabler--chevron-down] datatable-ordering-desc:block hidden"
                    ></span>
                  </div>
                </th>
                <th scope="col" class="--exclude-from-ordering">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-1"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-1" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>EMGESA</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-2"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-2" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>EMGESA</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-3"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-3" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>RUITOQUE</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-4"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-4" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>CODENSA</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-5"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-5" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>EMGESA</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-6"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-6" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>CODENSA</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-7"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-7" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>CODENSA</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-8"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-8" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>RUITOQUE</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-9"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-9" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>RUITOQUE</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-10"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-10" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>EMGESA</td>
                <td>22,640</td>
                <td>25/06/2025</td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      class="border-base-content/25 flex items-center justify-between gap-3 border-t p-3 max-md:flex-wrap max-md:justify-center"
    >
      <div class="text-base-content/80 text-sm" data-datatable-info="">
        Showing
        <span data-datatable-info-from="1"></span>
        to
        <span data-datatable-info-to="30"></span>
        of
        <span data-datatable-info-length="50"></span>
        products
      </div>
      <div class="flex items-center space-x-1" data-datatable-paging="">
        <button type="button" class="btn btn-text btn-circle btn-sm" data-datatable-paging-prev="">
          <span aria-hidden="true">«</span>
          <span class="sr-only">Previous</span>
        </button>
        <div
          class="[&>.active]:text-bg-soft-primary flex items-center space-x-1"
          data-datatable-paging-pages=""
        ></div>
        <button type="button" class="btn btn-text btn-circle btn-sm" data-datatable-paging-next="">
          <span class="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  const available = document.querySelector('#select-stock')
  const dataTable = $('#datatable-filter table').DataTable({
    pageLength: 5,
  })

  dataTable.search.fixed('stock', (searchStr, data, index) => {
    const isAvaiable = available.value === 'all' ? '' : available.value
    const parser = new DOMParser()
    const name = parser.parseFromString(data[1], 'text/html').body.textContent.trim()

    return isAvaiable === name || isAvaiable === ''
  })
  available.addEventListener('change', () => dataTable.draw())

  const searchInput = document.querySelector('[data-datatable-search]')
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      dataTable.search(this.value).draw()
    })
  }

  // Conectar el select de cantidad de elementos
  const pageLengthSelect = document.querySelector('[data-datatable-page-entities]')
  if (pageLengthSelect) {
    pageLengthSelect.addEventListener('change', function () {
      dataTable.page.len(this.value).draw()
    })
  }
})
</script>

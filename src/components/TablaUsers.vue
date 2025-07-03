<template>
  <div
    id="datatable-filter"
    class="bg-base-100 --prevent-on-load-init flex flex-col rounded-md shadow-base-300/20 shadow-sm"
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
    <div class="border-base-content/25 flex items-center border-b px-5 py-3 gap-3">
      <div class="input input-sm max-w-60">
        <span
          class="icon-[tabler--search] text-base-content/80 my-auto me-3 size-4 shrink-0"
        ></span>
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
          "toggleClasses": "advance-select-toggle advance-select-sm max-sm:w-20 w-36",
          "dropdownClasses": "advance-select-menu max-sm:w-28 w-full",
          "optionClasses": "advance-select-option selected:select-active",
          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"icon-[tabler--check] shrink-0 size-3 text-primary hidden selected:block \"></span></div>",
          "extraMarkup": "<span class=\"icon-[tabler--caret-up-down] shrink-0 size-4 text-base-content absolute top-1/2 end-2 -translate-y-1/2 \"></span>"
          }'
          class="hidden"
          id="select-stock"
        >
          <option value="all">Todos los estados</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Limited">Limited</option>
        </select>
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
          <option value="all">Todos los roles</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Limited">Limited</option>
        </select>
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
          <option value="all">Todas las ubicaciones</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Limited">Limited</option>
        </select>
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
          <option value="5" selected="">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
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
                    ID
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
                    Fecha
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
                    Tipo de plástico
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
                    Bloque
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
                    Tipo de mantenimiento
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
                    Responsable
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
                    Costo
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
                    Estado
                    <span
                      class="icon-[tabler--chevron-up] datatable-ordering-asc:block hidden"
                    ></span>
                    <span
                      class="icon-[tabler--chevron-down] datatable-ordering-desc:block hidden"
                    ></span>
                  </div>
                </th>
                <th scope="col" class="--exclude-from-ordering">Acciones</th>
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
                <td>1</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 1</td>
                <td>Apple iPhone 15</td>
                <td>Carlos Méndez</td>
                <td>$999</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>2</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 2</td>
                <td>Samsung Galaxy S23</td>
                <td>Carlos Méndez</td>
                <td>$899</td>
                <td><span class="badge badge-soft badge-warning badge-sm">Limited</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>3</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 3</td>
                <td>Sony WH-1000XM5</td>
                <td>Carlos Méndez</td>
                <td>$399</td>
                <td><span class="badge badge-soft badge-error badge-sm">Out of Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>4</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 4</td>
                <td>Dell XPS 15</td>
                <td>Carlos Méndez</td>
                <td>$1,299</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>5</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 5</td>
                <td>Logitech MX Master 3</td>
                <td>Carlos Méndez</td>
                <td>$99</td>
                <td><span class="badge badge-soft badge-warning badge-sm">Limited</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>6</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 6</td>
                <td>Microsoft Surface Laptop 5</td>
                <td>Carlos Méndez</td>
                <td>$1,499</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>7</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 7</td>
                <td>HP Spectre x360</td>
                <td>Carlos Méndez</td>
                <td>$1,199</td>
                <td><span class="badge badge-soft badge-error badge-sm">Out of Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>8</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 8</td>
                <td>Apple Watch Series 9</td>
                <td>Carlos Méndez</td>
                <td>$499</td>
                <td><span class="badge badge-soft badge-warning badge-sm">Limited</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>9</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 9</td>
                <td>Google Pixel 7</td>
                <td>Carlos Méndez</td>
                <td>$599</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
                <td>10</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 10</td>
                <td>Bose QuietComfort Earbuds II</td>
                <td>Carlos Méndez</td>
                <td>$279</td>
                <td><span class="badge badge-soft badge-error badge-sm">Out of Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-11"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-11" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>11</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 11</td>
                <td>Asus ROG Zephyrus G14</td>
                <td>Carlos Méndez</td>
                <td>$1,899</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-12"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-12" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>12</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 12</td>
                <td>Sony PlayStation 5</td>
                <td>Carlos Méndez</td>
                <td>$499</td>
                <td><span class="badge badge-soft badge-warning badge-sm">Limited</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-13"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-13" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>13</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 13</td>
                <td>Amazon Echo Dot (5th Gen)</td>
                <td>Carlos Méndez</td>
                <td>$49</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-14"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-14" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>14</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 14</td>
                <td>NVIDIA GeForce RTX 4090</td>
                <td>Carlos Méndez</td>
                <td>$1,599</td>
                <td><span class="badge badge-soft badge-warning badge-sm">Limited</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-15"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-15" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>15</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 15</td>
                <td>Lenovo ThinkPad X1 Carbon</td>
                <td>Carlos Méndez</td>
                <td>$1,799</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-16"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-16" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>16</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 16</td>
                <td>Google Nest Hub (2nd Gen)</td>
                <td>Carlos Méndez</td>
                <td>$99</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-17"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-17" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>17</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 17</td>
                <td>Fitbit Charge 6</td>
                <td>Carlos Méndez</td>
                <td>$149</td>
                <td><span class="badge badge-soft badge-warning badge-sm">Limited</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-18"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-18" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>18</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 18</td>
                <td>Razer Blade 16</td>
                <td>Carlos Méndez</td>
                <td>$2,499</td>
                <td><span class="badge badge-soft badge-error badge-sm">Out of Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-19"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-19" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>19</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 19</td>
                <td>Oculus Quest 3</td>
                <td>Carlos Méndez</td>
                <td>$499</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-20"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-20" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>20</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 20</td>
                <td>Canon EOS R8</td>
                <td>Carlos Méndez</td>
                <td>$1,699</td>
                <td><span class="badge badge-soft badge-warning badge-sm">Limited</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-21"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-21" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>21</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 21</td>
                <td>DJI Mavic 3 Pro</td>
                <td>Carlos Méndez</td>
                <td>$2,199</td>
                <td><span class="badge badge-soft badge-success badge-sm">In Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-22"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-22" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>22</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 22</td>
                <td>Alienware Aurora R15</td>
                <td>Carlos Méndez</td>
                <td>$2,899</td>
                <td><span class="badge badge-soft badge-error badge-sm">Out of Stock</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="table-filter-23"
                      type="checkbox"
                      class="checkbox checkbox-sm datatable-filter-select-row"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="table-filter-23" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>23</td>
                <td>28/05/2023</td>
                <td>Polietileno</td>
                <td>Bloque 23</td>
                <td>SteelSeries Arctis Nova Pro</td>
                <td>Carlos Méndez</td>
                <td>$349</td>
                <td><span class="badge badge-soft badge-warning badge-sm">Limited</span></td>
                <td>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button class="btn btn-circle btn-text btn-sm" aria-label="Action button">
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
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
      <div class="text-base-content/80 text-sm" data-datatable-page-entities="">
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
  // 1. Mostrar los selects (eliminar la clase 'hidden')
  document.querySelectorAll('select.hidden').forEach((select) => {
    select.classList.remove('hidden')
  })

  // 2. Inicializar los selects personalizados (si usas una librería como Choices.js o similar)
  // Ejemplo genérico (ajusta según tu implementación real):
  const selects = document.querySelectorAll('[data-select]')
  selects.forEach((select) => {
    // Aquí iría tu lógica para inicializar el select personalizado
    // Por ejemplo, si usas Choices.js:
    // new Choices(select, JSON.parse(select.dataset.select));
    console.log('Inicializando select:', select.id)
  })

  // 3. Inicializar DataTables
  const available = document.querySelector('#select-stock')
  const dataTable = $('#datatable-filter table').DataTable({
    pageLength: 5,
  })

  // Configurar la búsqueda personalizada
  dataTable.search.fixed('stock', (searchStr, data, index) => {
    const isAvaiable = available.value === 'all' ? '' : available.value
    const parser = new DOMParser()
    const name = parser.parseFromString(data[8], 'text/html').body.textContent.trim()
    return isAvaiable === name || isAvaiable === ''
  })

  // Configurar eventos
  const searchInput = document.querySelector('[data-datatable-search]')
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      dataTable.search(this.value).draw()
    })
  }

  const pageLengthSelect = document.querySelector('[data-datatable-page-entities]')
  if (pageLengthSelect) {
    pageLengthSelect.addEventListener('change', function () {
      dataTable.page.len(this.value).draw()
    })
  }

  available.addEventListener('change', () => dataTable.draw())
})
</script>

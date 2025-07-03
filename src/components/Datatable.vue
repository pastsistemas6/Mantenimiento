<template>
  <div
    id="datatable-with-export"
    class="bg-base-100 --prevent-on-load-init flex flex-col rounded-md shadow-base-300/20 shadow-sm"
    data-datatable='{
    "pageLength": 5,
    "pagingOptions": {
      "pageBtnClasses": "btn btn-text btn-circle btn-sm"
    },
    "colReorder": true,
    "selecting": true,
    "rowSelectingOptions": {
      "selectAllSelector": "#export-select-all-rows"
    },
    "language": {
      "zeroRecords": "<div class=\"py-10 px-5 flex flex-col justify-center items-center text-center\"><span class=\"icon-[tabler--search] shrink-0 size-6 text-base-content\"></span><div class=\"max-w-sm mx-auto\"><p class=\"mt-2 text-sm text-base-content/80\">No search results</p></div></div>"
    },
    "layout": {
      "topStart": {
        "buttons": ["copy", "csv", "excel", "pdf", "print"]
      }
    }
  }'
  >
    <div class="w-full pt-4 pb-2 px-5 flex justify-between">
      <h2 class="text-[#545386] font-bold text-2xl">Gestión de plásticos</h2>
      <button
        type="button"
        class="btn btn-primary"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="form-modal"
        data-overlay="#form-modal"
      >
        Nuevo registro
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
              <h3 class="modal-title">Registro de Plásticos</h3>
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
                <div class="mb-4">
                  <label class="label-text" for="fullName"> Tipo </label>
                  <input type="text" placeholder="John Doe" class="input" id="fullName" />
                </div>
                <div class="mb-0.5 flex gap-4 max-sm:flex-col">
                  <div class="w-full">
                    <label class="label-text" for="email"> Bloque </label>
                    <input type="text" placeholder="Bloque #" class="input" id="email" />
                  </div>
                  <div class="w-full">
                    <label class="label-text" for="dateOfBirth"> Tipo de Cultivo </label>
                    <input type="text" class="input" id="dateOfBirth" placeholder="Rosas" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-soft" data-overlay="#form-modal">
                  Cancelar
                </button>
                <button type="submit" class="btn bg-[#545386]">Guardar registro</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="border-base-content/25 flex items-center border-b px-5 py-3 gap-3">
      <div class="input input-sm max-w-60">
        <span
          class="icon-[tabler--search] text-base-content/80 my-auto me-3 size-4 shrink-0"
        ></span>
        <label class="sr-only" for="table-export-search"></label>
        <input
          type="search"
          class="grow"
          placeholder="Search for items"
          id="table-export-search"
          data-datatable-search=""
        />
      </div>
      <div class="flex flex-1 items-center justify-end gap-3">
        <!-- Select -->
        <select
          data-select='{
          "placeholder": "Select option...",
          "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span data-title></span></button>",
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
        <!-- End Select -->
        <div id="dropdown-datatable-with-export" class="dropdown relative inline-flex">
          <button
            id="datatable-export-dropdown"
            type="button"
            class="dropdown-toggle max-sm:btn-square btn btn-soft btn-sm"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            <span class="flex items-center gap-3">
              <span class="icon-[tabler--download] size-4"></span>
              <span class="max-sm:hidden">Export</span>
            </span>
            <span
              class="icon-[tabler--chevron-down] max-sm:hidden dropdown-open:rotate-180 size-4"
            ></span>
          </button>
          <div
            class="dropdown-menu dropdown-open:opacity-100 hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="datatable-export-dropdown"
          >
            <button type="button" class="dropdown-item" data-datatable-action-type="copy">
              <span class="icon-[tabler--clipboard-copy] size-3.5 shrink-0"></span>
              Copy
            </button>
            <button type="button" class="dropdown-item" data-datatable-action-type="print">
              <span class="icon-[tabler--printer] size-3.5 shrink-0"></span>
              Print
            </button>
            <hr class="border-base-content/25 -mx-2 my-3" />
            <button type="button" class="dropdown-item" data-datatable-action-type="excel">
              <span class="icon-[tabler--file-excel] size-3.5 shrink-0"></span>
              Excel
            </button>
            <button type="button" class="dropdown-item" data-datatable-action-type="csv">
              <span class="icon-[tabler--file-type-csv] size-3.5 shrink-0"></span>
              CSV
            </button>
            <button type="button" class="dropdown-item" data-datatable-action-type="pdf">
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
                      id="export-select-all-rows"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                    />
                    <label for="export-select-all-rows" class="sr-only">Checkbox</label>
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
                    TIPO
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
                    BLOQUE
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
                    TIPO DE CULTIVO
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
                    ESTADO
                    <span
                      class="icon-[tabler--chevron-up] datatable-ordering-asc:block hidden"
                    ></span>
                    <span
                      class="icon-[tabler--chevron-down] datatable-ordering-desc:block hidden"
                    ></span>
                  </div>
                </th>
                <th scope="col" class="--exclude-from-ordering">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="w-3.5 pe-0">
                  <div class="flex h-5 items-center">
                    <input
                      id="datatable-with-export-1"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-1" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>1</td>
                <td>Apple iPhone 15</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-2"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-2" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>2</td>
                <td>Samsung Galaxy S23</td>
                <td>Bloque 2</td>
                <td>Hortencias</td>
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
                      id="datatable-with-export-3"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-3" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>3</td>
                <td>Sony WH-1000XM5</td>
                <td>Bloque 3</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-4"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-4" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>4</td>
                <td>Dell XPS 15</td>
                <td>Bloque 4</td>
                <td>Claveles</td>
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
                      id="datatable-with-export-5"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-5" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>5</td>
                <td>Logitech MX Master 3</td>
                <td>Bloque 5</td>
                <td>Claveles</td>
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
                      id="datatable-with-export-6"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-6" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>6</td>
                <td>Microsoft Surface Laptop 5</td>
                <td>Bloque 6</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-7"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-7" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>7</td>
                <td>HP Spectre x360</td>
                <td>Bloque 7</td>
                <td>Claveles</td>
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
                      id="datatable-with-export-8"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-8" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>8</td>
                <td>Apple Watch Series 9</td>
                <td>Bloque 8</td>
                <td>Hortencias</td>
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
                      id="datatable-with-export-9"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-9" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>9</td>
                <td>Google Pixel 7</td>
                <td>Bloque 9</td>
                <td>Hortencias</td>
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
                      id="datatable-with-export-10"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-10" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>10</td>
                <td>Bose QuietComfort Earbuds II</td>
                <td>Bloque 10</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-11"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-11" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>11</td>
                <td>Asus ROG Zephyrus G14</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-12"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-12" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>12</td>
                <td>Sony PlayStation 5</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-13"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-13" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>13</td>
                <td>Amazon Echo Dot (5th Gen)</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-14"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-14" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>14</td>
                <td>NVIDIA GeForce RTX 4090</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-15"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-15" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>15</td>
                <td>Lenovo ThinkPad X1 Carbon</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-16"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-16" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>16</td>
                <td>Google Nest Hub (2nd Gen)</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-17"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-17" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>17</td>
                <td>Fitbit Charge 6</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-18"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-18" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>18</td>
                <td>Razer Blade 16</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-19"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-19" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>19</td>
                <td>Oculus Quest 3</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-20"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-20" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>20</td>
                <td>Canon EOS R8</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-21"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-21" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>21</td>
                <td>DJI Mavic 3 Pro</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-22"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-22" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>22</td>
                <td>Alienware Aurora R15</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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
                      id="datatable-with-export-23"
                      type="checkbox"
                      class="checkbox checkbox-sm"
                      data-datatable-row-selecting-individual=""
                    />
                    <label for="datatable-with-export-23" class="sr-only">Checkbox</label>
                  </div>
                </td>
                <td>23</td>
                <td>SteelSeries Arctis Nova Pro</td>
                <td>Bloque 1</td>
                <td>Rosas</td>
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

  const searchInput = document.querySelector('#table-export-search')
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

<template>
  <div class="cont w-full flex justify-between flex-wrap gap-2.5 shadow rounded-lg p-4">
    <h2 class="text-2xl text-[#564D87] font-bold">Mapa de ubicaciones</h2>
    <button type="button" class="bg-[#C2DFEA] text-black px-5 py-2 rounded-md">
      Actualizar vista
    </button>

    <div
      class="card flex flex-col h-140 w-full shadow-none rounded-md sm:card-side max-w-sm sm:max-w-full"
    >
      <figure class="rounded-md w-[70%]">
        <img
          src="https://cdn.flyonui.com/fy-assets/components/card/image-7.png"
          alt="headphone"
          class="rounded-md"
        />
      </figure>
      <div class="card-body w-[30%]">
        <h5 class="card-title mb-2 font-semibold text-black">Leyenda</h5>
        <div class="flex items-center gap-1">
          <input type="checkbox" class="checkbox checkbox-success" id="checkboxSuccess" checked />
          <label class="label-text text-base" for="checkboxSuccess"> Plásticos activos </label>
        </div>
        <div class="flex items-center gap-1">
          <input type="checkbox" class="checkbox checkbox-warning" id="checkboxWarning" checked />
          <label class="label-text text-base" for="checkboxWarning"> En mantenimiento </label>
        </div>
        <div class="flex items-center gap-1">
          <input type="checkbox" class="checkbox checkbox-error" id="checkboxError" checked />
          <label class="label-text text-base" for="checkboxError"> Necesita atención </label>
        </div>
        <div class="card-actions mt-auto">
          <RouterLink to="dashboard-plasticos" class="btn bg-[#545386] px-1"
            >Ver historial de mantenimiento</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 100%;
}
</style>

<template>
  <div class="min-h-full">
    <div class="py-2 pr-5 pb-6">
      <div class="flex flex-col gap-4 shadow p-4 rounded-lg">
        <h2 class="text-3xl font-bold text-[#545386] mb-3">Acerca de</h2>
        <div class="w-full flex flex-col justify-center items-center gap-4 mb-4">
          <h3 class="font-semibold text-xl text-[#545386] shadow-sm rounded-lg p-2 px-4">
            Área de mantenimiento
          </h3>
          <div class="flex h-100 justify-start">
            <img class="w-full" src="../assets/image.png" alt="organigrama" />
          </div>
        </div>
        <div class="w-full flex flex-col justify-center items-center gap-8">
          <h3 class="font-semibold text-xl text-[#545386] shadow-sm rounded-lg p-2 px-4">
            Soporte electrico y automatización
          </h3>
          <img src="../components/Icons/dashboard-morado-32px-03.svg" alt="" class="w-20" />
          <div class="w-full flex justify-evenly items-center">
            <div class="card w-md">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Sobre nosotros</h5>
              </div>
              <div class="card-body">
                <p>
                  Discover the unique benefits and features we offer. Dive deeper to learn how our
                  solutions can enhance your experience and meet your needs effectively.
                </p>
              </div>
            </div>
            <div class="card w-md">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Proposito</h5>
              </div>
              <div class="card-body">
                <p>
                  Discover the unique benefits and features we offer. Dive deeper to learn how our
                  solutions can enhance your experience and meet your needs effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
p {
  flex-grow: 0;
}
</style>

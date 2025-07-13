<template>
  <div class="min-h-full">
    <div class="py-2 pr-5 pb-6">
      <div class="flex flex-col gap-6 shadow p-4 rounded-lg">
        <h2 class="text-3xl font-bold text-[#545386] mb-3">Acerca de</h2>

        <!-- Sección Hero -->
        <div class="w-full flex flex-col justify-center items-center gap-4 mb-6">
          <h3 class="font-semibold text-xl text-[#545386]">
            Área de Mantenimiento Eléctrico y Automatización
          </h3>
          <div class="flex h-100 justify-start">
            <img class="w-full rounded-lg shadow-md" src="../assets/image.png" alt="organigrama" />
          </div>
        </div>

        <!-- Sección Sobre Nosotros y Propósito -->
        <div class="w-full flex flex-col justify-center items-center gap-8">
          <div class="w-full flex justify-evenly items-stretch gap-4">
            <div class="card w-md">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Sobre Nosotros</h5>
              </div>
              <div class="card-body">
                <p>
                  Somos un equipo especializado en el mantenimiento preventivo y correctivo de sistemas eléctricos
                  e industriales. Con más de 15 años de experiencia, garantizamos la continuidad operativa de los
                  equipos críticos de la organización mediante tecnologías avanzadas y personal altamente capacitado.
                </p>
              </div>
            </div>
            <div class="card w-md">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Propósito</h5>
              </div>
              <div class="card-body">
                <p>
                  Asegurar la disponibilidad y confiabilidad de los sistemas eléctricos y de automatización,
                  minimizando tiempos de inactividad y optimizando el rendimiento operativo. Contribuimos al
                  desarrollo sostenible mediante prácticas de mantenimiento eficientes y responsables.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Nuestros Servicios -->
        <div class="w-full flex flex-col gap-6">
          <h3 class="font-semibold text-xl text-[#545386] text-center">
            Nuestros Servicios
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="card">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Mantenimiento Preventivo</h5>
              </div>
              <div class="card-body">
                <p>Inspecciones programadas, limpieza de equipos, reemplazo de componentes y calibraciones periódicas.</p>
              </div>
            </div>
            <div class="card">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Mantenimiento Correctivo</h5>
              </div>
              <div class="card-body">
                <p>Reparaciones de emergencia, diagnóstico de fallas y restauración rápida de sistemas críticos.</p>
              </div>
            </div>
            <div class="card">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Automatización</h5>
              </div>
              <div class="card-body">
                <p>Implementación de sistemas de control, PLC, SCADA y optimización de procesos industriales.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Galería de Imágenes -->
        <div class="w-full flex flex-col gap-6">
          <h3 class="font-semibold text-xl text-[#545386] text-center">
            Nuestras Instalaciones
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="relative group">
              <img src="" alt="Taller de mantenimiento" class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow" />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <p class="text-white text-center font-medium">Taller de Mantenimiento</p>
              </div>
            </div>
            <div class="relative group">
              <img src="" alt="Área de control" class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow" />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <p class="text-white text-center font-medium">Centro de Control</p>
              </div>
            </div>
            <div class="relative group">
              <img src="" alt="Equipos especializados" class="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow" />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <p class="text-white text-center font-medium">Equipos Especializados</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Organigrama -->
        <div class="w-full flex flex-col gap-6">
          <h3 class="font-semibold text-xl text-[#545386] text-center">
            Estructura Organizacional
          </h3>
          <div class="flex justify-center">
            <div class="card w-full max-w-4xl">
              <div class="card-body">
                <div class="flex justify-center mb-4">
                  <img src="" alt="Organigrama del área" class="w-full rounded-lg shadow-md" />
                </div>
                <p class="text-center text-gray-600">
                  Estructura jerárquica del área de mantenimiento eléctrico y automatización
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Nuestro Equipo -->
        <div class="w-full flex flex-col gap-6">
          <h3 class="font-semibold text-xl text-[#545386] text-center">
            Nuestro Equipo
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="card">
              <div class="card-body text-center">
                <img src="" alt="Jefe de área" class="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                <h5 class="font-semibold text-[#545386]">Ing. [Nombre]</h5>
                <p class="text-sm text-gray-600">Jefe de Área</p>
                <p class="text-xs mt-2">Ingeniero Eléctrico con especialización en automatización industrial</p>
              </div>
            </div>
            <div class="card">
              <div class="card-body text-center">
                <img src="" alt="Supervisor técnico" class="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                <h5 class="font-semibold text-[#545386]">Tec. [Nombre]</h5>
                <p class="text-sm text-gray-600">Supervisor Técnico</p>
                <p class="text-xs mt-2">Técnico especializado en sistemas de control y automatización</p>
              </div>
            </div>
            <div class="card">
              <div class="card-body text-center">
                <img src="" alt="Técnico electricista" class="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                <h5 class="font-semibold text-[#545386]">Tec. [Nombre]</h5>
                <p class="text-sm text-gray-600">Técnico Electricista</p>
                <p class="text-xs mt-2">Especialista en mantenimiento de sistemas eléctricos industriales</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Videos Demostrativos -->
        <div class="w-full flex flex-col gap-6">
          <h3 class="font-semibold text-xl text-[#545386] text-center">
            Videos Demostrativos
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="card">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Procedimientos de Mantenimiento</h5>
              </div>
              <div class="card-body">
                <div class="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-3">
                  <div class="text-center">
                    <div class="w-16 h-16 bg-[#545386] rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l7-5-7-5z"/>
                      </svg>
                    </div>
                    <p class="text-sm text-gray-600">Video demostrativo</p>
                  </div>
                </div>
                <p class="text-sm">Demostración de procedimientos estándar de mantenimiento preventivo</p>
              </div>
            </div>
            <div class="card">
              <div class="card-header text-center">
                <h5 class="card-title text-[#F4C7CE]">Sistemas de Automatización</h5>
              </div>
              <div class="card-body">
                <div class="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-3">
                  <div class="text-center">
                    <div class="w-16 h-16 bg-[#545386] rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l7-5-7-5z"/>
                      </svg>
                    </div>
                    <p class="text-sm text-gray-600">Video demostrativo</p>
                  </div>
                </div>
                <p class="text-sm">Presentación de sistemas de control y automatización implementados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
p {
  flex-grow: 0;
}
</style>

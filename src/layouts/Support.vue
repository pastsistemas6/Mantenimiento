<template>
  <div class="min-h-full">
    <div class="py-3 pr-5 pb-6">
      <div class="py-8 shadow-sm rounded-lg">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="relative mx-auto mb-18 w-fit">
            <h2 class="text-[#545386] text-3xl font-bold">Contáctanos</h2>
            <span
              class="from-[#545386]/40 to-primary/5 absolute start-0 top-9 h-1 w-full rounded-full bg-gradient-to-r"
            ></span>
          </div>

          <div class="grid items-center gap-8 lg:grid-cols-2 pb-2">
            <!-- Image Section -->
            <img
              src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/contact/contact-8.png"
              alt="Contact illustration"
              class="size-full"
            />

            <!-- Contact Info Section -->
            <div>
              <!-- Section Title -->
              <h3 class="text-base-content mb-6 text-2xl font-semibold">Felices de ayudarte!</h3>
              <p class="text-base-content/80 mb-10 text-lg font-medium">
                Elite flower esta siempre disponible para responder y dar solución a tus necesidades, proporcionando una atención amable y eficaz.
              </p>

              <!-- Contact Info Grid -->
              <div class="grid gap-6 md:grid-cols-2">
                <!-- Office Hours -->
                <div class="card shadow-sm">
                  <div class="card-body items-center gap-3">
                    <div class="avatar avatar-placeholder">
                      <div class="border-primary/20 text-primary w-9 rounded-full border">
                        <span class="icon-[tabler--clock] text-[#545386] size-6"></span>
                      </div>
                    </div>
                    <h4 class="text-base-content text-lg font-medium">Horas de oficina</h4>
                    <div class="text-center">
                      <p class="text-base-content/80">Lunes-Viernes</p>
                      <p class="text-base-content/80">7:00 am a 4:00 pm</p>
                    </div>
                  </div>
                </div>

                <!-- Our Address -->
                <div class="card shadow-sm">
                  <div class="card-body items-center gap-3 px-4">
                    <div class="avatar avatar-placeholder">
                      <div class="border-primary/20 text-primary w-9 rounded-full border">
                        <span class="icon-[tabler--map-pin] text-[#545386] size-6"></span>
                      </div>
                    </div>
                    <h4 class="text-base-content text-lg font-medium">Nuestra dirección</h4>
                    <address class="text-base-content/80 text-center not-italic">
                      Via Faca Km 31, Facatativá
                      <br />
                      Cundinamarca Facatativá
                    </address>
                  </div>
                </div>

                <!-- Office 2 -->
                <div class="card shadow-sm">
                  <div class="card-body items-center gap-3 px-4">
                    <div class="avatar avatar-placeholder">
                      <div class="border-primary/20 text-primary w-9 rounded-full border">
                        <span class="icon-[tabler--briefcase] text-[#545386] size-6"></span>
                      </div>
                    </div>
                    <h4 class="text-base-content text-lg font-medium">Oficina</h4>
                    <address class="text-base-content/80 text-center not-italic">
                      Ingenieria
                      <br>
                      mantenimiento
                    </address>
                  </div>
                </div>

                <!-- Get in Touch -->
                <div class="card shadow-sm">
                  <div class="card-body items-center gap-3">
                    <div class="avatar avatar-placeholder">
                      <div class="border-primary/20 text-primary w-9 rounded-full border">
                        <span class="icon-[tabler--phone] text-[#545386] size-6"></span>
                      </div>
                    </div>
                    <h4 class="text-base-content text-lg font-medium text-center">Póngase en contacto</h4>
                    <div class="text-center">
                      <p class="text-base-content/80">+1-316-688-5685</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="isolate bg-white px-6 pt-15">
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-4xl font-bold tracking-tight text-balance text-[#545386]">Formulario de contacto</h2>
            <p class="mt-2 text-lg/8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
          </div>
          <form action="#" method="POST" class="mx-auto mt-10 max-w-xl">
            <div class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <label for="first-name" class="block text-sm/6 font-semibold text-gray-900">Primer nombre</label>
                <div class="mt-2.5">
                  <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                </div>
              </div>
              <div>
                <label for="last-name" class="block text-sm/6 font-semibold text-gray-900">Primer apellido</label>
                <div class="mt-2.5">
                  <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="email" class="block text-sm/6 font-semibold text-gray-900">Correo</label>
                <div class="mt-2.5">
                  <input type="email" name="email" id="email" autocomplete="email" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="block text-sm/6 font-semibold text-gray-900">Descripción</label>
                <div class="mt-2.5">
                  <textarea name="message" id="message" rows="4" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
                </div>
              </div>
              <div class="flex gap-x-4 sm:col-span-2">
                <div class="flex h-6 items-center">
                  <div class="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
                    <span class="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                    <input type="checkbox" class="absolute inset-0 appearance-none focus:outline-hidden" aria-label="Agree to policies" id="agree-to-policies" name="agree-to-policies" />
                  </div>
                </div>
                <label class="text-sm/6 text-gray-600" for="agree-to-policies">
                  Al seleccionar esto, aceptas nuestra
                  {{ ' ' }}
                  <a href="#" class="font-semibold whitespace-nowrap text-indigo-600">política de privacidad</a>.
                </label>
              </div>
            </div>
            <div class="mt-10">
              <button type="submit" class="block w-full rounded-md bg-[#545386] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
</script>

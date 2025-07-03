<template>
  <div class="flex min-h-full flex-col justify-center lg:px-4 w-lg">
    <div class="sm:mx-auto sm:w-full pt-7">
      <h2 class="mt-8 text-center text-5xl font-bold tracking-tight text-[#545386]">
        Iniciar sesión
      </h2>
      <p class="text-center mt-4 text-lg text-gray-600">
        Por favor ingrese sus credenciales para continuar
      </p>
      <img class="mx-auto h-28 w-auto mt-2" src="../assets/logo_elite1.webp" alt="Your Company" />
    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <form class="space-y-4" action="#" @submit.prevent="logearse" method="POST">
        <div>
          <label for="email" class="block text-md font-medium text-[#545386]">Usuario</label>
          <div class="mt-2">
            <input
              type="text"
              name="user"
              id="user"
              autocomplete="user"
              required
              placeholder="Ingresa tu usuario"
              class="block w-full rounded-sm bg-white px-3 py-4 text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-lg"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-md/6 font-medium text-[#545386]"
              >Contraseña</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              required
              placeholder="Ingresa tu contraseña"
              class="block w-full rounded-sm bg-white px-3 py-4 text-lg text-gray-900 outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            />
          </div>
        </div>

        <div class="flex w-full flex-row justify-between text-sm mb-8 px-1">
          <div class="flex gap-2">
            <input type="checkbox" name="" id="" class="" />
            <p class="text-md">Recordarme</p>
          </div>

          <a href="#" class="font-semibold text-[#545386] hover:text-indigo-800"
            >¿Olvidaste tu contraseña?</a
          >
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-sm bg-[#545386] px-3 py-4 text-xl font-semibold text-white shadow-xs hover:bg-[#4A148C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            INGRESAR
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logearse() {
  router.push({ name: 'Loading' })
}
</script>

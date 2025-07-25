<template>
  <div class="flex min-h-full flex-col justify-center items-center lg:px-4 w-lg">
    <div class="sm:mx-auto sm:w-full">
      <h2 class="text-center text-5xl font-bold tracking-tight text-[#545386]">Iniciar sesión</h2>
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
              v-model="usuario"
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
              v-model="password"
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

    <Alert ref="alertRef" :title="alertTitle" :text="alertText" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '@/stores/cart'
import { ref } from 'vue'
import Alert from './Alert.vue'

const router = useRouter()
const cart = useCart()
const usuario = ref('')
const password = ref('')
const alertRef = ref(null)
const alertTitle = ref('')
const alertText = ref('')

const logearse = async () => {
  try {
    if (usuario.value == 'pastsistemas6' || usuario.value == 'pastmttostm4') {
      cart.inicializar()
      cart.updateCart(3, false)
      cart.updateCart(2, { 1: true, 2: false })
      cart.updateCart(4, false)
      cart.updateCart(6, false)
      cart.updateCart(7, false)
      cart.name = 'Miguel Gomez'
      cart.rol = 'Pasante'
      router.push({ name: 'Loading' })
    } else if (usuario.value == 'agborja') {
      cart.inicializar()
      cart.updateCart(1, false)
      cart.updateCart(2, { 1: false, 2: false })
      cart.updateCart(4, false)
      cart.updateCart(5, false)
      cart.updateCart(6, false)
      cart.updateCart(7, false)
      cart.name = 'Andres Borja'
      cart.rol = 'Operador'
      router.push({ name: 'Loading' })
    } else if (usuario.value == 'albeiro' || usuario.value == 'admin') {
      cart.inicializar()
      cart.name = 'Albeiro Moreno'
      cart.rol = 'Gerente'
      router.push({ name: 'Loading' })
    } else {
      alertTitle.value = 'Error al iniciar sesión'
      alertText.value = 'No se pudo iniciar sesión. Por favor, revisa el nombre y contraseña.'
      alertRef.value.showAlert()
    }
  } catch (error) {
    console.error('Error al iniciar sesión.', error)
    alertTitle.value = 'Error al iniciar sesión'
    alertText.value = 'No se pudo iniciar sesión. Por favor, revisa el nombre y contraseña.'
    alertRef.value.showAlert()
  }
}
</script>

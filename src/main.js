// src/main.js
// Importar estilos globales
import './assets/main.css'

// Importar Vue, Pinia y el plugin de persistencia de estado
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Importar el componente principal de la aplicación y el router
import App from './App.vue'
import router from './router'

// Variable de entorno para la URL de la API
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

// Configurar la aplicación para usar Pinia y el router
app.use(pinia).use(router).mount('#app')

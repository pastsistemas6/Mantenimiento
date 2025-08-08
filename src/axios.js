// src/axios.js
// Importar Axios para realizar solicitudes HTTP
import axios from 'axios'

// Crear una instancia de Axios con la URL base de la API
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default instance

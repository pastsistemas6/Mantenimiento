import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ApexCharts from 'apexcharts'
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-buttons'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

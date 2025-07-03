import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

function buildChart(selector, options) {
    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
    return chart;
}

window.buildChart = window.buildChart || function(selector, options) {
    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
    return chart;
};

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

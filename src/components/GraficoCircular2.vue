<template>
  <div class="shadow rounded-md chart-container cost-distribution">
    <h3 class="text-2xl font-bold text-[#545386]">
      Distribución de Costos por Tipo de Mantenimiento
    </h3>
    <div class="cost-distribution-container">
      <div class="chart-wrapper">
        <canvas id="costDistributionChart"></canvas>
      </div>
      <div class="cost-breakdown-container">
        <div class="cost-breakdown">
          <div class="cost-item">
            <div class="cost-label">Limpieza General</div>
            <div class="cost-bar">
              <div class="cost-bar-fill cost-bar-fill-1"></div>
            </div>
            <div class="cost-amount">$5,600 (45%)</div>
          </div>
          <div class="cost-item">
            <div class="cost-label">Reemplazo</div>
            <div class="cost-bar">
              <div class="cost-bar-fill cost-bar-fill-2"></div>
            </div>
            <div class="cost-amount">$3,735 (30%)</div>
          </div>
          <div class="cost-item">
            <div class="cost-label">Reparación</div>
            <div class="cost-bar">
              <div class="cost-bar-fill cost-bar-fill-3"></div>
            </div>
            <div class="cost-amount">$1,875 (15%)</div>
          </div>
          <div class="cost-item">
            <div class="cost-label">Revisión</div>
            <div class="cost-bar">
              <div class="cost-bar-fill cost-bar-fill-4"></div>
            </div>
            <div class="cost-amount">$1,240 (10%)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  // Gráfico de Mantenimientos por Tipo
  const typeCtx = document.getElementById('costDistributionChart').getContext('2d')
  new Chart(typeCtx, {
    type: 'doughnut',
    data: {
      labels: ['Limpieza General', 'Reemplazo', 'Reparación', 'Revisión'],
      datasets: [
        {
          data: [45, 30, 15, 10],
          backgroundColor: ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    },
  })
})
</script>

<style scoped>
.cost-distribution {
  padding: 10px 20px;
}
.cost-distribution-container {
  display: flex;
  flex-wrap: wrap;
}
.chart-wrapper {
  flex: 1;
  max-width: 400px;
}
.cost-breakdown-container {
  flex: 1;
  padding: 20px;
}
.cost-bar {
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 5px 0;
  overflow: hidden;
}
.cost-bar-fill {
  height: 100%;
  border-radius: 10px;
}
.cost-bar-fill-1 {
  width: 45%;
  background-color: #4e79a7;
}
.cost-bar-fill-2 {
  width: 30%;
  background-color: #f28e2b;
}
.cost-bar-fill-3 {
  width: 15%;
  background-color: #e15759;
}
.cost-bar-fill-4 {
  width: 10%;
  background-color: #76b7b2;
}
.cost-item {
  margin-bottom: 15px;
}
.cost-label {
  margin-bottom: 5px;
  font-weight: 500;
}
.cost-amount {
  margin-top: 5px;
  font-size: 0.9rem;
  color: #555;
}
.historial-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.historial-table th,
.historial-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.historial-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #555;
}
.historial-table tr:last-child td {
  border-bottom: none;
}
.historial-table tr:hover {
  background-color: #f9f9f9;
}
.status-badge {
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}
.status-completed {
  background-color: #e6f7e6;
  color: #2e7d32;
}
.status-pending {
  background-color: #fff8e1;
  color: #ff8f00;
}
.status-in-progress {
  background-color: #e3f2fd;
  color: #1565c0;
}
</style>

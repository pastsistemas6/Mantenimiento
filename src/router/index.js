// src/router/index.js
// Importaciones necesarias para Vue Router y Pinia
import { createRouter, createWebHistory } from 'vue-router'
import { useCart } from '@/stores/cart'
import Homeview from '../views/HomeView.vue'
import LoadingView from '@/views/LoadingView.vue'
import Body from '@/views/Body.vue'
import BodyLayout from '@/layouts/BodyLayout.vue'
import Invernaderos from '@/layouts/Invernaderos.vue'
import Reservorios from '@/layouts/Reservorios.vue'
import DashboardPlasticos from '@/layouts/DashboardPlasticos.vue'
import DashboardReservorios from '@/layouts/DashboardReservorios.vue'
import Calendar from '@/components/Calendar.vue'
import Lecturas from '@/layouts/Lecturas.vue'
import Sgmwin from '@/layouts/Sgmwin.vue'
import Fdim from '@/layouts/Fdim.vue'
import Notas from '@/layouts/Notas.vue'
import Page404 from '@/views/Page404.vue'
import Users from '@/layouts/Users.vue'
import Map from '@/layouts/Map.vue'
import About from '@/layouts/about.vue'
import TablaLecturas from '@/components/TablaLecturas.vue'
import Support from '@/layouts/Support.vue'
import Detallebloque from '@/views/Detallebloque.vue'
import Biblioteca from '@/layouts/Biblioteca.vue'
import Notfound from '@/views/Notfound.vue'
import Directorio from '@/layouts/Directorio.vue'
import Tickets from '@/layouts/Tickets.vue'
import Pendientes from '@/components/Pendientes.vue'
import Solucionados from '@/components/Solucionados.vue'

// Crear una instancia del router con las rutas definidas
const router = createRouter({
  // Usar el historial de navegación de Vue Router
  history: createWebHistory(import.meta.env.BASE_URL),
  // Definir las rutas de la aplicación
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homeview,
    },
    {
      path: '/loading',
      name: 'Loading',
      component: LoadingView,
      meta: { token: true },
    },
    {
      path: '/body',
      name: 'Body',
      component: Body,
      meta: { token: true },
      children: [
        {
          path: '/bodylayout',
          name: 'BodyLayout',
          component: BodyLayout,
        },
        {
          path: '/invernaderos',
          name: 'Invernaderos',
          component: Invernaderos,
          meta: { disableId: 1 },
        },
        {
          path: '/reservorios',
          name: 'Reservorios',
          component: Reservorios,
          meta: { disableId: 2 },
        },
        {
          path: '/dashboard-plasticos',
          name: 'DashboardPlasticos',
          component: DashboardPlasticos,
        },
        {
          path: '/dashboard-reservorios',
          name: 'DashboardReservorios',
          component: DashboardReservorios,
        },
        {
          path: '/lecturas',
          name: 'Lecturas',
          component: Lecturas,
          meta: { disableId: 3 },
          children: [
            {
              path: '/calendario',
              name: 'Calendario',
              component: Calendar,
            },
            {
              path: '/data-tabla',
              name: 'Data-tabla',
              component: TablaLecturas,
            },
          ],
        },
        {
          path: '/map',
          name: 'Map',
          component: Map,
          meta: { disableId: 4 },
        },
        {
          path: '/biblioteca',
          name: 'Biblioteca',
          component: Biblioteca,
          meta: { disableId: 5 },
        },
        {
          path: '/tickets',
          name: 'Tickets',
          component: Tickets,
          meta: { disableId: 7 },
          children: [
            {
              path: '/pendientes',
              name: 'Pendientes',
              component: Pendientes,
            },
            {
              path: '/solucionados',
              name: 'Solucionados',
              component: Solucionados,
            },
          ],
        },
        {
          path: '/notas',
          name: 'Notas',
          component: Notas,
        },
        {
          path: '/sgmwin',
          name: 'Sgmwin',
          component: Sgmwin,
        },
        {
          path: '/fdim',
          name: 'Fdim',
          component: Fdim,
        },
        {
          path: '/support',
          name: 'Support',
          component: Support,
        },
        {
          path: '/about',
          name: 'About',
          component: About,
        },
        {
          path: '/users',
          name: 'users',
          component: Users,
          meta: { disableId: 6 },
        },
        {
          path: '/directorio',
          name: 'Directorio',
          component: Directorio,
        },
      ],
    },
    {
      path: '/detalle-bloque/:id/:categoria',
      name: 'DetalleBloque',
      component: Detallebloque,
      props: true,
      meta: { token: true },
    },
    {
      path: '/offline',
      name: 'Offline',
      component: Page404,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/offline',
    },
    {
      path: '/notfound',
      name: 'Notfound',
      component: Notfound,
    },
  ],
})

// Detecta conexión antes de cada navegación
router.beforeEach((to, from, next) => {
  // Verifica si el usuario está en línea
  const disableId = to.meta?.disableId
  const token = to.meta?.token

  // Si el usuario no está en línea y la ruta no es 'Offline', redirige a 'Offline'
  if (!navigator.onLine && to.name !== 'Offline') {
    next({ name: 'Offline' })
  } else if (navigator.onLine && to.name === 'Offline') {
    next({ name: 'home' })
  }

  // Verifica si se requiere un token o un disableId para la navegación
  if (disableId !== undefined) {
    const cart = useCart()

    if (!cart.disable[disableId]) {
      return next({ name: 'Notfound' })
    }
  }

  // Verifica si se requiere un token para la navegación
  if (token !== undefined) {
    const cart = useCart()

    if (!cart.token) {
      return next({ name: 'Notfound' })
    }
  }

  // Si todas las condiciones se cumplen, permite la navegación
  return next()
})

export default router

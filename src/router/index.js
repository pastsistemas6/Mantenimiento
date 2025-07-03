import { createRouter, createWebHistory } from 'vue-router'
import Homeview from '../views/HomeView.vue'
import LoadingView from '@/views/LoadingView.vue'
import Body from '@/views/Body.vue'
import BodyLayout from '@/layouts/BodyLayout.vue'
import Plasticos from '@/layouts/Plasticos.vue'
import Reservorios from '@/layouts/Reservorios.vue'
import DashboardPlasticos from '@/layouts/DashboardPlasticos.vue'
import DashboardReservorios from '@/layouts/DashboardReservorios.vue'
import Calendar from '@/components/Calendar.vue'
import Lecturas from '@/layouts/Lecturas.vue'
import Sgmwin from '@/layouts/Sgmwin.vue'
import Fdim from '@/layouts/Fdim.vue'
import Notas from '@/layouts/Notas.vue'
import TablaLecturas from '@/components/TablaLecturas.vue'
import Page404 from '@/views/Page4041.vue'
import Users from '@/layouts/Users.vue'
import Map from '@/layouts/Map.vue'
import About from '@/layouts/about.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    },
    {
      path: '/body',
      name: 'Body',
      component: Body,
      children: [
        {
          path: '/bodylayout',
          name: 'BodyLayout',
          component: BodyLayout,
        },
        {
          path: '/plasticos',
          name: 'Plasticos',
          component: Plasticos,
        },
        {
          path: '/reservorios',
          name: 'Reservorios',
          component: Reservorios,
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
          children: [
            {
              path: '/calendario',
              name: 'Calendario',
              component: Calendar,
            },
            {
              path: '/tabla-lecturas',
              name: 'TablaLecturas',
              component: TablaLecturas,
            },
          ],
        },
        {
          path: '/map',
          name: 'Map',
          component: Map,
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
          path: '/about',
          name: 'About',
          component: About,
        },
        {
          path: '/users',
          name: 'users',
          component: Users,
        },
      ],
    },
    {
      path: '/404',
      name: '404',
      component: Page404,
    },
  ],
})

export default router

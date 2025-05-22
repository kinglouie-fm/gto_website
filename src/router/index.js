import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamView from '../views/TeamView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import LensView from '../views/LensView.vue'
import LensCameraView from '../views/LensCameraView.vue'
import LensDetailsView from '../views/LensDetailsView.vue'
import TermsAndConditions from '../views/TermsAndConditions.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/team',
    name: 'team',
    component: TeamView
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioView
  },
  {
    path: '/lens',
    name: 'lens',
    component: LensView
  },
  {
    path: '/lens/camera',
    name: 'lenscamera',
    component: LensCameraView
  },
  {
    path: '/lens/details',
    name: 'lensdetails',
    component: LensDetailsView
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsAndConditions
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // Always scroll to top on route change.
    return { top: 0, behavior: 'instant' }
  }
})

export default router

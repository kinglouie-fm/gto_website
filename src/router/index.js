import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamView from '../views/TeamView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import LensView from '../views/LensView.vue'
import LensCameraView from '../views/LensCameraView.vue'
import LensDetailsView from '../views/LensDetailsView.vue'
import TermsAndConditions from '../views/TermsAndConditions.vue'
import PrivacyView from '../views/PrivacyView.vue'
import CookiePolicyView from '../views/CookiePolicyView.vue'
import EventsView from '../views/EventsView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { updateSeoHead } from '../utils/seo.js'

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
    path: '/events',
    name: 'events',
    component: EventsView
  },
  {
    path: '/events/:slug',
    name: 'event-detail',
    component: EventDetailView
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
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyView
  },
  {
    path: '/cookie-policy',
    name: 'cookie-policy',
    component: CookiePolicyView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

export const createSiteRouter = (history = createWebHistory()) => {
  const router = createRouter({
    history,
    routes,
    sensitive: true,
    scrollBehavior: () => ({ top: 0, behavior: 'instant' })
  })

  router.afterEach((to, from, failure) => {
    if (!failure && typeof document !== 'undefined') updateSeoHead(to.path, document)
  })

  return router
}

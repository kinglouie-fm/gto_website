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
import { getSeoForPath, site, toAbsoluteAsset, toCanonical } from '../data/seo.js'

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

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    const nameMatch = selector.match(/meta\[name="(.+)"\]/)
    const propertyMatch = selector.match(/meta\[property="(.+)"\]/)
    if (nameMatch) element.setAttribute('name', nameMatch[1])
    if (propertyMatch) element.setAttribute('property', propertyMatch[1])
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

router.afterEach((to) => {
  const seo = getSeoForPath(to.path)
  const canonical = toCanonical(to.path)
  const image = toAbsoluteAsset(seo.image || site.image)

  document.title = seo.title
  setMeta('meta[name="description"]', 'content', seo.description)
  setMeta('meta[name="robots"]', 'content', seo.robots || 'index,follow')
  setLink('canonical', canonical)
  setMeta('meta[property="og:type"]', 'content', 'website')
  setMeta('meta[property="og:site_name"]', 'content', site.name)
  setMeta('meta[property="og:title"]', 'content', seo.title)
  setMeta('meta[property="og:description"]', 'content', seo.description)
  setMeta('meta[property="og:url"]', 'content', canonical)
  setMeta('meta[property="og:image"]', 'content', image)
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
  setMeta('meta[name="twitter:title"]', 'content', seo.title)
  setMeta('meta[name="twitter:description"]', 'content', seo.description)
  setMeta('meta[name="twitter:image"]', 'content', image)
})

export default router

// Import Necessary Vue Router Functions and Vue Components
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import EventsView from '../views/EventsView.vue'
import GalleryView from '../views/GalleryView.vue'

/**
 * Create a Vue Router instance.
 * @param {Object} createWebHistory - Creates a history mode router (for cleaner URLs).
 * @param {string} import.meta.env.BASE_URL - Base URL for the router, used for relative path routing.
 * @param {Array} routes - An array of route objects.
 * @param {string} path - The URL path for the route.
 * @param {string} name - The name of the route.
 * @param {Object} component - The Vue component associated with the route.
 */
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView
    }
  ]
})

// Export the Vue Router Instance
export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import RouterView from '../views/RouterView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'
import AdminPanelView from '../views/AdminPanelView.vue'
import { ref } from 'vue'

const isAuthenticated = ref(false) // Authentication state

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/firesignup',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/getBookCount',
    name: 'GetBookCount',
    component: GetBookCountView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated.value) {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/routePage',
    name: 'RouterView',
    component: RouterView
  },
  {
    path: '/weatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/countBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/getAllBookAPI',
    name: 'getAllBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanelView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value.role !== 'admin') {
        next({ name: 'Login' })
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export { isAuthenticated }
export default router

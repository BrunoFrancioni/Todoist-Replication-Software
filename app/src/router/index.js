import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login-register/Login.vue'
import Signup from '../views/login-register/Signup.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'Today',
      component: () => import('../views/Today.vue')
    },
    {
      path: '/inbox',
      name: 'Inbox',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Inbox.vue')
    },
    {
      path: '/upcoming',
      name: 'Upcoming',
      component: () => import('../views/Upcoming.vue')
    },
    {
      path: '/project/:idproject/title/:title/archived/:archived',
      name: 'Project',
      props: true,
      component: () => import('../views/Project.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/Settings.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router

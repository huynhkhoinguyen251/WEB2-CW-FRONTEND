// import Vue from 'vue';
// import Router from 'vue-router';
// import Words from './views/Words.vue';
// import New from './views/New.vue';
// import Show from './views/Show.vue';
// import Edit from './views/Edit.vue';
// import Test from './views/Test.vue';

// Vue.use(Router);

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   linkActiveClass: 'active',
//   routes: [
//     {
//       path: '/',
//       redirect: '/words'
//     },
//     {
//       path: '/words',
//       name: 'words',
//       component: Words
//     },
//     {
//       path: '/words/new',
//       name: 'new-word',
//       component: New
//     },
//     {
//       path: '/words/:id',
//       name: 'show',
//       component: Show
//     },
//     {
//       path: '/words/:id/edit',
//       name: 'edit',
//       component: Edit
//     },
//     {
//       path: '/test',
//       name: 'test',
//       component: Test
//     }
//   ]
// });

import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/words',
      name: 'words',
      component: Words,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/new',
      name: 'new-word',
      component: New,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id',
      name: 'show',
      component: Show,
      meta: { requiresAuth: true }
    },
    {
      path: '/words/:id/edit',
      name: 'edit',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: { requiresAuth: true }
    }
  ]
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/words');
  } else {
    next();
  }
});

export default router;
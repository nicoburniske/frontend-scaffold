import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/Home.vue';
import Journal from '../components/Journal/Journal.vue';
import Notes from '../components/Notes/Notes.vue';
import Login from '../components/Login/Login.vue';
import store from '../store/store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/journal',
    name: 'journal',
    component: Journal,
  },
  {
    path: '/notes',
    name: 'notes',
    component: Notes,
    meta: {
      secure: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

// navigation guard
// will have to be modified for admin privileges
router.beforeEach((to, from, next) => {
  // if any of the routes exposed by the route object 'to' are secure
  if (to.matched.some(record => record.meta.secure)) {
    if (store.state.user.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;

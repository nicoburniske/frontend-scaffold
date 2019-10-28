import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/Home';
import Journal from '../components/Journal/Journal';
import Notes from '../components/Notes/Notes';
import Login from '../components/Login/Login';
import Store from '../store/store';

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
    meta: {
      secure: true,
    },
  },
  {
    path: '/notes',
    name: 'notes',
    component: Notes,
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
    if (Store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;

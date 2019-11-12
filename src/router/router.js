import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/Home.vue';
import Journal from '../components/Journal/Journal.vue';
import Notes from '../components/Notes/Notes.vue';
import LoginForm from '../components/Login/LoginForm.vue';
import SignupForm from '../components/Login/SignupForm.vue';
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
      secure: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupForm,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

/**
 * navigation guard. Uses Vuex user module's isAuthenticated state to verify if
 * a user should be able to visit certain pages.
 *
 * TODO: will have to be modified for admin privileges
 */
router.beforeEach((to, from, next) => {
  // if any of the routes exposed by the route object 'to' are secure
  if (to.matched.some(record => record.meta.secure)) {
    if (store.state.user.isAuthenticated) { // if user is currently authenticated
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;

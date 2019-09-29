import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/Home';
import Journal from '../components/Journal/Journal';
import Notes from '../components/Notes/Notes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
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
    },
  ],
});


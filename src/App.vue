<template>
  <div id="app">
    <the-navigation />
    <router-view />
  </div>
</template>

<script>
import TheNavigation from './components/Navigation/TheNavigation';

export default {
  name: 'App',
  components: {
    TheNavigation,
  },
};
</script>

<style>
#app {
  margin: 3em;
  text-align: center;
}
</style>

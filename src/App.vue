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
  data() {
    return {
      // put 0 if you don't want any notes to be retrieved from the api.
      notesRetrieved: 3,
    };
  },
  mounted() {
    this.$store.dispatch('retrieveNotes', this.notesRetrieved);
  },
};
</script>

<style lang="less">
:root {
  --main-font: "Montserrat", sans-serif;
  --header-color: #ddabff;
  --body-color: white;
  --notes-form-color: #c4d2ff;
}
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: var(--main-font);
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color: var(--body-color);
}
</style>


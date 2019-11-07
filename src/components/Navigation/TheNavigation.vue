<template>
  <div class="header">
    <div class="title">
      <router-link to="/" tag="h3">C4C Scaffold</router-link>
    </div>

    <div class="navlinks">
      <router-link to="/" tag="button">Home</router-link>
      <router-link to="/journal" tag="button">Journal</router-link>
      <router-link to="/notes" tag="button">Notes</router-link>
      <router-link v-if="!compAuth" to="/login" tag="button">Login</router-link>
      <button v-else @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    async logout() {
      await Promise.all([this.$store.dispatch('logout'), this.$router.push('/')]);
    },
  },
  computed: {
    ...mapState({
      compAuth: state => state.user.isAuthenticated,
    }),
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 8vh;
  background-color: var(--header-color);
  font-family: var(--main-font);
  .title {
    text-transform: uppercase;
    letter-spacing: 6px;
  }
  .navlinks {
    display: flex;
    justify-content: space-between;
    width: 45%;
    button {
      display: block;
      width: 5em;
      height: 5em;
      letter-spacing: 4px;
      font-weight: bold;
      background: none;
      text-decoration: none;
      border: none;
      outline: none;
      font-family: var(--main-font);
    }
    button:hover {
      color: white;
    }
  }
}
</style>

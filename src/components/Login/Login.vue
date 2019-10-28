<template>
  <div>
    <h2>Login</h2>
    <div>
      <div>
        <!-- eslint-disable-next-line max-len -->
        <input v-model="username" @focus="resetSubmit" type="text" placeholder="Username or Email" />
      </div>
      <div>
        <input v-model="password" @focus="resetSubmit" type="password" placeholder="Password"/>
      </div>

      <div v-show="(!username || !password) && submitted"> Invalid Input </div>

      <button @click="submit"> Login </button>
      <button @click="register"> Register </button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
    };
  },
  methods: {
    resetInput() {
      this.username = '';
      this.password = '';
    },
    resetSubmit() {
      this.submitted = false;
    },
    submit() {
      this.submitted = true;
      if (this.username && this.password) {
        let user = {username: this.username, password: this.password};
        this.$store.dispatch('login', user)
          // redirects user to new page once logged in
          .then(() => this.$router.push('/'))
          // eslint-disable-next-line no-console
          .catch(error => console.log(error));
      }
      this.resetInput();
    },
    register() {

    },
  },
};
</script>


<style scoped>

</style>

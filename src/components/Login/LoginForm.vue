<template>
  <div>
    <h2>Login</h2>
    <div class="login">
      <div>
        <!-- eslint-disable-next-line max-len -->
        <input v-model="username" @focus="resetSubmit" type="text" placeholder="Username or Email" />
        <input v-model="password" @focus="resetSubmit" type="password" placeholder="Password"/>
      </div>
      <p v-if="(!username || !password) && submitted">Enter a username and password </p>
      <p v-if="error && submitted">{{error}}</p>
      <button @click="submit"> Login </button>
      <router-link to="/signup" tag="button"> Signup </router-link>
      <div> <button @click="register"> Forgot Password </button> </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
      error: '',
    };
  },
  methods: {
    resetInput() {
      this.username = '';
      this.password = '';
    },
    resetSubmit() {
      this.submitted = false;
      this.error = '';
    },
    inputValid() {
      return this.username && this.password;
    },
    async submit() {
      this.submitted = true;
      if (this.inputValid()) {
        const user = { username: this.username, password: this.password };
        try {
          await this.$store.dispatch('login', user);
          this.resetInput();
          this.resetSubmit();
          this.$router.push('/notes');
        } catch (error) {
          this.error = `Incorrect Username/Password: ${error.message}`;
        }
      }
    },
    register() {
      // remove this method and replace with an event. should go to forgotpassword component.
    },
  },
};
</script>


<style scoped>
.error {
    color: red;
}
</style>

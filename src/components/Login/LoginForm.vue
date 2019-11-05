<template>
  <div>
    <h2>Login</h2>
    <div class="login">
      <div>
        <!-- eslint-disable-next-line max-len -->
        <input v-model="username" @focus="resetSubmit" type="text" placeholder="Username or Email" />
        <input v-model="password" @focus="resetSubmit" type="password" placeholder="Password"/>
      </div>
      <div v-show="(!username || !password) && submitted">Enter a username and password </div>
      <button @click="submit"> Login </button>
      <button @click="$emit('sign-up')"> Sign Up </button>
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
    async submit() {
      this.submitted = true;
      if (this.username && this.password) {
        const user = { username: this.username, password: this.password };
        try {
          await this.$store.dispatch('login', user);
          this.resetInput();
          this.resetSubmit();
          this.$router.push('/journal'); // should be able to see journal page once authenticated
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`${error} from login form`);
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

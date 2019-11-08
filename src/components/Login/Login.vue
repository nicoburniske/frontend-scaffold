<template>
  <div>
    <login-form v-if="selectedForm===1" @sign-up="signup"/>
    <signup-form v-else-if="selectedForm===2" @login="login"/>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue';
import SignupForm from './SignupForm.vue';

export default {
  // should we be using nested routes instead of int selectedForm?
  name: 'Login',
  components: {
    'login-form': LoginForm,
    'signup-form': SignupForm,
  },
  data() {
    return {
      selectedForm: 1,
    };
  },
  methods: {
    signup() {
      this.selectedForm = 2;
    },
    login() {
      this.selectedForm = 1;
    },
  },
};
</script>


<style scoped>

</style>

<template>
  <div>
    <div>
      <div>
         <input v-model="username" @focus="resetSubmit" type="text" placeholder="Username" >
         <span v-show="!!inputError[0]">{{inputError[0]}} </span>
      </div>
      <div>
         <input v-model="email" @focus="resetSubmit" type="text" placeholder="Email" >
         <span v-show="!!inputError[1]"> {{inputError[1]}} </span>
      </div>
      <div>
        <input v-model="password1" @focus="resetSubmit" type="password" placeholder="Password">
        <span v-if="!!inputError[2]"> {{inputError[2]}} </span>
        <!-- eslint-disable-next-line max-len -->
        <input v-model="password2" @focus="resetSubmit" type="password" placeholder="Re-type Password">
      </div>
    </div>
    <div>
      <button @click="signup"> Signup </button>
      <button @click="$emit('login')"> Login </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      email: '',
      password1: '',
      password2: '',
      inputError: ['', '', ''],
      submitted: false,
    };
  },
  methods: {
    resetSubmit() {
      this.submitted = false;
    },
    resetInput() {
      this.username = '';
      this.email = '';
      this.password1 = '';
      this.password2 = '';
      this.inputError = ['', '', ''];
    },
    validate() {
      this.validateUser();
      this.validateEmail();
      this.validatePassword();
    },
    validateUser() {
      if (!this.username) {
        this.inputError.splice(0, 1, 'Username cannot be empty');
      } else if (this.username.length > 20) {
        this.inputError.splice(0, 1, 'Username is too long (Cannot exceed 20 characters)');
      } else {
        this.inputError.splice(0, 1, '');
      }
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email) {
        this.inputError.splice(1, 1, 'Email cannot be empty');
      } else if (!emailRegex.test(this.email)) {
        this.inputError.splice(1, 1, 'Invalid Email');
      } else {
        this.inputError.splice(1, 1, '');
      }
    },
    validatePassword() {
      if (!this.password1 || !this.password2) {
        this.inputError.splice(2, 1, 'Password cannot be empty');
      } else if (this.password1 !== this.password2) {
        this.inputError.splice(2, 1, 'Passwords do not match');
      } else {
        this.inputError.splice(2, 1, '');
      }
    },
    async signup() {
      this.submitted = true;
      this.validate();
      // eslint-disable-next-line no-console
      console.log('validating');
      if (this.inputError.reduce((acc, curr) => acc && curr === '', true)) {
        // eslint-disable-next-line no-console
        console.log('valid input');
        const user = { username: this.username, email: this.email, password: this.password1 };
        try {
          await this.$store.dispatch('signup', user);
          this.resetInput();
          this.$router.push('/journal');
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`${error} from signup form`);
        }
      }
    },
  },
};
</script>

<style scoped>

</style>

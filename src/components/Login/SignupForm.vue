<template>
  <div>
    <div>
      <div>
         <input v-model="username" @focus="resetSubmit" type="text" placeholder="Username" >
         <span v-show="!valid[0]">{{inputError[0]}} </span>
      </div>
      <div>
         <input v-model="email" @focus="resetSubmit" type="text" placeholder="Email" >
         <span v-show="!valid[1]"> {{inputError[1]}} </span>
      </div>
      <div>
        <input v-model="password1" @focus="resetSubmit" type="password" placeholder="Password">
        <span v-show="!valid[2]"> {{inputError[2]}} </span>
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
      valid: [false, false, false],
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
      this.valid = [false, false, false];
      this.inputError = ['', '', ''];
    },
    validate() {
      this.validateUser();
      this.validateEmail();
      this.validatePassword();
    },
    validateUser() {
      // validate Username
      if (!this.username) {
        this.valid.splice(0, 1, false);
        this.inputError.splice(0, 1, 'Username cannot be empty');
      } else if (this.username.length > 20) {
        this.valid.splice(0, false);
        this.inputError.splice(0, 1, 'Username is too long (Cannot exceed 20 characters)');
      } else {
        this.valid.splice(0, true);
        this.inputError.splice(0, 1, '');
      }
    },
    validateEmail() {
      // validate email
      // eslint-disable-next-line no-useless-escape
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email) {
        this.valid.splice(1, 1, false);
        this.inputError.splice(1, 1, 'Email cannot be empty');
      } else if (!emailRegex.test(this.email)) {
        this.valid.splice(1, 1, false);
        this.inputError.splice(1, 1, 'Invalid Email');
      } else {
        this.valid.splice(1, 1, true);
        this.inputError.splice(1, 1, '');
      }
    },
    validatePassword() {
      // validate password
      if (!this.password1 || !this.password2) {
        this.valid.splice(2, 1, false);
        this.inputError.splice(2, 1, 'Password cannot be empty');
      } else if (this.password1 !== this.password2) {
        this.valid.splice(2, 1, false);
        this.inputError.splice(2, 1, 'Passwords do not match');
      } else {
        this.valid.splice(2, 1, true);
        this.inputError.splice(2, 1, '');
      }
    },
    signup() {
      this.submitted = true;
      this.validate();
      // eslint-disable-next-line no-console
      console.log('validating');
      if (this.valid.reduce((acc, curr) => acc && curr, true)) {
        // eslint-disable-next-line no-console
        console.log('valid input');
      }
    },
  },
};
</script>

<style scoped>

</style>

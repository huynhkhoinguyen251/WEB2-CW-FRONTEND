<template>
  <div>
    <h1>Register</h1>
    
    <form action="#" @submit.prevent="onSubmit">
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="user icon"></i> Username
        </div>
        <input type="text" placeholder="Enter username..." v-model="username" />
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="lock icon"></i> Password
        </div>
        <input type="password" placeholder="Enter password..." v-model="password" />
      </div>

      <button class="positive ui button">Register</button>
    </form>

    <p style="margin-top: 20px;">
      Already have an account? 
      <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'register',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async onSubmit() {
      this.errorMessage = '';
      
      if (this.username === '' || this.password === '') {
        this.errorMessage = 'Please fill out both fields!';
        return;
      }

      try {
        await api.register({
          username: this.username,
          password: this.password
        });

        this.flash('Registration successful! Please login.', 'success');
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Registration failed';
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
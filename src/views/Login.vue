<template>
  <div>
    <h1>Login</h1>
    
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

      <button class="positive ui button">Login</button>
    </form>

    <p style="margin-top: 20px;">
      Don't have an account? 
      <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'login',
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
        const response = await api.login({
          username: this.username,
          password: this.password
        });

        // Add login timestamp
        const userWithTimestamp = {
          ...response.user,
          loginTimestamp: Date.now()
        };

        localStorage.setItem('user', JSON.stringify(userWithTimestamp));
        this.flash('Login successful!', 'success');
        this.$emit('user-logged-in');
        this.$router.push('/words');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Login failed';
      }
    }
  },
  mounted() {
    const user = localStorage.getItem('user');
    if (user) {
      this.$router.push('/words');
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
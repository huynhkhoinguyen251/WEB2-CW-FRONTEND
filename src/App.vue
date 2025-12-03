<template>
  <div id="app">
    <div class="ui inverted segment navbar" v-if="isAuthenticated">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <router-link to="/profile" class="item">
            <i class="user circle icon"></i> Profile
          </router-link>
          <a href="#" @click.prevent="logout" class="item right">
            <i class="sign out icon"></i> Logout
          </a>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>

      <div class="ui one column grid">
        <div class="column">
          <router-view @user-logged-in="checkAuth" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('user');
    },
    logout() {
      localStorage.removeItem('user');
      this.isAuthenticated = false;
      this.flash('Logged out successfully!', 'success');
      this.$router.push('/login');
    }
  },
  mounted() {
    this.checkAuth();
  },
  watch: {
    $route() {
      this.checkAuth();
    }
  }
};
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
.right {
  margin-left: auto !important;
}
</style>
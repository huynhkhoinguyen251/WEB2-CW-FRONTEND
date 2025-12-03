<template>
  <div>
    <h1>User Profile</h1>
    
    <div class="ui segment">
      <h3><i class="user icon"></i> Account Information</h3>
      
      <div class="ui list">
        <div class="item">
          <strong>Username:</strong> {{ user.username }}
        </div>
        <div class="item">
          <strong>User ID:</strong> {{ user.id }}
        </div>
        <div class="item">
          <strong>Account Status:</strong> <span class="ui green label">Active</span>
        </div>
      </div>
    </div>

    <div class="ui segment">
      <h3><i class="book icon"></i> Vocabulary Statistics</h3>
      
      <div class="ui statistics">
        <div class="statistic">
          <div class="value">
            {{ totalWords }}
          </div>
          <div class="label">
            Total Words
          </div>
        </div>
        
        <div class="statistic">
          <div class="value">
            {{ totalWords * 3 }}
          </div>
          <div class="label">
            Total Translations
          </div>
        </div>
      </div>
    </div>

    <div class="ui segment">
      <h3><i class="clock icon"></i> Session Information</h3>
      
      <div class="ui list">
        <div class="item">
          <strong>Login Time:</strong> {{ loginTime }}
        </div>
        <div class="item">
          <strong>Session Duration:</strong> {{ sessionDuration }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'profile',
  data() {
    return {
      user: {
        username: '',
        id: ''
      },
      totalWords: 0,
      loginTime: '',
      sessionDuration: '',
      intervalId: null
    };
  },
  methods: {
    updateSessionDuration() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const loginTimestamp = userData.loginTimestamp || Date.now();
        
        const now = Date.now();
        const diff = now - loginTimestamp;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        this.sessionDuration = `${hours}h ${minutes}m ${seconds}s`;
      }
    }
  },
  async mounted() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.user.username = userData.username;
      this.user.id = userData.id;
      
      // Set login time
      if (userData.loginTimestamp) {
        const date = new Date(userData.loginTimestamp);
        this.loginTime = date.toLocaleString();
      } else {
        this.loginTime = new Date().toLocaleString();
      }
    }
    
    // Get total words count
    const words = await api.getWords();
    this.totalWords = words.length;
    
    // Update session duration every second
    this.updateSessionDuration();
    this.intervalId = setInterval(this.updateSessionDuration, 1000);
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
</script>

<style scoped>
.ui.segment {
  margin: 20px 0;
}

.ui.list .item {
  padding: 8px 0;
}

.ui.statistics {
  margin: 20px 0;
}
</style>
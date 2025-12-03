import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/';

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
  });

export const api = {
  // Vocab APIs
  getWord: handleError(async id => {
    const res = await axios.get(baseURL + 'words/' + id);
    return res.data;
  }),
  getWords: handleError(async () => {
    const res = await axios.get(baseURL + 'words/');
    return res.data;
  }),
  deleteWord: handleError(async id => {
    const res = await axios.delete(baseURL + 'words/' + id);
    return res.data;
  }),
  createWord: handleError(async payload => {
    const res = await axios.post(baseURL + 'words/', payload);
    return res.data;
  }),
  updateWord: handleError(async payload => {
    const res = await axios.put(baseURL + 'words/' + payload._id, payload);
    return res.data;
  }),
  
  // Auth APIs
  login: async (payload) => {
    const res = await axios.post(baseURL + 'auth/login', payload);
    return res.data;
  },
  register: async (payload) => {
    const res = await axios.post(baseURL + 'auth/register', payload);
    return res.data;
  }
};
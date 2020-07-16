const axios = require('axios');

var app = new Vue({
  el: '#app',
  data: {
    page: 'login',
    loginEmail: '',
    loginPassword: '',
    registerEmail: '',
    registerPassword: '',
  },
  methods: {
    login() {
      // this.page = 'dashboard';
      axios({
        method: 'GET',
        url: 'http://localhost:3000/tasks',
        data: {
          email: this.loginEmail,
          password: this.loginPassword,
        }
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        })
    },
    logout() {
      this.page = 'login';
    },
    register() {
      this.page = 'login';
    },
    toRegister() {
      this.page = 'register';
    },
    toLogin() {
      this.page = 'login';
    },
  },
  created: function () {
    this.page = 'login';
  },
  mounted: function () {
    
  }
})
<template>
  <div>
    <Navbar :page='page' @emitLogout='logout'></Navbar>
    <Login v-if="page === 'login'" @emitRegister='showRegister' @emitAccesToken='loggedIn'></Login>
    <Register v-if="page === 'register'" @emitToLogin='showLogin'></Register>
    <Dashboard  v-if="page === 'dashboard'"></Dashboard>
  </div>
</template>

<script>

import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Dashboard from "./views/Dashboard.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
    Login,
    Register,
    Dashboard,
  },
  data() {
    return {
      message: 'Hello world',
      page: 'login',
      access_token: '',
    };
  },
  created() {
    if (!localStorage.access_token) {
      this.page = 'login';
    } else {
      this.page = 'dashboard';
    }
  },
  methods: {
    showRegister() {
      this.page = 'register';
    },
    showLogin() {
      this.page = 'login';
    },
    logout() {
      localStorage.clear();
      this.page = 'login';
    },
    loggedIn(access_token) {
      localStorage.access_token = access_token;
      this.page = 'dashboard';
    }
  }
};
</script>
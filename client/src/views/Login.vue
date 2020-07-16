<template>
  <div>
      <h1 class="text-center mt-5">Kanban App</h1>
      <div class="form">
        <form @submit.prevent="login()">
          <h2 class="text-center">Log in</h2>
          <div class="form-group mt-4">
            <label>Email address</label>
            <input type="email" class="form-control" v-model="loginEmail">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="loginPassword">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">login</button>
          </div>
          <div class="text-center mt-5">
            <p>Not register yet ?</p>
            <a href="" role="button" @click.prevent="toRegister()">Register</a>
          </div>
        </form>
      </div>
    </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';

export default {
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    toRegister() {
      this.$emit('emitRegister');
    },
    login() {
      // this.page = 'dashboard';
      console.log(this.loginEmail);
      console.log(this.loginPassword);
      const data = qs.stringify({
        email: this.loginEmail,
        password: this.loginPassword,
      });
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: data
      })
      .then(res =>  {
        // console.log(res.data);
        this.$emit('emitAccesToken', res.data.access_token);
      })
      .catch(function (err) {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  .form {
    width: 340px;
    margin: 50px auto;
    font-size: 15px;
  }

  .form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
  }

  .g-signin2 > div {
    margin: 0 auto;
  }
</style>
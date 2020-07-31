<template>
  <div>
      <h1 class="text-center mt-5">Kanban App</h1>
      <div class="login-form">
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
          <h5 class="text-center">or</h5>
          <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
          <div class="text-center mt-4">
            <p>Don't have an account ?</p>
            <a href="" role="button" @click.prevent="toRegister()">Register</a>
          </div>
        </form>
      </div>
    </div>
</template>

<script>

import axios from 'axios';
import GoogleLogin from 'vue-google-login';

export default {
  components: {
    GoogleLogin
  },
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      params: {
          client_id: "44853804618-n6kh1m7uvukvjf144aqujtsj6g84sr6o.apps.googleusercontent.com"
      },
      renderParams: {
        width: 280,
        height: 38,
        longtitle: true
      }
    }
  },
  methods: {
    toRegister() {
      this.$emit('emitRegister');
    },
    login() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
        email: this.loginEmail,
        password: this.loginPassword,
      }
      })
      .then(res =>  {
        localStorage.access_token = res.data.access_token;
        localStorage.user = res.data.name;
        this.$emit('emitLogin');
      })
      .catch(err => {
        console.log(err);
        swal(err.message, {
          icon: "warning",
        });
      })
    },
    onSuccess(googleUser) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login/google',
        headers: {
          googletoken: googleUser.wc.id_token
        }
      })
      .then(res =>  {
        this.loginEmail = res.data.email;
        this.loginPassword = 'google';
        this.login();
      })
      .catch(err => {
        console.log(err);
        swal(err.message, {
          icon: "warning",
        });
      })
      
    },
  }
}
</script>

<style scoped>
  .login-form {
    width: 340px;
    margin: 50px auto;
    font-size: 15px;
  }

  .login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
  }
</style>
<template>
  <div>
      <h1 class="text-center mt-5">Kanban App</h1>
      <div class="form">
        <form @submit.prevent="register()">
          <h2 class="text-center">Create Account</h2>
          <div class="form-group mt-4">
            <label>Name</label>
            <input type="text" class="form-control" v-model="registerName">
          </div>
          <div class="form-group mt-4">
            <label>Email address</label>
            <input type="email" class="form-control" v-model="registerEmail">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="registerPassword">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">register</button>
          </div>
          <div class="text-center mt-5">
            <p>Already have an account?</p>
            <a href="" role="button" @click.prevent="toLogin()">Log in</a>
          </div>
        </form>
      </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      registerName: '',
      registerEmail: '',
      registerPassword: ''
    }
  },
  methods: {
    toLogin() {
      this.$emit('emitToLogin');
    },
    register() {
      axios({
        method: 'POST',
        url: 'https://kanban-ap.herokuapp.com/register',
        data: {
          name: this.registerName,
          email: this.registerEmail,
          password: this.registerPassword,
        }
      })
      .then(res => {
        this.toLogin();
      })
      .catch(err => {
        console.log(err);
        swal(err.message, {
          icon: "warning",
        });
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
</style>
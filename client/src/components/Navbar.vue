<template>
  <nav class="navbar navbar-expand-lg d-flex justify-content-between" style="background-color: #e3f2fd;">
    <a class="navbar-brand font-weight-bold">Kanban</a>
    <span style="font-family: 'Lobster', cursive; font-size: 30px;" v-if="page === 'dashboard'">Hallo {{ user }}</span>
    <button class="btn btn-outline-danger my-2 my-sm-0" v-if="page === 'dashboard'" @click.prevent="logout()">Logout</button>
  </nav>
</template>

<script>
export default {
  props: ['page', 'user'],
  methods: {
    logout() {
      localStorage.clear();
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut()
      this.$emit('emitLogout');
    }
  },
}
</script>
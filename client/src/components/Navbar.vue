<template>
  <nav class="navbar navbar-expand-lg d-flex justify-content-between" style="background-color: #e3f2fd;">
    <a class="navbar-brand font-weight-bold">Kanban</a>
    <form class="form-inline my-2 my-lg-0" v-if="page === 'dashboard'">
      <button class="btn btn-outline-danger my-2 my-sm-0" @click.prevent="logout()">Logout</button>
    </form>
  </nav>
</template>

<script>
export default {
  props: ['page'],
  methods: {
    logout() {
      this.$emit('emitLogout');
    }
  }
}
</script>
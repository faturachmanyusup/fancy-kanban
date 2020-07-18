<template>
  <div class="card m-2">
    <div class="card-body" style="margin-bottom: -13px;">
      <p class="card-text">{{ task.title }}</p>
      <div class="card-footer bg-transparent text-muted d-flex justify-content-between align-items-center p-0">
        <div class="pt-1">
          <span style="font-size: 15px;">{{ date }}</span><br>
          <b-button phill size="sm" variant="link" v-b-modal.modal-edit @click="showEdit()">
            <i class="fa fa-pencil text-left" style="font-color: black; font-size: 15px; cursor:pointer;"></i>
          </b-button>
          <b-button phill size="sm" variant="link" v-b-modal.modal-edit @click="drop()">      
            <i class="fa fa-trash-o" style="font-size: 15px; cursor:pointer;"></i>
          </b-button>
        </div>
        <p style="margin-bottom: -3px;">{{ task.User.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import swal from 'sweetalert';

export default {
  props: ['task'],
  methods: {
    drop() {
      swal({
        title: "Are you sure?",
        text: "This task will be delete permanently",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(deleted => {
        if (deleted) {
          return axios({
            method: 'DELETE',
            url: `https://kanban-ap.herokuapp.com/tasks/${this.task.id}`,
            headers: {
              access_token: localStorage.access_token
            },
          })
        }
      })
      .then(res => {
        if (res) {
          swal("Task has been deleted!", {
            icon: "success",
          });
          this.$emit('emitDropTask', {id: this.task.id});
        }
      })
      .catch(err => {
        console.log(err);
        swal(err.message, {
          icon: "warning",
        });
      })
    },
    showEdit() {
      this.$emit('emitShowUpdate', this.task);
    }
  },
  computed: {
    date: function () {
      let createdAt = new Date(this.task.createdAt);
      const day = createdAt.getDate() > 9 ? createdAt.getDate() : `0${createdAt.getDate()}`;
      const month = createdAt.getMonth() + 1 > 9 ? createdAt.getMonth() : `0${createdAt.getMonth() + 1}`;
      const year = createdAt.getFullYear();
      return createdAt = `${day}-${month}-${year}`;
    }
  }
}
</script>
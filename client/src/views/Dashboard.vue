<template>
  <div class="container-fluid" style="max-width: 90%;">
    <div class="d-flex justify-content-between mt-4">
      <Board
        v-for="(category, i) in categories"
        :key="i"
        :category="category"
        :tasks="tasks"
        @emitDropTask="dropTask"
        @emitAddTask="fetchTask"
        @emitShowUpdate="showUpdateTask">
      </Board>
      <Modal v-if="isShowUpdate" :task='task' @disableShowEdit="disableShowEdit" @updateTask="updateTask"></Modal>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Board from '../components/Board.vue';
import Modal from '../components/Modal.vue';
import swal from 'sweetalert';

export default {
  components: {
    Board,
    Modal
  },
  data() {
    return {
      categories: ['Backlog', 'Product', 'Development', 'Done'],
      tasks: null,
      isShowUpdate: false,
      task: null,
    }
  },
  created() {
    this.fetchTask();
  },
  methods: {
    fetchTask() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/tasks',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(tasks => {
        this.tasks = tasks.data;
      })
      .catch(err => {
        console.log(err);
        swal(err.message, {
          icon: "warning",
        });
      })
    },
    dropTask(value) {
      this.tasks = this.tasks.filter(element => element.id !== value.id);
    },
    showUpdateTask(task) {
      this.task = task;
      this.isShowUpdate = true;
    },
    disableShowEdit() {
      this.isShowUpdate = false;
    },
    updateTask() {
      this.fetchTask();
    }
  }
}
</script>
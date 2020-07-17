<template>
  <div class="container-fluid" style="max-width: 90%;">
    <div class="d-flex justify-content-between mt-4">
      <Board v-for="(category, i) in categories" :key="i" :category="category" :tasks="tasks" @emitDropTask="dropTask" @emitAddTask="addTask" @emitShowUpdate="showUpdateTask"></Board>
      <Modal v-if="isShowUpdate" :task='task' @disableShowEdit="disableShowEdit" @emitRefetch="fetchTask"></Modal>
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
        url: 'https://kanban-ap.herokuapp.com/tasks',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(tasks => {
        this.tasks = tasks.data;
        
      })
      .catch(err => {
        console.log(err);
      })
    },
    dropTask(value) {
      this.tasks = this.tasks.filter(element => element.id !== value.id);
    },
    addTask() {
      this.fetchTask();
    },
    showUpdateTask(task) {
      this.task = task;
      this.isShowUpdate = true;
    },
    disableShowEdit() {
      this.isShowUpdate = false;
    }
  }
}
</script>
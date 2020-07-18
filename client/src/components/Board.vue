<template>
  <div>
    <div class="card text-dark" style="width: 20rem; background-color: #dae7f0">
      <div class="card-header" style="background-color: #a6bbca; height: 50px;">
        <h6 class="font-weight-bold pt-1">{{ category }}</h6>
      </div>

      <div v-if="category === 'Backlog' && backlog.length > 0" class="scroll">
        <Card v-for="task in backlog" :key="task.id" :task='task' @emitDropTask="dropTask" @emitShowUpdate="showUpdate"></Card>  
      </div>

      <div v-else-if="category === 'Product' && product.length > 0" class="scroll">
        <Card v-for="task in product" :key="task.id" :task='task' @emitDropTask="dropTask" @emitShowUpdate="showUpdate"></Card>
      </div>

      <div v-else-if="category === 'Development' && development.length > 0" class="scroll">
        <Card v-for="task in development" :key="task.id" :task='task' @emitDropTask="dropTask" @emitShowUpdate="showUpdate"></Card>  
      </div>

      <div v-else-if="category === 'Done' && done.length > 0" class="scroll">
        <Card v-for="task in done" :key="task.id" :task='task' @emitDropTask="dropTask" @emitShowUpdate="showUpdate"></Card>  
      </div>

      <div class="card-footer bg-transparent text-muted">
        <form @submit.prevent="addTask()">
          <input class="bg-transparent border-0" v-model="text" type="text" placeholder="Add a task..."/>
          <input type="submit" hidden/>
        </form>
      </div>

    </div>
  </div>
</template>

<script>

import Card from '../components/Card.vue';
import axios from 'axios';
import swal from 'sweetalert';

export default {
  components: {
    Card
  },
  data() {
    return {
      text: ''
    }
  },
  props: ['category', 'tasks'],
  computed: {
    backlog: function () {
      if (this.tasks) {
        return this.tasks.filter(item => item.category === 'Backlog');
      } else {
        return [];
      }
    },
    product: function () {
      if (this.tasks) {
        return this.tasks.filter(item => item.category === 'Product');
      } else {
        return [];
      }
    },
    development: function () {
      if (this.tasks) {
        return this.tasks.filter(item => item.category === 'Development');
      } else {
        return [];
      }
    },
    done: function () {
      if (this.tasks) {
        return this.tasks.filter(item => item.category === 'Done');
      } else {
        return [];
      }
    }
  },
  methods: {
    dropTask(value) {
      this.$emit('emitDropTask', value);
    },
    addTask() {
      axios({
        method: 'POST',
        url: 'https://kanban-ap.herokuapp.com/tasks',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.text,
          category: this.category,
        }
      })
      .then(tasks => {
        this.text = '';
        this.$emit('emitAddTask');
      })
      .catch(err => {
        console.log(err);
        swal(err.message, {
          icon: "warning",
        });
      })
    },
    showUpdate(task) {
      console.log(task);
      this.$emit('emitShowUpdate', task);
    }
  }
};
</script>

<style scoped>
  .scroll {
    max-height: 500px;
    overflow: auto;
  }
</style>
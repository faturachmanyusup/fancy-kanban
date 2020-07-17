<template>
  <div>
    <b-modal no-stacking hide-backdrop content-class="shadow" id="modal-edit" ref="modal" title="Edit Task" @ok="editTask()" @show="getTask()" @hidden="disableModal()">
      <form ref="form" @submit.prevent="editTask()">
        <b-form-group invalid-feedback="text is required" label="Name">
          <b-form-input v-model="title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Category">
          <b-form-select v-model="category" :options="categories"></b-form-select>
        </b-form-group>
      </form>
    </b-modal>
    
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    data() {
      return {
        title: '',
        category: '',
        categories: [
          {value: 'Backlog', text: 'Backlog'},
          {value: 'Product', text: 'Product'},
          {value: 'Development', text: 'Development'},
          {value: 'Done', text: 'Done'},
        ]
      }
    },
    props: ['task'],
    methods: {
      disableModal() {
        this.title = '';
        this.$emit('disableShowEdit');
      },
      getTask(task) {
        console.log("this.title", this.title);
        console.log("this.task.title", this.task.title);
        axios({
          method: 'GET',
          url: `http://localhost:3000/tasks/${this.task.id}`,
          headers: {
            access_token: localStorage.access_token
          },
        })
        .then(res => {
          this.title = res.data.title;
          this.category = res.data.category;
        })
        .catch(err => {
          console.log(err);
        })
      },
      editTask(task) {
        axios({
          method: 'PATCH',
          url: `https://kanban-ap.herokuapp.com/tasks/${this.task.id}`,
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            id: this.task.id,
            title: this.title,
            category: this.category,
          }
        })
        .then(res => {
          swal("Task has been edited!", {
            icon: "success",
          });
          this.$emit('emitRefetch');
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
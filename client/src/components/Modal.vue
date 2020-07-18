<template>
  <div>

    <b-modal
      no-close-on-backdrop
      no-stacking
      hide-backdrop
      content-class="shadow"
      id="modal-edit"
      ref="modal"
      title="Edit Task"
      @ok="editTask()"
      @show="getTask()"
      @cancel="disableModal()"
      @esc="disableModal()"
      @close="disableModal()"
    >
      <form ref="form" @submit.stop.prevent="editTask()">
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
  import swal from 'sweetalert';

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
        axios({
          method: 'GET',
          url: `https://kanban-ap.herokuapp.com/tasks/${this.task.id}`,
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
          swal(err.message, {
            icon: "warning",
          });
        })
      },
      editTask() {
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
          this.$emit('updateTask');
          this.disableModal();
          console.log('im in Modal');
        })
        .then(() => {
          swal("Task has been edited!", {
            icon: "success",
          });
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
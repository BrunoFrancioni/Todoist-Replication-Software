<template>
  <b-col class="" cols="12" md="8">
    <h1>Today</h1>
    <hr />

    <tasks v-if="tasks.length > 0" v-bind:tasks="tasks" />
    <p v-else>No tasks for today.</p>
  </b-col>
</template>

<script>
import tasksServices from '../_services/tasks-services'
import Tasks from '../components/TasksComponents/Tasks'

export default {
  name: 'Today',
  components: {
    Tasks
  },
  data() {
    return {
      tasks: []
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      const iduser = this.$parent.userInfo.iduser;
      const options = {
        deleted: false,
        project: true,
        today: true
      }

      const result = await tasksServices.GetUserTasks(iduser, options);
      console.log(result);
      if(result.status === 200) {
        this.tasks = result.data.tasks;
      }
    }
  }
}
</script>

<style>

</style>
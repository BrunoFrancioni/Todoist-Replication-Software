<template>
  <b-col cols="12" md="8">
    <h1>Upcoming</h1>
    <hr />

    <tasks v-if="tasks.length > 0" v-bind:tasks="tasks" />
    <p v-else>No tasks upcoming.</p>
  </b-col>
</template>

<script>
import Tasks from '../components/TasksComponents/Tasks'
import tasksServices from '../_services/tasks-services'

export default {
  name: 'Upcoming',
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

      const result = await tasksServices.GetUpcomingUserTasks(iduser);
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
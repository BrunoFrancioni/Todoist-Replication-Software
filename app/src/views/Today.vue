<template>
  <b-col class="" cols="12" md="8">
    <h1>Today <span class="h6 text-secondary">{{today }}</span></h1>
    
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
      tasks: [],
      today: (new Date()).toUTCString().slice(0, 11)
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      const iduser = this.$parent.userInfo.iduser;

      const result = await tasksServices.GetTodayUserTasks(iduser);
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
<template>
  <div>
    <h1>{{ project.title }}</h1>
    <hr />

    <tasks v-if="tasks.length > 0" v-bind:tasks="tasks" />
    <p v-else>No tasks for this project.</p>
  </div>
</template>

<script>
import tasksServices from '../_services/tasks-services'
import Tasks from '../components/TasksComponents/Tasks'

export default {
    name: 'Project',
    components: {
        Tasks
    },
    props: ['project'],
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
            const result = await tasksServices.GetProjectTasks(project.idproject);
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
<template>
  <div>
    <tasks v-if="tasks.length > 0" v-bind:tasks="tasks" />
    <p v-else>No tasks in Inbox.</p>
  </div>
</template>

<script>
import Tasks from './TasksComponents/Tasks'
import tasksServices from '../_services/tasks-services'

export default {
    name: 'ProjectTasks',
    props: ['idproject'],
    components: {
        Tasks
    },
    data() {
        return {
            tasks: []
        }
    },
    created() {
    },
    methods: {
        async getTasks(newValue) {
            const result = await tasksServices.GetProjectTasks(newValue);
            
            if(result.status === 200) {
                return result.data.tasks;
            }
        }
    },
    watch: {
        idproject: async function(newValue, oldValue) {
            console.log(newValue, oldValue);
            this.tasks = await this.getTasks(newValue);
        }
    }
}
</script>

<style>

</style>
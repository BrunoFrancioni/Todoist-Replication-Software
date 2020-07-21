<template>
    <b-col cols="12" md="8">
    <h1>Deleted Tasks</h1>
    <hr />

    <listDeletedTasks v-if="tasks.length > 0" v-bind:tasks="tasks" />
    <p v-else>No deleted tasks.</p>
  </b-col>
</template>

<script>
import tasksServices from '../_services/tasks-services'

import ListDeletedTasks from '../components/TasksComponents/ListDeletedTasks'

export default {
    name: 'DeletedTasks',
    components: {
        ListDeletedTasks
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
            const result = await tasksServices.GetDeletedTasks(this.$parent.userInfo.iduser);

            if(result.status === 200) {
                this.tasks = result.data.tasks;
            }
        }
    }
}
</script>

<style>

</style>
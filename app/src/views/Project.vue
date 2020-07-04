<template>
  <div>
    <h1>{{ project.title }}</h1>
    <hr />

    <tasks v-if="tasks.length > 0" v-bind:tasks="tasks" />
    <p v-else>No tasks for this project.</p>
  </div>
</template>

<script>
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

        }
    }
}
</script>

<style>

</style>
<template>
  <b-col cols="12" md="8">
    <h1>{{ title }}</h1>
    <hr />

    <projectTasks v-bind:idproject="idproject" />
  </b-col>
</template>

<script>
//import tasksServices from '../_services/tasks-services'
//import Tasks from '../components/TasksComponents/Tasks'
import ProjectTasks from '../components/ProjectTasks'

export default {
    name: 'Project',
    props: ['idproject', 'title'],
    components: {
        ProjectTasks
    },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        
    },
    watch: {
        
    }
}
</script>

<style>

</style>
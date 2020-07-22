<template>
    <b-col cols="12" md="8">
        <h1>Archived Projects</h1>
        
        <hr />

        <p v-if="projects.length === 0">No archived projects.</p>
        <archivedProject
            v-else
            v-for="project in projects"
            :key="project.idproject"
            v-bind:project="project"
            @resetArchivedProjects="getProjects"
        />
  </b-col>
</template>

<script>
import projectServices from '../../_services/project-services'

import ArchivedProject from '../../components/ProjectsComponents/ArchivedProject'

export default {
    name: 'ArchivedProjects',
    components: {
        ArchivedProject
    },
    data() {
        return {
            projects: []
        }
    },
    created() {
        this.getProjects();
    },
    methods: {
        async getProjects() {
            const result = await projectServices.GetProjects(this.$parent.userInfo.iduser, true);
            console.log(result);
            if(result.status === 200) {
                this.projects = result.data.projects;
            }
        }
    }
}
</script>

<style>

</style>
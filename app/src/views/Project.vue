<template>
  <b-col cols="12" md="8">
    <b-row cols="2">
      <b-col md="10">
        <h1>{{ title }}</h1>
      </b-col>

      <b-col md="2" class="mt-3">
        <i 
          class="fas fa-pencil-alt cursor" 
          @click="showEditProjectModal" 
          v-b-tooltip.hover title="Edit project"
        ></i>

        <i 
          class="fas fa-trash-alt ml-3 cursor"
          @click="deleteProject"
          v-b-tooltip.hover title="Delete project"
        ></i>
      </b-col>
    </b-row>
    
    <hr />

    <projectTasks 
      ref="projectTasks"
      v-bind:idproject="idproject" 
    />

    <editProjectModal
      v-bind:showEditProject="showEditProject"
      v-bind:editProjectModal="editProjectModal"
      @closeModal="closeModal"
      @refreshProject="refreshProject"
    />
  </b-col>
</template>

<script>
import projectServices from '../_services/project-services'

import ProjectTasks from '../components/ProjectTasks'
import EditProjectModal from '../components/Modals/ProjectModals/EditProjectModal'

export default {
    name: 'Project',
    props: ['idproject', 'title', 'archived'],
    components: {
      ProjectTasks,
      EditProjectModal
    },
    data() {
      return {
        showEditProject: false,
        editProjectModal: {
          title: '',
          archived: false
        }
      }
    },
    methods: {
      showEditProjectModal() {
        this.editProjectModal = {
          title: this.title,
          archived: this.archived
        }

        this.showEditProject= true;
      },
      closeModal() {
        this.editProjectModal = {
          title: '',
          archived: false
        }

        this.showEditProject = false;
      },
      refreshProject(newTitle) {
        this.$router.push({ name: 'Project', params: { idproject: this.idproject, title: newTitle, archived: this.archived } });
      },
      resetProjectsOfTheSidebar() {
        this.$emit('resetSidebarProjects');
      },
      async deleteProject() {
        const result = await projectServices.DeleteProject(this.idproject);

        if(result.status !== 200) {
          this.$parent.Toast.fire({
            icon: 'error',
            title: 'An error has occurred'
          });
        } else {
          this.resetProjectsOfTheSidebar();
          this.$router.push('/');

          this.$parent.Toast.fire({
            icon: 'success',
            title: 'Project deleted succesfully'
          });
        }
      }
    }
}
</script>

<style>

</style>
<template>
    <div class="ml-4 mr-3" v-if="project !== null && project !== undefined">
        <b-row align-h="between">
            <b-col cols="6" md="4">
                <p>{{ project.title }}</p>
            </b-col>
                
            <b-col cols="6" md="4">
                <b-row align-h="end">
                    <i
                        class="fas fa-arrow-up cursor mr-3"
                        v-b-tooltip.hover title="Retrieve project"
                        @click="saveProject"
                    ></i>
                </b-row>
            </b-col>
        </b-row>

      <hr>
  </div>
</template>

<script>
import projectServices from '../../_services/project-services'

export default {
    name: 'ArchivedProject',
    props: ['project'],
    methods: {
        async saveProject() {
            const result = await projectServices.EditProject(this.project.idproject, { archived: false });

            if(result.status === 200) {
                this.$parent.$parent.resetSidebarProjects();
                this.$emit('resetArchivedProjects');

                this.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Project retrieved succesfully'
                });
            } else {
                this.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            }
        }
    }
}
</script>

<style>
.color-red {
    color: #d1453b;
}
.cursor:hover {
    cursor: pointer;
    background-color:#cec4b4!important;
    border-radius: 2px;
    padding: 5px;
}
</style>
<template>
    <b-modal
        v-model="showCreateProjectModal"
        size="lg"
        @hidden="resetModal"
        no-close-on-esc
        no-close-on-backdrop
    >
        <template v-slot:modal-header>
            <h3>Create Project</h3>
            <b-button-close @click="closeModal"></b-button-close>
        </template>

        <div>
            <b-form @submit="submitProject" @reset="resetModal">
            <b-form-group
                id="input-group-1"
                label="Project title:"
                label-for="title"
            >
                <b-form-input
                id="title"
                v-model="createProject.title"
                type="text"
                required
                placeholder="Enter project title"
                ></b-form-input>
            </b-form-group>

            <b-form-group>
                <b-button type="reset" variant="danger" class="mr-2">Reset</b-button>
                <b-button type="submit" variant="primary">Create project</b-button>
            </b-form-group>
            
            </b-form>
        </div>

        <template v-slot:modal-footer>
            <b-button variant="" @click="closeModal">Close</b-button>
        </template>
    </b-modal>
</template>

<script>
import projectServices from '../../../_services/project-services'

export default {
    name: 'CreateProjectModal',
    props: ['showCreateProjectModal'],
    data() {
        return {
            createProject: {
                title: ''
            }
        }
    },
    methods: {
        resetModal() {
            this.createProject = {
                title: ''
            }
        },
        closeModal() {
            this.resetModal();
            this.$parent.showCreateProjectModal = false;
        },
        async submitProject(evt) {
            evt.preventDefault();
            this.createProject.iduser = this.$parent.$parent.userInfo.iduser;

            const result = await projectServices.CreateProject(this.createProject);

            if(result.status !== 201) {
                console.log(result);

                this.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            } else {
                this.$parent.getProjects();
                this.$parent.showCreateProjectModal = false;
                this.resetModal();

                this.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Project created succesfully'
                });
            }
        }
    }
}
</script>

<style>

</style>
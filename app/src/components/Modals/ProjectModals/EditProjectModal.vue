<template>
    <b-modal
        v-model="showEditProject"
        size="lg"
        @hidden="closeModal"
        no-close-on-esc
        no-close-on-backdrop
    >
        <template v-slot:modal-header>
            <h3>Edit Project</h3>
            <b-button-close @click="closeModal"></b-button-close>
        </template>

        <div>
            <b-form @submit="saveProject">
                <b-form-group
                    id="input-group-1"
                    label="Label title:"
                    label-for="title"
                >
                    <b-form-input
                        id="title"
                        v-model="editProjectModal.title"
                        type="text"
                        required
                        placeholder="Enter label name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-2"
                    label="Project archived"
                    label-for="archived"
                >
                    <b-form-select
                        id="archived"
                        v-model="editProjectModal.archived"
                        :options="archivedOptions"
                    ></b-form-select>
                </b-form-group>

                <b-form-group>
                    <b-button type="submit" variant="primary">Save project</b-button>
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
    name: 'EditProjectModal',
    props: ['showEditProject', 'editProjectModal'],
    data() {
        return {
            archivedOptions: [
                { text: 'Not archived', value: false },
                { text: 'Archived', value: true }
            ]
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        async saveProject(evt) {
            evt.preventDefault();

            const result = await projectServices.EditProject(this.$parent.idproject, this.editProjectModal);

            if(result.status !== 200) {
                this.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            } else {
                if(this.editProjectModal.archived === true) {
                    this.closeModal();
                    this.$parent.resetProjectsOfTheSidebar();
                    this.$router.push('/');
                } else {
                    this.$emit('refreshProject', this.editProjectModal.title);
                    this.$parent.resetProjectsOfTheSidebar();
                    this.closeModal();
                }

                this.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Project edited succesfully'
                });
            }
        }
    }
}
</script>

<style>

</style>
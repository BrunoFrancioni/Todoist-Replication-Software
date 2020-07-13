<template>
    <b-modal 
        size="lg"
        v-model="showEditModal"
        @hidden="closeEditModal"
        no-close-on-esc
        no-close-on-backdrop
    >
        <template v-slot:modal-header>
            <h3>Edit task</h3>
            <b-button-close @click="closeEditModal"></b-button-close>
        </template>

        <div>
            <b-form @submit="saveTask" @reset="resetEditModal" v-if="showEditModal">
                <b-form-group
                    id="input-group-1"
                    label="Task title:"
                    label-for="title"
                >
                    <b-form-input
                        id="title"
                        v-model="modalEditTask.title"
                        type="text"
                        required
                        placeholder="Enter task title"
                    ></b-form-input>
                </b-form-group>

                <b-form-group 
                    id="input-group-2" 
                    label="Content:" 
                    label-for="content"
                >
                    <b-form-textarea
                        id="content"
                        v-model="modalEditTask.content"
                        placeholder="Enter the content"
                    ></b-form-textarea>
                </b-form-group>

                <b-form-group 
                    id="input-group-3" 
                    label="Project:" 
                    label-for="project"
                >
                    <b-form-select
                        id="project"
                        v-model="modalEditTask.idproject"
                        :options="this.$parent.$parent.$parent.projectOptions"
                    ></b-form-select>
                </b-form-group>

                

                <b-form-group 
                    id="input-group-5" 
                    label="Date:"
                >
                    <b-form-datepicker 
                        v-model="modalEditTask.day" 
                        :min="today" 
                        v-once
                        required
                    >
                    </b-form-datepicker>
                </b-form-group>

                <b-form-group id="input-group-6" label="Time:">
                    <b-form-timepicker v-model="modalEditTask.time">

                    </b-form-timepicker>
                </b-form-group>

                <b-form-group>
                    <b-button type="submit" variant="primary">Save</b-button>
                </b-form-group>
            
            </b-form>
        </div>

        <template v-slot:modal-footer>
            <b-button variant="" @click="closeEditModal">Close</b-button>
        </template>
    </b-modal>
</template>

<script>
//import tasksServices from '../../../_services/tasks-services'

export default {
    name: 'EditTaskModal',
    props: ['showEditModal', 'modalEditTask', 'oldTags'],
    data() {
        return {
            today: (new Date()).toISOString().slice(0, 10)
        }
    },
    methods: {
        resetEditModal() {
            this.$emit('resetEditModal');
        },
        closeEditModal() {
            this.$emit('closeEditModal');
        },
        async saveTask(evt) {
            evt.preventDefault();


        }
    }
}
</script>

<style>

</style>
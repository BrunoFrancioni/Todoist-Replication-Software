<template>
    <b-modal 
        size="lg"
        v-model="showRetrieveModal"
        @hidden="closeModal"
        no-close-on-esc
        no-close-on-backdrop
    >
        <template v-slot:modal-header>
            <h3>Edit task</h3>
            <b-button-close @click="closeModal"></b-button-close>
        </template>

        <div>
            <b-form @submit="saveTask" v-if="showRetrieveModal">
                <b-form-group
                    id="input-group-1"
                    label="Task title:"
                    label-for="title"
                >
                    <b-form-input
                        id="title"
                        v-model="retrieveModal.title"
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
                        v-model="retrieveModal.content"
                        placeholder="Enter the content"
                    ></b-form-textarea>
                </b-form-group>

                <b-form-group 
                    id="input-group-5" 
                    label="Date:"
                >
                    <b-form-datepicker 
                        v-model="retrieveModal.day" 
                        :min="today" 
                        v-once
                        required
                    >
                    </b-form-datepicker>
                </b-form-group>

                <b-form-group id="input-group-6" label="Time:">
                    <b-form-timepicker v-model="retrieveModal.time">

                    </b-form-timepicker>
                </b-form-group>

                <b-form-group>
                    <b-button type="submit" variant="primary">Save</b-button>
                </b-form-group>
            
            </b-form>
        </div>

        <template v-slot:modal-footer>
            <b-button variant="" @click="closeModal">Close</b-button>
        </template>
    </b-modal>
</template>

<script>
import tasksServices from '../../../_services/tasks-services'

export default {
    name: 'RetrieveTaskModal',
    props: ['showRetrieveModal', 'retrieveModal'],
    data() {
        return {
            today: (new Date()).toISOString().slice(0, 10)
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        async saveTask(evt) {
            evt.preventDefault();

            const editedTask = {
                title: this.retrieveModal.title,
                content: this.retrieveModal.content,
                day: this.retrieveModal.day,
                time: this.retrieveModal.time,
                deleted: false
            }

            const result = await tasksServices.EditTask(this.retrieveModal.idtask, editedTask);
            if(result.status !== 200) {
                console.log(result);
                this.closeModal();

                this.$parent.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            } else {
                this.closeModal();

                this.$parent.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Task retrieved succesfully'
                });
            }

            this.$emit('getTasks');
        }
    }
}
</script>

<style>

</style>
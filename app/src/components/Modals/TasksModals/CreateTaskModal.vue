<template>
    <b-modal 
        size="lg"
        v-model="showCreateTaskModal" 
        title="Create Task"
        @hidden="resetModal"
        id="createTaskModal"
        >
        <div>
            <b-form @submit="submitTask" @reset="resetModal" v-if="showCreateTaskModal">
                <b-form-group
                    id="input-group-1"
                    label="Task title:"
                    label-for="title"
                >
                    <b-form-input
                    id="title"
                    v-model="createTask.title"
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
                    v-model="createTask.content"
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
                    v-model="createTask.idproject"
                    :options="this.$parent.projectOptions"
                    ></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-4" label="Tags:">
                    <b-form-checkbox-group v-model="tagsChecked" id="tags">
                    <b-form-checkbox 
                        v-for="(tag, index) in this.$parent.tagsOptions" 
                        :key="index"
                        :value="tag.value"
                    >{{ tag.text }}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>

                <b-form-group 
                    id="input-group-5" 
                    label="Date:"
                >
                    <b-form-datepicker 
                    v-model="createTask.day" 
                    :min="createTask.day" 
                    v-once
                    required
                    >

                    </b-form-datepicker>
                </b-form-group>
                
                <b-form-group id="input-group-6" label="Time:">
                    <b-form-timepicker v-model="createTask.time">

                </b-form-timepicker>
                </b-form-group>

                <b-form-group>
                    <b-button type="reset" variant="danger" class="mr-2">Reset</b-button>
                    <b-button type="submit" variant="primary">Create task</b-button>
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
import tasksTaggedServices from '../../../_services/tasks-tagged-services'

export default {
    name: 'CreateTaskModal',
    props: ['showCreateTaskModal'],
    data() {
        return {
            createTask: {
                iduser: null,
                idproject: null,
                title: null,
                content: null,
                day: new Date(),
                time: null
            },
            tagsChecked: []
        }
    },
    methods: {
        resetModal() {
            this.createTask = {
                iduser: null,
                idproject: null,
                title: null,
                content: null,
                day: new Date(),
                time: null
            }
            this.tagsChecked = [];
        },
        closeModal() {
            this.resetModal();
            this.$parent.showCreateTaskModal = false
        },
        async submitTask(evt) {
            evt.preventDefault();

            this.createTask.iduser = this.$parent.userInfo.iduser;

            if(this.createTask.time == '00:00:00') this.createTask.time = null;

            const result = await tasksServices.CreateTask(this.createTask);

            if(result.status !== 201) {
                console.log(result);
                this.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            } else {
                this.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Task created succesfully'
                });

                (this.tagsChecked).forEach(async (tag) => {
                const data = {
                    idtask: result.data.createdTask.idtask,
                    idtag: tag
                }
                
                const res = await tasksTaggedServices.CreateTaskTagged(data);

                if(res.status !== 201) {
                    console.log(res);
                    this.Toast.fire({
                        icon: 'error',
                        title: 'An error has occurred'
                    });
                }
                });

                this.resetModal();
                this.$parent.$refs.actualView.getTasks();
                this.$parent.showCreateTaskModal = false;
            }
        }
    }
}
</script>

<style>

</style>
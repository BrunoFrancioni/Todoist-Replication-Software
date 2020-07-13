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

                <b-form-group id="input-group-4" label="Tags:">
                    <b-form-checkbox-group v-model="modalEditTask.Tags" id="tags">
                        <b-form-checkbox 
                            v-for="(tag, index) in this.$parent.$parent.$parent.tagsOptions" 
                            :key="index"
                            :value="tag.value"
                            :checked="(tag.value in modalEditTask.Tags) ? true : false"
                        >{{ tag.text }}</b-form-checkbox>
                    </b-form-checkbox-group>
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
import tasksServices from '../../../_services/tasks-services'
import tasksTaggedServices from '../../../_services/tasks-tagged-services'

export default {
    name: 'EditTaskModal',
    props: ['showEditModal', 'modalEditTask', 'oldTags', 'oldTagsIds'],
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

            const editedTask = {
                idproject: this.modalEditTask.idproject,
                title: this.modalEditTask.title,
                content: this.modalEditTask.content,
                day: this.modalEditTask.day,
                time: this.modalEditTask.time 
            }

            const result = await tasksServices.EditTask(this.modalEditTask.idtask, editedTask);

            if(result.status !== 200) {
                console.log(result);
                this.closeEditModal();

                this.$parent.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            } else {
                (this.oldTags).forEach(async (tag) => {
                    if(this.modalEditTask.Tags.indexOf(tag.idtag) === -1) {
                        const result = await tasksTaggedServices.DeleteTaskTagged(tag.TasksTagged.idtasktagged);

                        if(result.status !== 200) {
                            console.log(result);
                            this.closeEditModal();

                            this.$parent.$parent.$parent.Toast.fire({
                                icon: 'error',
                                title: 'An error has occurred'
                            });
                        }
                    }
                });

                (this.modalEditTask.Tags).forEach(async (tag) => {
                    if(this.oldTagsIds.indexOf(tag) === -1) {
                        const result = await tasksTaggedServices.CreateTaskTagged({
                            idtask: this.modalEditTask.idtask,
                            idtag: tag
                        });

                        if(result.status !== 201) {
                            console.log(result);
                            this.closeEditModal();

                            this.$parent.$parent.$parent.Toast.fire({
                                icon: 'error',
                                title: 'An error has occurred'
                            });
                        }
                    }
                });

                this.closeEditModal();
                this.$parent.$parent.getTasks();

                this.$parent.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Task created succesfully'
                });
            }
        }
    }
}
</script>

<style>

</style>
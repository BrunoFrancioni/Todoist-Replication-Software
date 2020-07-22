<template>
    <div class="tasks">
        <div v-if="(tasks !== null) && (tasks !== undefined) && (tasks.length > 0)">
            <taskDeleted 
                v-for="task in tasks" 
                :key="task.length" 
                v-bind:task="task"
                @showRetrieveTaskModal="showRetrieveTaskModal"
            />
        </div>

        <retrieveTaskModal
            v-bind:showRetrieveModal="showRetrieveModal"
            v-bind:retrieveModal="retrieveModal"
            @closeModal="closeModal"
        />
    </div>
</template>

<script>
import TaskDeleted from './TaskDeleted'
import RetrieveTaskModal from '../Modals/TasksModals/RetrieveTaskModal'

export default {
    name: 'ListDeletedTasks',
    props: ['tasks'],
    components: {
        TaskDeleted,
        RetrieveTaskModal
    },
    data() {
        return {
            showRetrieveModal: false,
            retrieveModal: {
                idtask: null,
                idproject: null,
                title: '',
                content: '',
                day: (new Date()).toISOString().slice(0, 10),
                time: null,
                Tags: [],
                Project: { title: '', idproject: null }
            }
        }
    },
    methods: {
        showRetrieveTaskModal(task) {
            this.retrieveModal = {
                idtask: task.idtask,
                idproject: task.idproject,
                title: task.title,
                content: task.content,
                day: (new Date()).toISOString().slice(0, 10),
                time: task.time,
                Project: task.Project
            }

            this.showRetrieveModal = true;
        },
        closeModal() {
            this.retrieveModal = {
                idtask: null,
                idproject: null,
                title: '',
                content: '',
                day: null,
                time: null,
                Project: { title: '', idproject: null }
            }

            this.showRetrieveModal = false;
        }
    }
}
</script>

<style>

</style>
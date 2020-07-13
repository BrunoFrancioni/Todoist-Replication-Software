<template>
  <div class="tasks">
    <task 
      v-for="(task, index) in tasks" 
      :key="index" 
      v-bind:task="task" 
      @showInfoModal="displayInfoModal"
      @showEditModal="displayEditModal"
    />

    <showTaskModal
      v-bind:showInfoModal="showInfoModal"
      v-bind:modalInfoTask="modalInfoTask"
      @closeShowModal="closeShowModal"
    />

    <editTaskModal
      v-bind:showEditModal="showEditModal"
      v-bind:modalEditTask="modalEditTask"
      v-bind:oldTags="oldTags"
      v-bind:oldTagsIds="oldTagsIds"
      @resetEditModal="resetEditModal"
      @closeEditModal="closeEditModal"
    />

    
  </div>
</template>

<script>
import Task from './Task.vue'
import ShowTaskModal from '../Modals/TasksModals/ShowTaskModal'
import EditTaskModal from '../Modals/TasksModals/EditTaskModal'

export default {
  name: 'Tasks',
  components: {
    Task,
    ShowTaskModal,
    EditTaskModal
  },
  props: ['tasks'],
  data() {
    return {
      showInfoModal: false,
      showEditModal: false,
      modalInfoTask: {
        idproject: null,
        title: null,
        content: null,
        day: (new Date()).toUTCString().slice(0, 11),
        time: null,
        Tags: [],
        Project: { title: null, idproject: null }
      },
      modalEditTask: {
        idtask: null,
        idproject: null,
        title: null,
        content: null,
        day: null,
        time: null,
        Tags: [],
        Project: { title: null, idproject: null }
      },
      oldTags: [],
      oldTagsIds: [],
      months: {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Ago',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
      }
    }
  },
  methods: {
    displayInfoModal(task) {
      this.modalInfoTask = {
        idproject: task.idproject,
        title: task.title,
        content: task.content,
        day: task.day,
        time: task.time,
        Tags: task.Tags,
        Project: task.Project
      };

      this.showInfoModal = true;
    },
    displayEditModal(task) {
      this.modalEditTask = {
        idtask: task.idtask,
        idproject: task.idproject,
        title: task.title,
        content: task.content,
        day: task.day,
        time: task.time,
        Tags: [],
        Project: task.Project
      }
      
      if(task.Tags !== undefined && task.Tags.length !== 0) {
        (task.Tags).forEach(tag => {
          this.modalEditTask.Tags.push(tag.idtag);
          this.oldTagsIds.push(tag.idtag);
        })
        this.oldTags = task.Tags;
      }

      this.showEditModal = true;
    },
    resetEditModal() {
      this.modalEditTask = {
        idtask: null,
        idproject: null,
        title: null,
        content: null,
        day: null,
        time: null,
        Tags: [],
        Project: { title: null, idproject: null }
      }

      this.oldTags = [];
      this.oldTagsIds= [];
    },
    closeShowModal() {
      this.modalInfoTask = {
        idproject: null,
        title: null,
        content: null,
        day: (new Date()).toUTCString().slice(0, 11),
        time: null,
        Tags: [],
        Project: { title: '', idproject: ''}
      }
      
      this.showInfoModal = false;
    },
    closeEditModal() {
      this.resetEditModal();
      this.showEditModal = false;
    },
    getMonth(month) {
      return this.months[month];
    }
  }
}
</script>

<style>

</style>
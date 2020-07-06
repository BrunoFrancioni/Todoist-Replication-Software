<template>
  <div class="tasks">
    <task 
      v-for="(task, index) in tasks" 
      :key="index" 
      v-bind:task="task" 
      @showModal="displayModal"
    />

    <b-modal 
      size="lg"
      v-model="modalShow" 
      title="See details"
      @hidden="resetModal"
    >
      <div class="ml-3">
        <b-row  align-h="start">
          <input 
            type="checkbox" 
            class="mt-1 mr-sm-2 mb-sm-0" 
            v-model="modalTask.done" 
            
          >
        
          <p>{{ modalTask.title }}</p>
        </b-row>

        <b-row align-h="between">
          <b-col cols="6" md="4">
            <b-row align-h="start">
              <i class="far fa-calendar-alt mr-1 color-red"></i>
              <p class="mr-2 color-red">{{ getMonth(modalTask.day.slice(5,7))}}  {{ modalTask.day.slice(8) }}</p>
              <p v-if="modalTask.time !== null" class="color-red">{{ modalTask.time.slice(0,5) }} hrs.</p>
            </b-row>
          </b-col>
            
          <b-col cols="6" md="4">
            <b-row align-h="end" class="pr-3">
              <p v-if="modalTask.idproject === null" class="text-secondary">Inbox</p>
              <p v-else class="text-secondary">{{ modalTask.Project.title }}</p>
            </b-row>
          </b-col>
        </b-row>

        <b-row v-if="modalTask.Tags.length !== 0">
          <span 
            class="badge badge-warning mr-2"
            v-for="(tag, index) in modalTask.Tags"
            :key="index"
          >{{ tag.tagname }}</span>
        </b-row>

        <b-row 
          class="mt-3 mb-3"
          v-if="modalTask.content !== null">
          {{ modalTask.content }}
        </b-row>
      </div>
      
      <b-button variant="light" v-b-modal.modal-multi><i class="fas fa-pencil-alt"></i></b-button>

      <b-modal id="modal-multi" title="Second Modal" ok-only>
        <p class="my-2">Second Modal</p>
        
      </b-modal>
    </b-modal>
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  name: 'Tasks',
  components: {
    Task
  },
  props: ['tasks'],
  data() {
    return {
      modalShow: false,
      modalTask: {
        idtask: null,
        iduser: null,
        idproject: null,
        title: null,
        content: null,
        done: null,
        day: (new Date()).toUTCString().slice(0, 11),
        time: null,
        deleted: null,
        Tags: []
      },
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
    displayModal(task) {
      this.modalShow = true;
      this.modalTask = task;
    },
    resetModal() {
      this.modalTask = {
        idtask: null,
        iduser: null,
        idproject: null,
        title: null,
        content: null,
        done: null,
        day: (new Date()).toUTCString().slice(0, 11),
        time: null,
        deleted: null,
        Tags: []
      }
    },
    getMonth(month) {
      return this.months[month];
    }
  }
}
</script>

<style>

</style>
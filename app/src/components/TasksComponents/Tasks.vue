<template>
  <div class="tasks">
    <task 
      v-for="(task, index) in tasks" 
      :key="index" 
      v-bind:task="task" 
      @showInfoModal="displayInfoModal"
      @showEditModal="displayEditModal"
    />

    <b-modal 
      size="lg"
      v-model="modalShowInfo" 
      title="See details"
      @hidden="resetShowModal"
      ok-only
      ok-title="Close"
    >
      <div class="ml-3">
        <b-row  align-h="start">
          <p>{{ modalInfoTask.title }}</p>
        </b-row>

        <b-row align-h="between">
          <b-col cols="6" md="4">
            <b-row align-h="start">
              <i class="far fa-calendar-alt mr-1 color-red"></i>
              <p class="mr-2 color-red">{{ getMonth(modalInfoTask.day.slice(5,7))}}  {{ modalInfoTask.day.slice(8) }}</p>
              <p v-if="modalInfoTask.time !== null" class="color-red">{{ modalInfoTask.time.slice(0,5) }} hrs.</p>
            </b-row>
          </b-col>
            
          <b-col cols="6" md="4">
            <b-row align-h="end" class="pr-3">
              <p v-if="modalInfoTask.idproject === null" class="text-secondary">Inbox</p>
              <p v-else class="text-secondary">{{ modalInfoTask.Project.title }}</p>
            </b-row>
          </b-col>
        </b-row>

        <b-row v-if="modalInfoTask.Tags.length !== 0">
          <span 
            class="badge badge-warning mr-2"
            v-for="(tag, index) in modalInfoTask.Tags"
            :key="index"
          >{{ tag.tagname }}</span>
        </b-row>

        <b-row 
          class="mt-3 mb-3"
          v-if="modalInfoTask.content !== null">
          {{ modalInfoTask.content }}
        </b-row>
      </div>

    </b-modal>

    <b-modal 
      size="lg"
      v-model="modalShowEdit" 
      title="Edit task"
      @hidden="resetEditModal"
    >
      <div>
        <b-form @submit="saveTask" @reset="resetEditModal" v-if="modalShowEdit">
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
              :options="this.$parent.$parent.projectOptions"
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-4" label="Tags:">
            <b-form-checkbox-group v-model="modalEditTask.Tags" id="tags">
              <b-form-checkbox 
                v-for="(tag, index) in this.$parent.$parent.tagsOptions" 
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
            <b-button type="reset" variant="danger" class="mr-2">Reset</b-button>
            <b-button type="submit" variant="primary">Save</b-button>
          </b-form-group>
          
        </b-form>
      </div>

      <template v-slot:modal-footer>
        <b-button variant="" @click="modalShowEdit = false">Close</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Task from './Task.vue'
//import tasksServices from '../../_services/tasks-services'

export default {
  name: 'Tasks',
  components: {
    Task
  },
  props: ['tasks'],
  data() {
    return {
      modalShowInfo: false,
      modalShowEdit: false,
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
        iduser: null,
        idtask: null,
        idproject: null,
        title: null,
        content: null,
        day: null,
        time: null,
        Tags: [],
        Project: { title: null, idproject: null }
      },
      today: (new Date()).toISOString().slice(0, 10),
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
      this.modalShowEdit = false;
      this.resetEditModal();

      this.modalInfoTask.idproject = task.idproject;
      this.modalInfoTask.title = task.title;
      this.modalInfoTask.content = task.content;
      this.modalInfoTask.day = task.day;
      this.modalInfoTask.time = task.time;
      this.modalInfoTask.Tags = task.Tags;
      this.modalInfoTask.Project = task.Project;

      this.modalShowInfo = true;
    },
    displayEditModal(task) {
      this.modalShowInfo = false;
      this.resetShowModal();

      this.modalShowEdit = true;

      this.modalEditTask.idtask = task.idtask;
      this.modalEditTask.iduser = task.iduser;
      this.modalEditTask.idproject = task.idproject;
      this.modalEditTask.title = task.title;
      this.modalEditTask.content = task.content;
      this.modalEditTask.day = task.day;
      this.modalEditTask.time = task.time;
      this.modalEditTask.Project = task.Project;
      
      (task.Tags).forEach(tag => {
        this.modalEditTask.Tags.push(tag.idtag);
      });
    },
    resetShowModal() {
      this.modalInfoTask = {
        idproject: null,
        title: null,
        content: null,
        day: (new Date()).toUTCString().slice(0, 11),
        time: null,
        Tags: [],
        Project: { title: '', idproject: ''}
      }
    },
    resetEditModal() {
      this.modalEditTask = {
        iduser: null,
        idtask: null,
        idproject: null,
        title: null,
        content: null,
        day: null,
        time: null,
        Tags: [],
        Project: { title: null, idproject: null }
      }
    },
    getMonth(month) {
      return this.months[month];
    },
    async saveTask(evt) {
      evt.preventDefault();


    }
  }
}
</script>

<style>

</style>
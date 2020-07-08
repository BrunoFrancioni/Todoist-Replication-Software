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
      @hidden="resetModal"
      ok-only
      ok-title="Close"
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

    </b-modal>

    <b-modal 
      size="lg"
      v-model="modalShowEdit" 
      title="Edit task"
      @hidden="resetModal"
    >
      <div>
        <b-form @submit="saveTask" @reset="resetModal">
          <b-form-group
            id="input-group-1"
            label="Task title:"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="modalTask.title"
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
              v-model="modalTask.content"
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
              v-model="modalTask.idproject"
              :options="this.$parent.$parent.projectOptions"
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-4" label="Tags:">
            <b-form-checkbox-group v-model="modalTask.Tags" id="tags">
              <b-form-checkbox 
                v-for="(tag, index) in this.$parent.$parent.tagsOptions" 
                :key="index"
                :value="tag.value"
                :checked="(tag.value in modalTask.Tags) ? true : false"
              >{{ tag.text }}</b-form-checkbox>
            </b-form-checkbox-group>
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
    displayInfoModal(task) {
      this.modalShowInfo = true;
      this.modalTask = task;
    },
    displayEditModal(task) {
      this.modalShowEdit = true;

      this.modalTask.idtask = task.idtask;
      this.modalTask.iduser = task.iduser;
      this.modalTask.idproject = task.idproject;
      this.modalTask.title = task.title;
      this.modalTask.content = task.content;
      this.modalTask.done = task.done;
      this.modalTask.day = task.day;
      this.modalTask.deleted = task.deleted;
      
      (task.Tags).forEach(tag => {
        this.modalTask.Tags.push({text: tag.tagname, value: tag.idtag});
      });
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
    },
    async saveTask(evt) {
      evt.preventDefault();


    }
  }
}
</script>

<style>

</style>
<template>
  <div class="task ml-4 mr-3" v-if="task !== null && task !== undefined">
      <b-row align-h="between">
        <b-col cols="6" md="4">
          <b-row align-h="start">
            <input 
              type="checkbox" 
              class="control-input mt-1 mr-1"
              v-model="task.done" 
              @click="changeDoneStatus"
            >
            
            <p>{{ task.title }}</p>
          </b-row>
        </b-col>
          
        <b-col cols="6" md="4" align-h="start">
          <b-row align-h="end" class="pr-3">
            <i 
              class="fas fa-info mr-3 cursor" 
              @click="showInfoModal"
              v-b-tooltip.hover title="See details"  
            ></i>
            <i 
              class="fas fa-pencil-alt cursor" 
              @click="showEditModal" 
              v-b-tooltip.hover title="Edit task"
            ></i>
            <i 
              class="fas fa-trash-alt ml-3 cursor"
              @click="deleteTask"
              v-b-tooltip.hover title="Delete task"
            ></i>
          </b-row>
        </b-col>
      </b-row>

      <b-row align-h="between">
        <b-col cols="6" md="4">
          <b-row align-h="start">
            <i class="far fa-calendar-alt mr-1 color-red"></i>
            <p class="mr-2 color-red">{{ getMonth(task.day.slice(5,7))}}  {{ task.day.slice(8) }}</p>
            <p v-if="task.time !== null" class="color-red">{{ task.time.slice(0,5) }} hrs.</p>
          </b-row>
        </b-col>
          
        <b-col cols="6" md="4">
          <b-row align-h="end" class="pr-3">
            <p v-if="task.idproject === null" class="text-secondary">Inbox</p>
            <p v-if="task.Project !== null && task.Project !== undefined" class="text-secondary">{{ task.Project.title }}</p>
          </b-row>
        </b-col>
      </b-row>

      <b-row v-if="task.Tags.length !== 0">
        <span 
          class="badge badge-warning mr-2"
          v-for="(tag, index) in task.Tags"
          :key="index"
        >{{ tag.tagname }}</span>
      </b-row>
      <hr>
  
  </div>
</template>

<script>
import tasksServices from '../../_services/tasks-services'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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
    getMonth(month) {
      return this.months[month];
    },
    async changeDoneStatus() {
      const data = {
        'done': `${(this.task.done) ? false : true}`
      };
      console.log(data);
      
      const result = await tasksServices.EditTask(this.task.idtask, data);
      
      if(result.status !== 200) {
        this.$parent.$parent.$parent.Toast.fire({
          icon: 'error',
          title: 'An error has occurred'
        });

        if(this.task.done === false) {
          this.task.done = true;
        } else {
          this.task.done = false;
        }
      } else {
        this.$parent.$parent.$parent.Toast.fire({
          icon: 'success',
          title: 'Task edited succesfully'
        });
      }
    },
    showInfoModal() {
      this.$emit('showInfoModal', this.task);
    },
    showEditModal() {
      this.$emit('showEditModal', this.task);
    },
    async deleteTask() {
      const result = await tasksServices.DeleteTask(this.task.idtask);

      if(result.status !== 200) {
        this.$parent.$parent.$parent.Toast.fire({
          icon: 'error',
          title: 'An error has occurred'
        });
      } else {
        this.$parent.$parent.$parent.Toast.fire({
          icon: 'success',
          title: 'Task deleted succesfully'
        });

        this.$parent.$parent.getTasks();
      }
    }
  }
}
</script>

<style>
  .color-red {
    color: #d1453b;
  }
  .cursor:hover {
    cursor: pointer;
    background-color:#cec4b4!important;
    border-radius: 2px;
    padding: 5px;
  }
</style>
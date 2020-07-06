<template>
  <div class="task ml-4 mr-3" @click="showModal">
      <b-row align-h="between">
        <b-col cols="6" md="4">
          <b-row align-h="start">
            <!--  
            <b-form-checkbox 
              class="mb-2 mr-sm-2 mb-sm-0" 
              v-model="task.done"
              @click="changeDoneStatus"
            ></b-form-checkbox>
             -->
            
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
            <i class="fas fa-pencil-alt"></i>
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
            <p v-else class="text-secondary">{{ task.Project.title }}</p>
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
  props: ['task'],
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
        'done': `${this.task.done}`
      };
      console.log(data);
      
      const result = await tasksServices.EditTask(this.task.idtask, data);
      console.log(result);
      if(result.status !== 200) {
        console.log('Ocurrió un error');
        console.log(this.task.done);
        if(this.task.done === false) {
          this.task.done = true;
        } else {
          this.task.done = false;
        }
      }
      console.log(this.task.done);
    },
    showModal() {
      this.$emit('showModal', this.task);
    }
  }
}
</script>

<style>
  .color-red {
    color: #d1453b;
  }
  div.task:hover {
    cursor: pointer;
  }
</style>
<template>
  <div class="ml-4 mr-3">
      <b-row align-h="between">
        <b-col cols="6" md="4">
          <b-row align-h="start">
            <div @click="changeDoneStatus">
              <b-form-checkbox 
              class="mb-2 mr-sm-2 mb-sm-0" 
              v-model="task.done"
            ></b-form-checkbox>
            </div>
            
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
        done : `${this.task.done}`
      }
      console.log(typeof(this.task.done));
      const result = await tasksServices.EditTask(this.task.idtask, data);
      console.log(result);
      if(result.status !== 200) {
        console.log('Ocurrió un error');
        if(this.task.done === false) {
          this.task.done = true;
        } else {
          this.task.done = false;
        }
      }
    }
  }
}
</script>

<style>
  .color-red {
    color: #d1453b;
  }
</style>
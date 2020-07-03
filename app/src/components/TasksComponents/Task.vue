<template>
  <div class="task">
      <b-row align-h="between" >
        <b-col cols="6" md="4">
          <b-row class="mr-auto mr-md-auto" align-h="start">
            <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" :aria-checked="task.done"></b-form-checkbox>
            <p>{{ task.title }}</p>
          </b-row>
        </b-col>
        <b-col cols="6" md="4">
          <i class="fas fa-pencil-alt"></i>
        </b-col>
      </b-row>

      <b-row align-h="between" class="ml-8">
        <b-col cols="6" md="4">
          <b-row align-h="start">
            <i class="far fa-calendar-alt mr-1 color-red"></i>
            <p class="mr-2 color-red">{{ getMonth(task.day.slice(5,7))}}  {{ task.day.slice(8) }}</p>
            <p class="color-red">{{ task.time.slice(0,5) }} hrs.</p>
          </b-row>
        </b-col>

        <b-col class="ml-auto ml-md-auto" cols="6" md="4">
          <p v-if="task.idproject === null">Inbox</p>
          <p v-else>{{ task.Project.title }}</p>
        </b-col>
      </b-row>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style>
  .color-red {
    color: #d1453b;
  }
</style>
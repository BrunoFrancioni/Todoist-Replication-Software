<template>
  <div class="tasks">
    <task 
      v-for="(task, index) in tasks" 
      :key="index" 
      v-bind:task="task" 
    />
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
  name: 'Tasks',
  components: {
    Task
  },
  props: ['tasks']
}
</script>

<style>

</style>
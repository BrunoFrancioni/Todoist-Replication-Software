<template>
  <div class="tasks">
    <ul>
      <task 
      v-for="(task, index) in tasks" 
      :key="index" 
      v-bind:task="task" 
    />
    </ul>
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
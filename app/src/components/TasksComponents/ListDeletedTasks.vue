<template>
    <div class="tasks">
        <div v-if="(tasks !== null) && (tasks !== undefined) && (tasks.length > 0)">
            <taskDeleted 
                v-for="task in tasks" 
                :key="task.length" 
                v-bind:task="task"
            />
        </div>
    </div>
</template>

<script>
import TaskDeleted from './TaskDeleted'

export default {
    name: 'ListDeletedTasks',
    props: ['tasks'],
    components: {
        TaskDeleted
    }
}
</script>

<style>

</style>
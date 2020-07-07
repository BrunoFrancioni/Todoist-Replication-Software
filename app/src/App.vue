<template>
  <div id="app">
    <upbar 
      v-on:setHomePage="setToday"
      @showModal="showModal"  
    />

    <b-container>
      <div class="row">
        <sidebar ref="sidebar" />
        <transition>
          <router-view />
        </transition>
      </div>
    </b-container>

    <b-modal 
      size="lg"
      v-model="showCreateTaskModal" 
      title="Create Task"
      @hidden="resetModal"
    >
      <div>
        <b-form >
          <b-form-group
            id="input-group-1"
            label="Task title:"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="createTask.title"
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
            <b-form-input
              id="content"
              v-model="createTask.content"
              required
              placeholder="Enter the content"
            ></b-form-input>
          </b-form-group>

          

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import Upbar from './components/navbars/Upbar'
  import Sidebar from './components/navbars/Sidebar'

export default {
  name: 'App',
  components: {
    Upbar,
    Sidebar
  },
  data() {
    return {
      userInfo: JSON.parse(atob(process.env.VUE_APP_DEV_TOKEN.split('.')[1])),
      showCreateTaskModal: false,
      createTask: {
        iduser: null,
        idproject: null,
        title: null,
        content: null,
        day: new Date(),
        time: null
      }
    }
  },
  methods: {
    setToday() {
      this.$refs.sidebar.setActiveToday();
    },
    showModal(){
      this.showCreateTaskModal = true
    },
    resetModal() {
      this.createTask = {
        iduser: null,
        idproject: null,
        title: null,
        content: null,
        day: new Date(),
        time: null
      }
    }
  }
}
</script>

<style>
.bg-sidebar {
  background-color: #fafafa;
}
</style>

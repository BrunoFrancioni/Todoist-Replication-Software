<template>
  <div id="app">
    <upbar 
      v-on:setHomePage="setToday"
      @showModal="showModal"
      v-if="current !== '/login' && current !== '/signup'"
    />

    <b-container>
      <div class="row">
        <sidebar ref="sidebar" v-if="current !== '/login' && current !== '/signup'" />
        <transition>
          <router-view 
            ref="actualView" 
            @resetSidebarProjects="resetSidebarProjects"
          />
        </transition>
      </div>
    </b-container>

    <createTaskModal
      v-bind:showCreateTaskModal="showCreateTaskModal"
      v-if="current !== '/login' && current !== '/signup'"
    />
  </div>
</template>

<script>
import Upbar from './components/navbars/Upbar'
import Sidebar from './components/navbars/Sidebar'
import CreateTaskModal from './components/Modals/TasksModals/CreateTaskModal'

export default {
  name: 'App',
  components: {
    Upbar,
    Sidebar,
    CreateTaskModal
  },
  data() {
    return {
      userInfo: JSON.parse(atob(process.env.VUE_APP_DEV_TOKEN.split('.')[1])),
      showCreateTaskModal: false,
      projectOptions: [{text: 'Inbox', value: null}],
      tagsOptions: [],
      Toast: this.$swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer)
          toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        }
      })
    }
  },
  computed: {
    current() {
      return this.$route.path;
    }
  },
  methods: {
    setToday() {
      this.$refs.sidebar.setActiveToday();
    },
    async getProjects() {
      this.projectOptions = [{ text: 'Inbox', value: null }];
      
      (this.$refs.sidebar.projects).forEach(project => {
        this.projectOptions.push({ text: project.title, value: project.idproject });
      });
    },
    async getTags() {
      this.tagsOptions= [];
      
      (this.$refs.sidebar.labels).forEach(tag => {
        this.tagsOptions.push({ text: tag.tagname, value: tag.idtag });
      });
    },
    showModal(){
      this.showCreateTaskModal = true;
    },
    resetTasks() {
      this.$refs.actualView.getTasks();
    },
    resetSidebarProjects() {
      this.$refs.sidebar.getProjects();
    }
  }
}
</script>

<style>
.bg-sidebar {
  background-color: #fafafa;
}
</style>

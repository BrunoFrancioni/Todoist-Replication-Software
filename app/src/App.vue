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
          <router-view ref="actualView" />
        </transition>
      </div>
    </b-container>

    <b-modal 
      size="lg"
      v-model="showCreateTaskModal" 
      title="Create Task"
      @hidden="resetModal"
      id="createTaskModal"
    >
      <div>
        <b-form @submit="submitTask" @reset="resetModal" v-if="showCreateTaskModal">
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
            <b-form-textarea
              id="content"
              v-model="createTask.content"
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
              v-model="createTask.idproject"
              :options="projectOptions"
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-4" label="Tags:">
            <b-form-checkbox-group v-model="tagsChecked" id="tags">
              <b-form-checkbox 
                v-for="(tag, index) in tagsOptions" 
                :key="index"
                :value="tag.value"
              >{{ tag.text }}</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-form-group 
            id="input-group-5" 
            label="Date:"
          >
            <b-form-datepicker 
              v-model="createTask.day" 
              :min="createTask.day" 
              v-once
              required
            >

            </b-form-datepicker>
          </b-form-group>
          
          <b-form-group id="input-group-6" label="Time:">
            <b-form-timepicker v-model="createTask.time">

          </b-form-timepicker>
          </b-form-group>

          <b-form-group>
            <b-button type="reset" variant="danger" class="mr-2">Reset</b-button>
            <b-button type="submit" variant="primary">Create task</b-button>
          </b-form-group>
          
        </b-form>
      </div>

      <template v-slot:modal-footer>
        <b-button variant="" @click="$bvModal.hide('createTaskModal')">Close</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Upbar from './components/navbars/Upbar'
import Sidebar from './components/navbars/Sidebar'
import tasksServices from './_services/tasks-services'
import tasksTaggedServices from './_services/tasks-tagged-services'

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
      },
      projectOptions: [{text: 'Inbox', value: null}],
      tagsOptions: [],
      tagsChecked: [],
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
  methods: {
    setToday() {
      this.$refs.sidebar.setActiveToday();
    },
    async getProjects() {
      this.projectOptions = [{text: 'Inbox', value: null}];
      
      (this.$refs.sidebar.projects).forEach(project => {
        this.projectOptions.push({text: project.title, value: project.idproject});
      });
    },
    async getTags() {
      this.tagsOptions= [];
      
      (this.$refs.sidebar.labels).forEach(tag => {
        this.tagsOptions.push({text: tag.tagname, value: tag.idtag});
      });
    },
    showModal(){
      this.showCreateTaskModal = true;
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
      this.tagsChecked = [];
    },
    async submitTask(evt) {
      evt.preventDefault();

      this.createTask.iduser = this.userInfo.iduser;

      if(this.createTask.time == '00:00:00') this.createTask.time = null;

      const result = await tasksServices.CreateTask(this.createTask);

      if(result.status !== 201) {
        console.log(result);
        this.Toast.fire({
          icon: 'error',
          title: 'An error has occurred'
        });
      } else {
        this.Toast.fire({
          icon: 'success',
          title: 'Task created succesfully'
        });

        (this.tagsChecked).forEach(async (tag) => {
          const data = {
            idtask: result.data.createdTask.idtask,
            idtag: tag
          }
          
          const res = await tasksTaggedServices.CreateTaskTagged(data);

          if(res.status !== 201) {
            console.log(res);
            this.Toast.fire({
              icon: 'error',
              title: 'An error has occurred'
            });
          }
        });

        this.resetModal();
        this.$refs.actualView.getTasks();
        this.showCreateTaskModal = false;
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

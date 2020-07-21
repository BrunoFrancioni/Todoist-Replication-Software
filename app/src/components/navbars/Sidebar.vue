<template>
  <b-col class="row bg-sidebar mr-1" cols="6" md="4">
    <ul class="nav nav-pills flex-column pl-3 pt-2">
      <li class="nav-item form-inline" @click="setActiveInbox()">
        <i class="fas fa-inbox"></i>
        <router-link 
          to="/inbox" 
          class="nav-link text-dark"
          :class="{'font-weight-bold': inboxActive}"
        >Inbox</router-link>
      </li>
      <li class="nav-item form-inline" @click="setActiveToday()">
        <i class="fas fa-calendar-day"></i>
        <router-link 
          to="/" 
          class="nav-link text-dark"
          :class="{'font-weight-bold': todayActive}"
        >Today</router-link>
      </li>
      <li class="nav-item form-inline mb-2" @click="setActiveUpcoming()">
        <i class="far fa-calendar-alt"></i>
        <router-link 
          to="/upcoming" 
          class="nav-link text-dark"
          :class="{'font-weight-bold': upcomingActive}"
        >Upcoming</router-link>
      </li>

      <li class="nav-item form-inline mb-1">
        <i class="fas fa-sort-amount-down"></i>
        <span class="nav-link text-dark font-weight-bold">Projects</span>
      </li>

      <div class="ml-3 mb-3">
        <li v-if="projects.length === 0">
          <p>No projects yet !</p>
        </li>

        <li v-else v-for="(project, index) in projects" :key="index">
          <router-link
            :to="{ name: 'Project', params: { idproject: project.idproject, title: project.title, archived: project.archived } }"
            class="nav-link text-dark"
            @click="resetTasks"
            replace
          >{{ project.title }}</router-link>
        </li>

        <li>
          <b-link 
            class="text-secondary" 
            @click="showCreateProjectModal = true"
          ><i class="fas fa-plus"></i> <span>Add project</span></b-link>
        </li>
      </div>

      <li class="nav-item form-inline">
        <i class="fas fa-sort-amount-down"></i>
        <span class="nav-link text-dark font-weight-bold">Labels</span>
      </li>

      <div class="ml-3">
        <li v-if="labels.length === 0">
          <p>No labels yet !</p>
        </li>

        <li v-else v-for="(label, index) in labels" :key="index">
          <b-row>
            <b-col>
              <p>{{ label.tagname }}</p>
            </b-col>
            
            <b-col align-v="end">
              <i 
              class="fas fa-pencil-alt cursor" 
              @click="showEditTag(label)" 
              v-b-tooltip.hover title="Edit label"
              ></i>
              <i 
                class="fas fa-trash-alt ml-3 cursor"
                @click="deleteTag(label.idtag)"
                v-b-tooltip.hover title="Delete label"
              ></i>
            </b-col>
          </b-row>
        </li>

        <li>
          <b-link 
            class="text-secondary"
            @click="showCreateTagModal = true"
          ><i class="fas fa-plus"></i> <span>Add label</span></b-link>
        </li>

        <hr>

        <li>
          <router-link to="/deleted">
            <span class="text-secondary">Show deleted tasks</span>
          </router-link>
        </li>
      </div>
    </ul>

    <createProjectModal 
      v-bind:showCreateProjectModal="showCreateProjectModal"
    />

    <createTagModal
      v-bind:showCreateTagModal="showCreateTagModal"
    />

    <editTagModal
      v-bind:showEditTagModal="showEditTagModal"
      v-bind:editTag="editTag"
    />
  </b-col>
</template>

<script>
import projectServices from '../../_services/project-services'
import tagsServices from '../../_services/tags-services'

import CreateProjectModal from '../Modals/ProjectModals/CreateProjectModal'
import CreateTagModal from '../Modals/TagsModals/CreateTagModal'
import EditTagModal from '../Modals/TagsModals/EditTagModal'

export default {
  name: 'Sidebar',
  components: {
    CreateProjectModal,
    CreateTagModal,
    EditTagModal
  },
  data: () => {
    return {
      inboxActive: false,
      todayActive: false,
      upcomingActive: false,
      projects: [],
      labels: [],
      showCreateProjectModal: false,
      showCreateTagModal: false,
      showEditTagModal: false,
      editTag: {
        idtag: null,
        tagname: null
      }
    }
  },
  created() {
    this.setActiveToday();
    this.getProjects();
    this.getLabels();
  },
  methods: {
    setActiveInbox() {
      this.inboxActive = true;
      this.todayActive = false;
      this.upcomingActive = false;
    },
    setActiveToday() {
      this.inboxActive = false;
      this.todayActive = true;
      this.upcomingActive = false;
    },
    setActiveUpcoming() {
      this.inboxActive = false;
      this.todayActive = false;
      this.upcomingActive = true;
    },
    async getProjects() {
      const result = await projectServices.GetProjects(this.$parent.userInfo.iduser);
      console.log(result);
      if(result.status === 200) {
        this.projects = result.data.projects;
        this.$parent.getProjects();
      }
    },
    async getLabels() {
      const result = await tagsServices.GetTags(this.$parent.userInfo.iduser);
      console.log(result);

      if(result.status === 200) {
        this.labels = result.data.tags;
        this.$parent.getTags();
      }
    },
    resetTasks() {
      this.$parent.resetTasks();
    },
    resetEditTagModal() {
      this.editTag = {
        idtag: null,
        tagname: null
      }
    },
    closeEditTagModal() {
      this.editTag = {
        idtag: null,
        tagname: null
      }

      this.showEditTagModal = false;
    },
    showEditTag(label) {
      this.editTag = {
        idtag: label.idtag,
        tagname: label.tagname
      }

      this.showEditTagModal = true;
    },
    async deleteTag(idtag) {
      const result = await tagsServices.DeleteTag(idtag);

      if(result.status !== 200) {
        this.$parent.Toast.fire({
          icon: 'error',
          title: 'An error has occurred'
        });
      } else {
        this.$parent.Toast.fire({
          icon: 'success',
          title: 'Label deleted succesfully'
        });

        this.getLabels();
        this.$parent.resetTasks();
        this.$parent.getTags();
      }
    }
  }
}
</script>

<style>
.bg-sidebar {
  background-color: #fafafa;
  max-width: 60%;
  min-height: 100vh;
}
</style>
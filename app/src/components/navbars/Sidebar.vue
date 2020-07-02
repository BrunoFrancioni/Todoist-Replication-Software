<template>
  <div class="row mr-5 bg-sidebar">
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

      <li class="nav-item form-inline mb-2">
        <i class="fas fa-sort-amount-down"></i>
        <span class="nav-link text-dark font-weight-bold">Projects</span>
      </li>

      <div>
        <li v-if="projects.length === 0" class="ml-3">
          <p>No projects yet !</p>
        </li>

        <li class="ml-3" v-else v-for="(project, index) in projects" :key="index">
          <p>{{ project.title }}</p>
        </li>
      </div>

      <li class="nav-item form-inline">
        <i class="fas fa-sort-amount-down"></i>
        <span class="nav-link text-dark font-weight-bold">Labels</span>
      </li>

      <div>
        <li v-if="labels.length === 0" class="ml-3">
          <p>No labels yet !</p>
        </li>

        <li class="ml-3" v-else v-for="(label, index) in labels" :key="index">
          <p>{{ label.tagname }}</p>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import projectServices from '../../_services/project-services'
import tagsServices from '../../_services/tags-services'

export default {
  name: 'Sidebar',
  data: () => {
    return {
      inboxActive: false,
      todayActive: false,
      upcomingActive: false,
      projects: [],
      labels: []
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
      }
    },
    async getLabels() {
      const result = await tagsServices.GetTags(this.$parent.userInfo.iduser);
      console.log(result);

      if(result.status === 200) this.labels = result.data.tags;
    }
  }
}
</script>

<style>
.bg-sidebar {
  background-color: #fafafa;
  width: 50vh;
  min-height: 100vh;
}
</style>
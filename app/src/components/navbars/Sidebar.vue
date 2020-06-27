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

      <li class="nav-item form-inline">
        <i class="fas fa-sort-amount-down"></i>
        <span class="nav-link text-dark font-weight-bold">Labels</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data: () => {
    return {
      inboxActive: false,
      todayActive: false,
      upcomingActive: false
    }
  },
  created() {
    this.setActiveToday();
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
    }
  }
}
</script>

<style>
.bg-sidebar {
  background-color: #fafafa;
  width: 50vh;
  height: 500px;
}
</style>
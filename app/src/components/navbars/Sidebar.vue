<template>
  <div class="row mr-5 bg-sidebar">
    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <router-link to="/inbox" class="nav-link text-dark">Inbox</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link text-dark font-weight-bold">Today</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/upcoming" class="nav-link text-dark">Upcoming</router-link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data: () => {
    return {
      active: ''
    }
  },
  created: () => {
    this.setActive('today');
  },
  methods: {
    setActive: (active) => {
      this.active = active;
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
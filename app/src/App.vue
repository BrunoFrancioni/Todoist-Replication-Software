<template>
  <div id="app">
    <upbar v-on:setHomePage="setToday"/>
    <div class="container">
      <div class="row">
        <sidebar ref="sidebar" />
        <transition>
          <router-view />
        </transition>
      </div>
    </div>
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
  methods: {
    setToday() {
      this.$refs.sidebar.setActiveToday();
    }
  }
}
</script>

<style>
.bg-sidebar {
  background-color: #fafafa;
}
</style>

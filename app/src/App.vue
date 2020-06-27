<template>
  <div id="app">
    <upbar />
    <div class="container">
      <div class="row">
        <sidebar />
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
  }
}
</script>

<style>
.bg-sidebar {
  background-color: #fafafa;
}
</style>

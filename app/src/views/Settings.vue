<template>
    <b-col cols="12" md="8">
    <h1>Settings</h1>
    <hr />

    
  </b-col>
</template>

<script>
export default {
    name: 'Settings',
    computed: {
        userInfo() {
            return this.$parent.userInfo;
        }
    }
}
</script>

<style>

</style>
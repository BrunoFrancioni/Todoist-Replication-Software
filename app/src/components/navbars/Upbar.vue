<template>
    <div class="bg-danger mb-4">
        <nav class="nav bg-danger container">
            <div class="form-inline">
                <div @click="setHomePage">
                    <router-link 
                        to="/" 
                        class="nav-link"
                    ><i v-b-tooltip.hover title="Home" class="fas fa-home text-white"></i></router-link>
                </div>
            </div>

            <ul class="nav form-inline ml-auto">
                <li class="nav-item button" v-if="this.$parent.current !== '/settings'">
                    <a 
                        class="nav-link" 
                        @click="showCreateTaskModal" 
                        v-b-tooltip.hover title="Create a task"
                    ><i class="fas fa-plus text-white icon"></i></a>
                </li>
                <li class="nav-item button">
                    <a 
                        class="nav-link" 
                        @click="logout"
                        v-b-tooltip.hover title="Logout"
                    >
                        <i class="fas fa-sign-out-alt text-white icon"></i>
                    </a>
                </li>
                <li class="nav-item button">
                    <router-link to="/settings" v-b-tooltip.hover title="Settings"><i class="fas fa-cog text-white icon"></i></router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Upbar',
    methods: {
        setHomePage() {
            this.$emit('setHomePage');
        },
        showCreateTaskModal() {
            this.$emit('showModal');
        },
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style>
li.button:hover {
    cursor: pointer;
}
i.icon:hover {
    background-color:#cec4b4!important;
    border-radius: 2px;
    padding: 3px;
}
</style>
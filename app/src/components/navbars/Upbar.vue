<template>
    <div class="bg-danger mb-4">
        <nav class="nav bg-danger container">
            <div class="form-inline">
                <a class="navbar-brand" href="#"><i class="fas fa-bars text-white"></i></a>
                <div @click="setHomePage">
                    <router-link to="/" class="nav-link"><i class="fas fa-home text-white"></i></router-link>
                </div>
                <form class="form-inline my-2 my-lg-0 input-group-sm">
                    <input class="form-control mr-sm-2" type="text" placeholder="Find">
                    <button class="btn"><i class="fas fa-search text-white"></i></button>
                </form>
            </div>

            <ul class="nav form-inline ml-auto">
                <li class="nav-item add-task">
                    <a class="nav-link" @click="showCreateTaskModal"><i class="fas fa-plus text-white"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fas fa-chart-line text-white mr-1"></i>
                        <span class="text-white">0/0</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-cog text-white"></i></a>
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
        }
    }
}
</script>

<style>
li.add-task:hover {
    cursor: pointer;
}
</style>
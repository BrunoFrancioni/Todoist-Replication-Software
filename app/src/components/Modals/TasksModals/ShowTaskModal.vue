<template>
    <b-modal 
        size="lg"
        v-model="showInfoModal"
        @hidden="closeModalShow"
        no-close-on-esc
        no-close-on-backdrop
    >
        
        <template v-slot:modal-header>
            <h3>See details</h3>
            <b-button-close @click="closeModalShow"></b-button-close>
        </template>

        <div class="ml-3">
            <b-row  align-h="start">
                <p>{{ modalInfoTask.title }}</p>
            </b-row>

            <b-row align-h="between">
                <b-col cols="6" md="4">
                    <b-row align-h="start">
                        <i class="far fa-calendar-alt mr-1 color-red"></i>
                        <p class="mr-2 color-red">{{ getMonth(modalInfoTask.day.slice(5,7))}}  {{ modalInfoTask.day.slice(8) }}</p>
                        <p v-if="modalInfoTask.time !== null" class="color-red">{{ modalInfoTask.time.slice(0,5) }} hrs.</p>
                    </b-row>
                </b-col>
                    
                <b-col cols="6" md="4">
                    <b-row align-h="end" class="pr-3">
                        <p v-if="modalInfoTask.idproject === null" class="text-secondary">Inbox</p>
                        <p v-else class="text-secondary">{{ modalInfoTask.Project.title }}</p>
                    </b-row>
                </b-col>
            </b-row>

            <b-row v-if="modalInfoTask.Tags.length !== 0">
                <span 
                    class="badge badge-warning mr-2"
                    v-for="(tag, index) in modalInfoTask.Tags"
                    :key="index"
                >{{ tag.tagname }}</span>
            </b-row>

            <b-row 
                class="mt-3 mb-3"
                v-if="modalInfoTask.content !== null">
                {{ modalInfoTask.content }}
            </b-row>
        </div>

        <template v-slot:modal-footer>
            <b-button variant="" @click="closeModalShow">Close</b-button>
        </template>

    </b-modal>
</template>

<script>
export default {
    name: 'ShowTaskModal',
    props: ['showInfoModal', 'modalInfoTask'],
    methods: {
        closeModalShow() {
            this.$emit('closeShowModal');
        },
        getMonth(month){
            return this.$parent.getMonth(month);
        }
    }
}
</script>

<style>

</style>
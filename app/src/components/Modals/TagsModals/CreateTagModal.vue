<template>
    <b-modal
        v-model="showCreateTagModal"
        size="lg"
        title="Create Label"
        @hidden="resetModal"
    >
        <div>
            <b-form @submit="submitTag" @reset="resetModal">
                <b-form-group
                    id="input-group-1"
                    label="Label title:"
                    label-for="title"
                >
                    <b-form-input
                        id="title"
                        v-model="createTag.tagname"
                        type="text"
                        required
                        placeholder="Enter label name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group>
                    <b-button type="reset" variant="danger" class="mr-2">Reset</b-button>
                    <b-button type="submit" variant="primary">Create label</b-button>
                </b-form-group>
            
            </b-form>
        </div>

        <template v-slot:modal-footer>
            <b-button variant="" @click="closeModal">Close</b-button>
        </template>
    </b-modal>
</template>

<script>
import tagsServices from '../../../_services/tags-services'

export default {
    name: 'CreateTagModal',
    props: ['showCreateTagModal'],
    data() {
        return {
            createTag: {
                tagname: ''
            }
        }
    },
    methods: {
        resetModal() {
            this.createTag = {
                tagname: ''
            }
        },
        closeModal() {
            this.resetModal();
            this.$parent.showCreateTagModal = false;
        },
        async submitTag(evt) {
            evt.preventDefault();
            this.createTag.iduser = this.$parent.$parent.userInfo.iduser;

            const result = await tagsServices.CreateTag(this.createTag);

            if(result.status !== 201) {
                console.log(result);

                this.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            } else {
                this.$parent.getLabels();
                this.closeModal();
                this.$parent.$parent.getTags();

                this.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Label created succesfully'
                });
            }
        }
    }
}
</script>

<style>

</style>
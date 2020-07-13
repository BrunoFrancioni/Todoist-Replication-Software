<template>
    <b-modal
        v-model="showEditTagModal"
        size="lg"
        @hidden="resetEditTagModal"
        no-close-on-esc
        no-close-on-backdrop
    >
        <template v-slot:modal-header>
            <h3>Edit Label</h3>
            <b-button-close @click="closeModal"></b-button-close>
        </template>

        <div>
            <b-form @submit="submitTagEdited" @reset="resetEditTagModal">
                <b-form-group
                    id="input-group-1"
                    label="Label title:"
                    label-for="title"
                >
                    <b-form-input
                        id="title"
                        v-model="editTag.tagname"
                        type="text"
                        required
                        placeholder="Enter label name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group>
                    <b-button type="submit" variant="primary">Save label</b-button>
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
    name: 'EditTagModal',
    props: ['showEditTagModal', 'editTag'],
    data() {
        return {
            
        }
    },
    methods: {
        resetEditTagModal() {
            this.$parent.resetEditTagModal();
        },
        closeModal() {
            this.$parent.closeEditTagModal();
        },
        async submitTagEdited(evt) {
            evt.preventDefault();

            const result = await tagsServices.EditTag(this.editTag.idtag, { tagname: this.editTag.tagname });

            if(result.status !== 200) {
                this.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });

                this.resetEditTagModal();
            } else {
                this.$parent.getLabels();
                this.$parent.$parent.getTags();
                this.$parent.resetTasks();

                this.closeModal();

                this.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Label edited succesfully'
                });
            }
        }
    }
}
</script>

<style>

</style>
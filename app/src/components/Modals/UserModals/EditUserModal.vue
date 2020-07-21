<template>
    <b-modal
        v-model="showEditUserModal"
        size="lg"
        @hidden="closeModal"
        no-close-on-esc
        no-close-on-backdrop
    >
        <template v-slot:modal-header>
            <h3>Edit User Info</h3>
            <b-button-close @click="closeModal"></b-button-close>
        </template>

        <div>
            <b-form @submit="submitChanges" @reset="closeModal">
                <b-form-group
                    id="input-group-1"
                    label="Name:"
                    label-for="name"
                >
                    <b-form-input
                        id="name"
                        v-model="editUserInfo.name"
                        type="text"
                        required
                        placeholder="Enter name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-2"
                    label="Lastname:"
                    label-for="lastname"
                >
                    <b-form-input
                        id="lastname"
                        v-model="editUserInfo.lastname"
                        type="text"
                        required
                        placeholder="Enter lastname"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-3"
                    label="Email:"
                    label-for="email"
                >
                    <b-form-input
                        id="email"
                        v-model="editUserInfo.email"
                        type="email"
                        required
                        placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group>
                    <b-button type="submit" variant="primary">Save changes</b-button>
                </b-form-group>
            
            </b-form>
        </div>

        <template v-slot:modal-footer>
            <b-button variant="" @click="closeModal">Close</b-button>
        </template>
    </b-modal>
</template>

<script>
import userServices from '../../../_services/user-services'

export default {
    name: 'EditUserModal',
    props: ['showEditUserModal', 'editUserInfo'],
    methods: {
        closeModal() {
            this.$parent.closeEditModal();
        },
        async submitChanges(evt) {
            evt.preventDefault();

            const result = await userServices.EditUser(this.$parent.userInfo.iduser, this.editUserInfo);

            if(result.status === 200) {
                this.closeModal();

                this.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'User updated succesfully'
                });

                this.$router.push('/');
            } else {
                this.closeModal();

                this.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            }
        }
    }
}
</script>

<style>

</style>
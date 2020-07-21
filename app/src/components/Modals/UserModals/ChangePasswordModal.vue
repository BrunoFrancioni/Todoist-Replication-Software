<template>
    <b-modal
        v-model="showChangePasswordModal"
        size="lg"
        @hidden="closeModal"
        no-close-on-esc
        no-close-on-backdrop
    >
        <template v-slot:modal-header>
            <h3>Change Password</h3>
            <b-button-close @click="closeModal"></b-button-close>
        </template>

        <div>
            <b-form @submit="submitChanges" @reset="closeModal">
                <b-form-group
                    id="input-group-1"
                    label="Old Password:"
                    label-for="old-password"
                >
                    <b-form-input
                        id="old-password"
                        v-model="passwordInfo.oldPassword"
                        type="password"
                        required
                        placeholder="Enter old password"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-2"
                    label="New password:"
                    label-for="new-password"
                >
                    <b-form-input
                        id="new-password"
                        v-model="passwordInfo.newPassword"
                        type="password"
                        required
                        placeholder="Enter new password"
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
    name: 'ChangePasswordModal',
    props: ['showChangePasswordModal'],
    data() {
        return {
            passwordInfo: {
                oldPassword: '',
                newPassword: ''
            }
        }
    },
    methods: {
        closeModal() {
            this.$parent.closePasswordModal();
        },
        async submitChanges(evt) {
            evt.preventDefault();

            const result = await userServices.EditUser(this.$parent.userInfo.iduser, this.passwordInfo);

            if(result.status === 200) {
                this.closeModal();

                this.$parent.$parent.Toast.fire({
                    icon: 'success',
                    title: 'Password updated succesfully'
                });
            } else if(result.status === 500) {
                this.closeModal();

                this.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'Bad old password'
                });
            } else {
                this.closeModal();

                this.$parent.$parent.Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred'
                });
            }

            this.passwordInfo = {
                oldPassword: '',
                newPassword: ''
            }
        }
    }
}
</script>

<style>

</style>
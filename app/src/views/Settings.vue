<template>
    <div class="w-100">
        <h1>Settings</h1>
        <hr />

        <b-row align-h="center">
            <b-col cols="4" md="4">
                <h4 class="text">Name:</h4>
                <p>{{ userInfo.name }}</p>
            </b-col>

            <b-col cols="4" md="4">
                <h4 class="text">Lastname:</h4>
                <p>{{ userInfo.lastname }}</p>
            </b-col>

            <b-col cols="4" md="4">
                <h4 class="text">Email:</h4>
                <p>{{ userInfo.email }}</p>
            </b-col>
        </b-row>

        <hr>

        <b-row class="float-right">
            <b-button 
                class="mr-2" 
                variant="info"
                @click="showEditModal"
            >Edit User Info</b-button>

            <b-button 
                variant="danger"
                @click="showPasswordModal"
            >Change Password</b-button>
        </b-row> 

        <editUserModal
            v-bind:showEditUserModal="showEditUserModal"
            v-bind:editUserInfo="editUserInfo"
        />

        <changePasswordModal 
            v-bind:showChangePasswordModal="showChangePasswordModal"
        />
    </div>
</template>

<script>
import EditUserModal from '../components/Modals/UserModals/EditUserModal'
import ChangePasswordModal from '../components/Modals/UserModals/ChangePasswordModal'

export default {
    name: 'Settings',
    components: {
        EditUserModal,
        ChangePasswordModal
    },
    data() {
        return {
            showEditUserModal: false,
            editUserInfo: {
                name: '',
                lastname: '',
                email: ''
            },
            showChangePasswordModal: false
        }
    },
    computed: {
        userInfo() {
            return this.$parent.userInfo;
        }
    },
    methods: {
        showEditModal() {
            this.editUserInfo = {
                name: this.userInfo.name,
                lastname: this.userInfo.lastname,
                email: this.userInfo.email
            }

            this.showEditUserModal = true;
        },
        closeEditModal() {
            this.editUserInfo = {
                name: '',
                lastname: '',
                email: ''
            }

            this.showEditUserModal = false;
        },
        showPasswordModal() {
            this.showChangePasswordModal = true;
        },
        closePasswordModal() {
            this.showChangePasswordModal = false;
        }
    }
}
</script>

<style>
h4.text {
    text-transform: uppercase;
    font-weight: bold;
}
</style>
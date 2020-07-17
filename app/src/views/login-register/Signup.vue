<template>
    <div id="app" class="h-100">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
				<div class="card-wrapper">
					<div class="brand">
						<img src="favicon.ico" alt="bootstrap 4 login page">
					</div>
					<div class="card fat">
						<div class="card-body">
							<h4 class="card-title">Signup</h4>
							<b-form @submit="submitSignup">
								<b-form-group
									id="b-form-group-1"
									label="Name"
									label-for="name"
								>
									<b-form-input
										id="name"
										type="text"
										required
										placeholder="Enter name"
										v-model="signup.name"
									></b-form-input>
								</b-form-group>

								<b-form-group
									id="b-form-group-2"
									label="Lastname"
									label-for="lastname"
								>
									<b-form-input
										id="lastname"
										type="text"
										required
										placeholder="Enter lastname"
										v-model="signup.lastname"
									></b-form-input>
								</b-form-group>

								<b-form-group
									id="b-form-group-3"
									label="Email"
									label-for="email"
								>
									<b-form-input
										id="email"
										type="email"
										required
										placeholder="Enter email"
										v-model="signup.email"
									></b-form-input>
								</b-form-group>

								<b-form-group
									id="b-form-group-4"
									label="Password"
									label-for="password"
								>
									<b-form-input
										id="password"
										type="password"
										required
										placeholder="Enter password"
										v-model="signup.password"
									></b-form-input>
								</b-form-group>

								<b-form-group>
									<b-button type="submit" variant="primary">Signup</b-button>
								</b-form-group>

								<div class="mt-4 text-center">
									Already have an account? <router-link to="/login">Login</router-link>
								</div>
							</b-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//import usersServices from '../../_services/user-services'

export default {
	name: 'Signup',
	data() {
		return {
			signup: {
				name: '',
				lastname: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		async submitSignup(evt) {
			evt.preventDefault();

			
		}
	}
}
</script>

<style>

</style>
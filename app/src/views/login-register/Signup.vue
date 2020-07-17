<template>
    <section class="center">
		<div class="container center">
			<div class="row justify-content-md-center center">
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
	</section>
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
html,body {
	height: 100%;
}

body {
	background-color: #f7f9fb;
	font-size: 14px;
}

.center {
	position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}

.my-login-page .brand {
	width: 90px;
	height: 90px;
	overflow: hidden;
	border-radius: 50%;
	margin: 40px auto;
	box-shadow: 0 4px 8px rgba(0,0,0,.05);
	position: relative;
	z-index: 1;
}

.my-login-page .brand img {
	width: 100%;
}

.my-login-page .card-wrapper {
	width: 400px;
}

.my-login-page .card {
	border-color: transparent;
	box-shadow: 0 4px 8px rgba(0,0,0,.05);
}

.my-login-page .card.fat {
	padding: 10px;
}

.my-login-page .card .card-title {
	margin-bottom: 30px;
}

.my-login-page .form-control {
	border-width: 2.3px;
}

.my-login-page .form-group label {
	width: 100%;
}

.my-login-page .btn.btn-block {
	padding: 12px 10px;
}

.my-login-page .footer {
	margin: 40px 0;
	color: #888;
	text-align: center;
}

@media screen and (max-width: 425px) {
	.my-login-page .card-wrapper {
		width: 90%;
		margin: 0 auto;
	}
}

@media screen and (max-width: 320px) {
	.my-login-page .card.fat {
		padding: 0;
	}

	.my-login-page .card.fat .card-body {
		padding: 15px;
	}
}
</style>
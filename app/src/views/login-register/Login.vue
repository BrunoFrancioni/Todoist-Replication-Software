<template>
    <section class="center">
		<div class="container center">
			<div class="row justify-content-md-center center">
				<div class="card-wrapper">
					<div class="brand">
						<img src="favicon.ico" alt="logo">
					</div>
					<div class="card fat">
						<div class="card-body">
							<h4 class="card-title">Login</h4>
							<b-form @submit="submitLogin">
								<b-form-group
									id="b-form-group-1"
									label="E-mail Address"
									label-for="email"
								>
									<b-form-input
										id="email"
										type="email"
										required
										placeholder="Enter email"
										v-model="login.email"
									></b-form-input>
								</b-form-group>

								<b-form-group
									id="b-form-group-2"
									label="Password"
									label-for="password"
								>
									<b-form-input
										id="password"
										type="password"
										required
										placeholder="Enter password"
										v-model="login.password"
									></b-form-input>
								</b-form-group>

								<b-form-group>
									<b-button type="submit" variant="primary">Login</b-button>
									<span v-show="loading" class="spinner-border spinner-border-sm ml-2"></span>
								</b-form-group>

								<div class="mt-4 text-center">
									Don't have an account? <router-link to="/signup">Create One</router-link>
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
//import userServices from '../../_services/user-services'

export default {
	name: 'Login',
	data() {
		return {
			login: {
				email: '',
				password: ''
			},
			loading: false,
			Toast: this.$swal.mixin({
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 2000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter', this.$swal.stopTimer)
					toast.addEventListener('mouseleave', this.$swal.resumeTimer)
				}
			})
		}
	},
	computed: {
		loggedIn() {
			return this.$store.state.status.loggedIn;
		}
	},
	mounted() {
		if (this.loggedIn) {
			this.$router.push('/');
		}
	},
	methods: {
		async submitLogin(evt) {
			evt.preventDefault();

			this.loading = true;
			const result = await this.$store.dispatch('login', this.login);

			if(result.status === 200) {
				this.loading = false;
				this.$router.push('/');
			} else {
				this.loading = false;
				this.Toast.fire({
					icon: 'error',
					title: 'Email or password incorrect'
				});

				this.login = {
					email: '',
					password: ''
				}
			}
		}
	}
}
</script>

<style>
html,body {
	height: 100%;
}

body.my-login-page {
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
<template>
	<div class="login">
		<div class="container intro py-3">
			<div class="row">
				<div class="col-12 text-center">
					<img
						:src="require('@img/fuel_spot_logo-notext.svg')"
						alt="Logo"
						width="56"
					/>
					<h1 class="text-center intro__heading mt-2">
						FuelSpot
						<span class="copyright">®</span>
					</h1>
				</div>
				<div class="col-12">
					<h2 class="text-center intro__welcome">
						Dijital Benzinlik
					</h2>
				</div>
				<div class="col-12">
					<div class="login login--social w-100 mb-2">
						<p class="text-center px-2">Giriş yapın</p>
						<div
							class="d-flex flex-row justify-content-center align-items-center p-3"
						>
							<a href="#" @click.prevent="signInGoogle()">
								<img
									:src="
										require('@/assets/img/google-seeklogo.svg')
									"
									width="48"
									height="48"
								/>
							</a>
							<v-facebook-login
								:app-id="facebook.appId"
								@sdk-init="handleSdkInit"
								@connect="handleConnect"
								@logout="handleLogout"
								@click="handleClick"
							>
								<!-- <button slot-scope="scope"> -->
								<img
									:src="
										require('@/assets/img/facebook-seeklogo.svg')
									"
									width="48"
									height="48"
								/>
								<!-- </button> -->
							</v-facebook-login>
						</div>
					</div>

					<p class="login--warn fg-blue-grey-lighten-1 text-center">
						Giriş yaparak, kullanım koşullarını ve gizlilik
						politikasını kabul etmiş olursunuz.
					</p>
				</div>
				<div class="col-12 mb-4">
					<div class="login login--station w-100">
						<p class="text-center">İstasyon sahibi misiniz?</p>
						<fs-button
							shadow
							block
							color="gradient"
							:to="{ name: 'Welcome' }"
						>
							Buradan giriş yapın
						</fs-button>
					</div>
				</div>
				<div
					class="col-12 d-flex flex-row justify-content-between align-items-center mb-4"
				>
					<router-link :to="{ name: 'TermsAndConditions' }">
						Kullanım Koşulları
					</router-link>
					<router-link :to="{ name: 'Privacy' }">
						Gizlilik Politikası
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import axios from "axios";
    import slugify from "slugify";
    import {mapActions} from "vuex";
    import {VFBLogin as VFacebookLogin} from "vue-facebook-login-component";

    export default {
	name: "Login",

	components: {
		VFacebookLogin,
	},

	data() {
		return {
			name: null,
			username: null,
			email: null,
			imgURL: null,
			facebook: {
				FB: {},
				appId: "380327342377274",
			},
		};
	},

	metaInfo: {
		title: "Giriş Yapın",
	},

	methods: {
		...mapActions("user", ["setUser"]),

		signInGoogle() {
			this.$gAuth
				.signIn()
				.then((GoogleUser) => {
					this.isSignIn = this.$gAuth.isAuthorized;
					this.name = GoogleUser.w3.ig;
					this.username = slugify(GoogleUser.w3.ig, {
						replacement: null,
						remove: " ",
						lower: true,
					});
					this.email = GoogleUser.w3.U3;
					this.imgURL = GoogleUser.w3.Paa;
				})
				.then(() => this.registerUser())
				.catch((error) => {
					alert(error);
				});
		},

		signInFacebook() {
			const { api } = this.facebook.FB;
			api("/me", { fields: "id, name, email" }, (user) => {
				this.name = user.name;
				this.username = slugify(this.name, {
					replacement: null,
					remove: " ",
					lower: true,
				});
				this.email = user.email;
				api(
					`${user.id}/picture?width=1920&redirect=false`,
					(picture) => {
						if (picture) {
							this.imgURL = picture.data.url;
						}
					},
				);
				this.registerUser();
			});
		},
		handleSdkInit({ FB }) {
			this.facebook.FB = FB;
		},
		handleConnect() {
			this.signInFacebook();
		},
		handleLogout() {
			// eslint-disable-next-line
                console.info('[V-Facebook-Login info]: Logged `logout` event.')
		},
		handleClick() {
			// eslint-disable-next-line
                console.info('[V-Facebook-Login info]: Logged `click` event.')
		},

		async registerUser() {
			const config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			};

			const params = new URLSearchParams();
			params.append("username", this.username);
			params.append("name", this.name);
			params.append("email", this.email);
			params.append("photo", this.imgURL);
			params.append("deviceType", "ios");

			await axios
				.post(
					`${process.env.VUE_APP_API_URL}user/create.php`,
					params,
					config,
				)
				.then(async (response) => {
					if (response.data[0].email === this.email) {
						await this.setUser(response.data[0]);
						this.$router.push({
							name: "Stations",
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},

	computed: {
		connected() {
			return this.facebook.model.connected;
		},
		disconnected() {
			return !this.connected;
		},
	},
};
</script>

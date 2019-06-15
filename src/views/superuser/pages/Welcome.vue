<template>
	<div class="welcome">
		<div class="container intro intro--super py-3">
			<div class="row">
				<div class="col-12 wrapper-240 text-center">
					<img
						:src="require('@img/fuel_spot_logo-notext.svg')"
						alt="Logo"
						style="display: block;margin-left: auto;margin-right: auto;"
						width="56"
					/>
					<h1 class="text-center intro__heading mt-2">
						FuelSpot
						<span class="copyright">
							<strong>&copy;</strong>
						</span>
					</h1>
				</div>
				<div class="col-12 mb-4">
					<h2
						class="text-center intro__welcome intro__welcome--super wrapper-240"
					>
						Yönetici
					</h2>
					<div
						class="login--station__text text-center"
						style="margin: 4px"
					>
						<p>
							FuelSpot, Akaryakıt İstasyonları ile Araç
							Sahiplerini buluşturan dijital bir platformdur.
						</p>
						<p>
							İstasyonunuzu FuelSpot'a kaydederek daha fazla
							kullanıcıya ulaşabilir, tesis ve işletme
							karlılığınızı yükseltebilirsiniz.
						</p>
					</div>
				</div>
				<div class="col-12">
					<div class="login login--social w-100 mb-2">
						<p class="text-center px-2">Giriş yapın</p>
						<div
								class="d-flex flex-row justify-content-between align-items-center p-4"
						>
							<a href="#" @click="signInGoogle()">
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
								<a href="#">
									<img
										:src="
											require('@/assets/img/facebook-seeklogo.svg')
										"
										width="48"
										height="48"
									/>
								</a>
								<!-- </button> -->
							</v-facebook-login>
						</div>
					</div>
					<div class="col-12">
						<p
							class="login--warn fg-blue-grey-lighten-1 text-center"
							style="text-align: center; display: block;margin-left: auto;margin-right: auto;"
						>
							Giriş yaparak, kullanım koşullarını ve gizlilik
							politikasını kabul etmiş olursunuz.
						</p>
					</div>
				</div>
				<div
					class="col-12 d-flex flex-row justify-content-between align-items-center mb-4 wrapper-240"
				>
					<router-link :to="{ name: 'TermsAndConditions' }">
						Kullanım Koşulları
					</router-link>
					<router-link :to="{ name: 'Privacy' }">
						Gizlilik Politikası
					</router-link>
				</div>
				<div class="col-12 mb-3">
					<div class="login login--station w-320 text-center">
						<router-link
							class="d-inline-flex flex-row justify-content-center align-items-center wrapper-240"
							:to="{ name: 'Login' }"
						>
							<i class="fas fa-arrow-circle-left mr-2"></i>
							Kullanıcı girişi
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import axios from "axios";
    import slugify from "slugify";
    import {mapActions, mapState} from "vuex";
    import {VFBLogin as VFacebookLogin} from "vue-facebook-login-component";

    export default {
	name: "Welcome",

	components: { VFacebookLogin },

	data() {
		return {
			name: "",
			username: "",
			email: "",
			imgURL: "",
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
		...mapActions("superUser", ["setSuperUser"]),
		...mapActions({
			fetchSuperUserStations: "superUser/fetchSuperUserStations",
		}),

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
				.then(() => this.registerSuperUser())
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
				this.registerSuperUser();
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

		async registerSuperUser() {
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
					`${process.env.VUE_APP_API_URL}superuser/create.php`,
					params,
					config,
				)
				.then(async (response) => {
					if (response.data[0].email === this.email) {
						await this.setSuperUser(response.data[0]);
						await this.fetchSuperUserStations();
						if (
							this.superUserStations != null &&
							this.superUserStations.length > 0
						) {
							// superUser has been already registered and has station (verified or not)
							localStorage.setItem(
								"selectedStation",
								this.superUserStations[0].id,
							),
								this.$router.push({
									name: "MyStation",
									params: {
										superStationID: this
											.superUserStations[0].id,
									},
								});
						} else {
							this.$router.push({
								name: "Register",
							});
						}
					}
				})
				.catch((error) => {
					alert(error);
				});
		},
	},

	computed: {
		...mapState("superUser", ["superUser", "superUserStations"]),
	},
};
</script>

<template>
	<div class="register">
		<div class="container">
			<br />
			<GoogleMap :station-object="stationObject" :center="center" />
			<p class="fg-blue-grey my-4" style="text-align:center;">
				{{ registerText }}
			</p>
			<form
				class="form form--register"
				@submit.prevent="finishRegistration"
			>
				<div class="container mx-0 mx-md-auto">
					<div class="row">
						<div class="col-12">
							<h2
								class="form__heading headline headline--main text-left mb-4"
							>
								İstasyon bilgileri
							</h2>
						</div>
						<div class="col-12 text-center">
							<img
								:src="
									stationObject.logoURL ||
										'https://fuelspot.com.tr/default_icons/station.png'
								"
								width="150"
								style="display: block;margin-left: auto;margin-right: auto;"
								height="auto"
								alt="logo"
							/>
							<h3 class="fw-400 fg-blue-grey-darken-2">
								{{ stationObject.name }}
							</h3>
						</div>
						<div class="form-group col-12">
							<label class="form__label">
								İstasyon Adresi
							</label>
							<textarea
								class="form-control"
								aria-label="istasyon adresi"
								v-model="stationObject.vicinity"
								v-validate="'required'"
								name="vicinity"
							></textarea>
						</div>
						<div class="form-group col-12 col-md-6">
							<label class="form__label">
								EPDK Lisans Numarası
							</label>
							<input
								class="form-control"
								type="text"
								aria-label="EPDK Lisans Numarası"
								v-model="stationObject.licenseNo"
								v-validate="'required'"
								name="licenseNo"
							/>
						</div>
						<div class="col-12">
							<a
								href="#"
								v-if="stationObject.isVerified === 1"
								class="btn btn-orange btn-block"
							>
								<i class="far fa-exclamation-triangle mr-2"></i>
								<!-- Bir popup ile report apisine bağlayacağız -->
								İletişime geçin
							</a>
						</div>

						<div class="col-12">
							<h2
								class="form__heading headline headline--main text-left mt-5 mb-4"
							>
								Yönetici bilgileri
							</h2>
						</div>

						<div class="col-12">
							<img
								:src="
									superUser.photo ||
										'https://fuelspot.com.tr/default_icons/profile.png'
								"
								width="200"
								style="  display: block;margin-left: auto;margin-right: auto;"
								alt="Superuser"
							/>
							<br />
						</div>

						<div class="form-group col-12 col-md-6">
							<label class="form__label">
								Ad &amp; Soyad
							</label>
							<input
								class="form-control"
								type="text"
								aria-label="Adınız ve Soyadınız"
								v-model="superUser.name"
								v-validate="'required'"
								name="name"
							/>
						</div>
						<div class="form-group col-12 col-md-6">
							<label class="form__label">E-Posta</label>
							<input
								class="form-control"
								type="email"
								aria-label="E-Posta Adresiniz"
								v-model="superUser.email"
								v-validate="'required'"
								name="email"
							/>
						</div>
						<div class="form-group col-12 col-md-6">
							<label class="form__label">Telefon</label>
							<input
								class="form-control"
								type="text"
								aria-label="Telefon Numaranız"
								v-model="superUser.phoneNumber"
								v-validate="'required'"
								name="phoneNumber"
							/>
						</div>
						<div class="form-group col-12 col-md-6">
							<label class="form__label">
								Doğum Tarihi
							</label>
							<datepicker
								input-class="form-control"
								name="birthday"
								:language="tr"
								monday-first
								format="dd MMMM yyyy"
								aria-label="Doğum Tarihiniz"
								v-validate="'required'"
								v-model="superUser.birthday"
							></datepicker>
						</div>

						<div class="col-12 col-md-6">
							<label class="form__label">Cinsiyet</label>
							<div>
								<fs-radio
									name="gender"
									id="male"
									label="Erkek"
									data="male"
									v-model="superUser.gender"
									v-validate="'required'"
								></fs-radio>
								<fs-radio
									name="gender"
									id="female"
									label="Kadın"
									data="female"
									v-model="superUser.gender"
									v-validate="'required'"
								></fs-radio>
								<fs-radio
									name="gender"
									id="other"
									label="Belirtmek istemiyorum"
									data="other"
									v-model="superUser.gender"
									v-validate="'required'"
								></fs-radio>
							</div>
						</div>
						<div class="col-12">
							<hr />
						</div>
						<div
							class="col-12 d-flex flex-row align-items-center justify-content-between"
						>
							<router-link class="fg-red" :to="{ name: 'Login' }">
								<i class="fas fa-arrow-circle-left mr-2"></i>
								Giriş sayfasına dön
							</router-link>

							<fs-button
								shadow
								color="gradient"
								@click="finishRegistration()"
							>
								Kaydı tamamla
							</fs-button>
						</div>
					</div>
				</div>
			</form>
			<br />
		</div>
	</div>
</template>

<script>
    import GoogleMap from "@/components/superuser/GoogleMap";
    import Datepicker from "vuejs-datepicker";
    import {tr} from "vuejs-datepicker/dist/locale";
    import axios from "axios";
    import {mapActions, mapState} from "vuex";
    import moment from "moment";

    let token = "";
if (localStorage.getItem("superUser") != null) {
	token = JSON.parse(localStorage.getItem("superUser")).token;
}
const reqConfig = {
	headers: {
		Authorization: "Bearer " + token,
	},
};

export default {
	name: "Register",

	components: {
		GoogleMap,
		Datepicker,
	},

	data() {
		return {
			tr: tr,
			center: { lat: 39.92562, lng: 32.83805 },
			superUser: {},
			stationObject: {
				id: "",
				name: "",
				vicinity: "",
				country: "",
				location: "",
				googleID: "",
				facilities: {
					WC: "1",
					Market: "1",
					CarWash: "1",
					TireRepair: "0",
					Mechanic: "0",
					Restaurant: "0",
					ParkSpot: "0",
					ATM: "0",
					Motel: "0",
				},
				logoURL: "",
				gasolinePrice: 0,
				dieselPrice: 0,
				lpgPrice: 0,
				electricityPrice: 0,
				lastUpdated: "",
				searchStationInterval: null,
			},
			registerText: "",
		};
	},

	metaInfo: {
		title: "Kayıt Olun",
	},

	methods: {
		geolocate: function() {
			navigator.geolocation.getCurrentPosition((position) => {
			    if (position.coords.latitude.toString().length > 0){
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    this.searchStations();
                }else{
                    alert("Konum bilgisi çekilemedi. Lütfen konum ve GPS ayarlarını kontrol edip tekrar deneyiniz.");
                }
			});
		},

		searchStations: async function() {
			return await axios
				.get(
					`${
						process.env.VUE_APP_API_URL
					}station/search.php?location=${this.center.lat};${
						this.center.lng
					}&radius=50`,
					reqConfig,
				)
				.then((response) => {
					if (response != null && response.data.length > 0) {
						this.stationObject = response.data[0];

						if (Number(this.stationObject.isVerified) === 1) {
							this.registerText =
								"Bu istasyon daha önce onaylanmış. Bir yanlışlık olduğunu düşünüyorsanız lütfen bizimle iletişime geçiniz.";
						} else {
							this.registerText =
								"Şu anda istasyondasınız. İstasyon bilgilerini onaylarak devam ediniz.";
						}
					} else {
						this.stationObject = null;
						this.registerText =
							"Kayıt işlemini tamamlamak için istasyonda bulunmanız gerekmektedir. İstasyon menziline girdiğinizde (50 metre) istasyon bilgileri otomatik yüklenecektir.";
					}
				});
		},

		openWindow: function(marker) {
			this.window_open = true;
			this.window_pos = {
				lat: Number(marker.location.split(";")[0]),
				lng: Number(marker.location.split(";")[1]),
			};
		},

		finishRegistration: async function() {
			const validationResponse = await this.$validator.validateAll();

			if (!validationResponse) {
				alert(this.errors.items[0].msg);
				return false;
			}

			/*In here, we'll call two api. First calling station api after it success, we'll call user api and then redirect /my-station if it success. */
			const params = await new URLSearchParams();
			params.append("stationID", this.stationObject.id);
			params.append("licenseNo", this.stationObject.licenseNo);
			params.append("owner", this.superUser.username);

			return await axios
				.post(
					`${
						process.env.VUE_APP_API_URL
					}station/superuser-registration.php`,
					params,
					reqConfig,
				)
				.then((response) => {
					if (response != null && response.data === "Success") {
						this.finishRegistration2();
					} else {
						this.$snotify.error(response.data, "Bir Hata Oluştu!", {
							timeout: 3000,
							showProgressBar: false,
						});
					}
				});
		},

		finishRegistration2: async function() {
			const params = await new URLSearchParams();
			// Bu veriler cookie de tutmak lazım store çok mantıklı değil gibi
			//BÜTÜN BİLGİLER ZORUNLU FORM KONTROL YAPALIM
			params.append("username", this.superUser.username);
			params.append("name", this.superUser.name);
			params.append("email", this.superUser.email);
			params.append("gender", this.superUser.gender);
			params.append(
				"birthday",
				moment(this.superUser.birthday).format("DD/MM/YYYY"),
			);
			params.append("phoneNumber", this.superUser.phoneNumber);
			params.append("country", "TR"); // Şimdilik hardcode ekledim
			params.append("language", "Türkçe"); // Şimdilik hardcode ekledim

			return await axios
				.post(
					`${process.env.VUE_APP_API_URL}superuser/update.php`,
					params,
					reqConfig,
				)
				.then((response) => {
					if (response.data === "Success") {
						this.fetchSuperUserStations().then(() => {
							localStorage.setItem(
								"selectedStation",
								this.stationObject.id,
							);
							this.$router.push({
								name: "MyStation",
								params: {
									superStationID: this.stationObject.id,
								},
							});
						});
					} else {
						console.log("Error of superuser api");
					}
				});
		},

		// girilen iki koordinat arasi mesafeyi metre cinsinden olcer
		distanceMeter(lat1, lon1, lat2, lon2) {
			if (lat1 == lat2 && lon1 == lon2) {
				return 0;
			} else {
				var radlat1 = (Math.PI * lat1) / 180;
				var radlat2 = (Math.PI * lat2) / 180;
				var theta = lon1 - lon2;
				var radtheta = (Math.PI * theta) / 180;
				var dist =
					Math.sin(radlat1) * Math.sin(radlat2) +
					Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
				if (dist > 1) {
					dist = 1;
				}
				dist = Math.acos(dist);
				dist = (dist * 180) / Math.PI;
				dist = dist * 60 * 1.1515;
				dist = dist * 1609.344;

				return dist;
			}
		},

		// kullanicinin koordinatlarini kontrol eder, mevcut konumu ilk konumundan 25 metre farkliysa konumu gunceller ve istasyonu tekrar cagirir.
		checkPosition() {
			navigator.geolocation.getCurrentPosition((position) => {
				const distance = this.distanceMeter(
					this.center.lat,
					this.center.lng,
					position.coords.latitude,
					position.coords.longitude,
					"m",
				);

				if (distance > 25) {
					this.geolocate();
				}
			});
		},

		...mapActions({
			fetchSuperUserStations: "superUser/fetchSuperUserStations",
		}),
	}, // METHODS

	computed: {
		...mapState(["superUserStations"]),
	},

	async created() {
		this.superUser = JSON.parse(localStorage.getItem("superUser"));
		this.geolocate();

		// 5 saniye arayla kullanicinin konumunu check eder
		this.searchStationInterval = setInterval(
			function() {
				this.checkPosition();
			}.bind(this),
			5000,
		);
	},

	beforeRouteLeave(to, from, next) {
		clearInterval(this.searchStationInterval);
		next();
	},
};
</script>

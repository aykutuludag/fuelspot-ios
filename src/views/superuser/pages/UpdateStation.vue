<template>
	<section class="station__update">
		<div class="main-wrapper">
			<div class="container">
				<a
					class="p-absolute fg-red hide-under-md"
					@click="$router.go(-1)"
				>
					<i class="fas fa-long-arrow-left fa-2x"></i>
				</a>
				<div class="formItem" align="center">
					<img
						:src="station.logoURL"
						align="center"
						style="border:1px solid red"
					/>
					<br />
					<br />
					<h4>{{ station.name }}</h4>
					<h4>{{ station.licenseNo }}</h4>
					<label for="vicinity"></label>
					<h3>Adres</h3>
					<textarea
						data-vv-scope="updateStationForm"
						type="text"
						id="vicinity"
						name="vicinity"
						style="width:75%;"
						v-model="tempStation.vicinity"
						v-validate="'required'"
					></textarea>
					<span
						class="validate validate--error"
						v-if="errors.has('updateStationForm.vicinity')"
					>
						{{ errors.first("updateStationForm.vicinity") }}
					</span>
					<br />
					<br />
					<div style="border: red 1px solid;margin:4px;padding: 4px;">
						<p>
							Marka / Lisans / Sahip-Yönetici değişiklikleri,
							yanlış fiyat girişi veya sistem kullanımında herhangi
							bir sorunla karşılaşırsanız bizimle iletişime
							geçiniz.
						</p>
						<fs-button
							color="red"
							@click.native="openReport"
						>
							İletişim
						</fs-button>
					</div>
                    <div style="border: blue 1px solid;margin:4px;padding: 4px;">
                        <p>
                            Yardım sayfasından sistem kullanımıyla alakalı bilgilere ulaşabilirsiniz.
                        </p>
                        <fs-button
                                color="blue"
                                to="/help-for-superuser"
                        >
                            Yardım
                        </fs-button>
                    </div>
					<!-- Report Modal -->
					<modal
						name="superUserContactForm"
						@before-close="beforeClose()"
					>
						<div class="v--modal__inner py-4 px-3">
							<SuperUserContactForm
								@reportCompleted="
									closeModal('superUserContactForm')
								"
							/>
						</div>
					</modal>
					<!-- Report Modal -->
				</div>
				<br />
				<h1 align="center">Fiyatlar</h1>
				<div class="formItem" style="background-color: #EAEAEA;">
					<label class="form__label" for="gasolinePrice">
						Benzin
					</label>
					<currency-input
						class="form-control"
						currency="TRY"
						data-vv-scope="updateStationForm"
						:distraction-free="false"
						id="gasolinePrice"
						type="text"
						name="gasolinePrice"
						placeholder="₺0,00"
						v-model="tempStation.gasolinePrice"
						v-validate="'required'"
					></currency-input>
					<span
						class="validate validate--error"
						v-if="errors.has('updateStationForm.gasolinePrice')"
					>
						{{ errors.first("updateStationForm.gasolinePrice") }}
					</span>
				</div>
				<div class="formItem" style="background-color: #EAEAEA;">
					<label class="form__label" for="dieselPrice">Dizel</label>
					<currency-input
						class="form-control"
						currency="TRY"
						:distraction-free="false"
						data-vv-scope="updateStationForm"
						id="dieselPrice"
						type="text"
						name="dieselPrice"
						placeholder="₺0,00"
						v-model="tempStation.dieselPrice"
						v-validate="'required'"
					></currency-input>
					<span
						class="validate validate--error"
						v-if="errors.has('updateStationForm.dieselPrice')"
					>
						{{ errors.first("updateStationForm.dieselPrice") }}
					</span>
				</div>
				<div class="formItem" style="background-color: #EAEAEA;">
					<label class="form__label" for="lpgPrice">LPG</label>
					<currency-input
						class="form-control"
						currency="TRY"
						:distraction-free="false"
						data-vv-scope="updateStationForm"
						id="lpgPrice"
						type="text"
						name="lpgPrice"
						placeholder="₺0,00"
						v-model="tempStation.lpgPrice"
						v-validate="'required'"
					></currency-input>
					<span
						class="validate validate--error"
						v-if="errors.has('updateStationForm.lpgPrice')"
					>
						{{ errors.first("updateStationForm.lpgPrice") }}
					</span>
				</div>
				<div class="formItem" style="background-color: #EAEAEA;">
					<label class="form__label" for="electricityPrice">
						Elektrik
					</label>
					<currency-input
						class="form-control"
						currency="TRY"
						:distraction-free="false"
						data-vv-scope="updateStationForm"
						id="electricityPrice"
						type="text"
						name="electricityPrice"
						placeholder="₺0,00"
						v-model="tempStation.electricityPrice"
						v-validate="'required'"
					></currency-input>
					<span
						class="validate validate--error"
						v-if="errors.has('updateStationForm.electricityPrice')"
					>
						{{ errors.first("updateStationForm.electricityPrice") }}
					</span>
					<br />
					<div style="border: red 1px solid; margin: 4px; padding: 4px;">
						<h3 align="center">ÖNEMLİ</h3>
						<li>
							Eğer aynı ürün grubundan birden fazla yakıt
							satıyorsanız (Dizel, Euro-Dizel), fiyatı yüksek
							olanı giriniz.
						</li>
						<li>
							Örnek: Dizel 6.30 ₺/lt, Euro-Dizel 6.35 ₺/lt ise
							sisteme 6.35 ₺/lt girmelisiniz. Çok yakında bu sayfa
							üzerinden sattığınız ikincil yakıtları ve harici
							ürünleri (AdBlue vs.) ekleyebileceksiniz.
						</li>
						<li>
							Satmadığınız yakıt türleri için fiyat olarak 0
							giriniz.
						</li>
					</div>
				</div>
				<h1 align="center">Tesisler</h1>
				<div align="center" style="background-color: #EAEAEA;">
					<fs-checkbox
						v-model="facilities"
						id="WC"
						label="WC"
						name="facilities"
						data-value="WC"
					/>
					<fs-checkbox
						v-model="facilities"
						id="Market"
						label="Market"
						name="facilities"
						data-value="Market"
					/>
					<fs-checkbox
						v-model="facilities"
						id="CarWash"
						label="Oto Yıkama"
						name="facilities"
						data-value="CarWash"
					/>
					<fs-checkbox
						v-model="facilities"
						id="TireRepair"
						label="Lastik Tamir"
						name="facilities"
						data-value="TireRepair"
					/>
					<fs-checkbox
						v-model="facilities"
						id="Mechanic"
						label="Oto Tamir"
						name="facilities"
						data-value="Mechanic"
					/>
					<fs-checkbox
						v-model="facilities"
						id="Restaurant"
						label="Restaurant"
						name="facilities"
						data-value="Restaurant"
					/>
					<fs-checkbox
						v-model="facilities"
						id="ParkSpot"
						label="Otopark"
						name="facilities"
						data-value="ParkSpot"
					/>
					<fs-checkbox
						v-model="facilities"
						id="ATM"
						label="ATM"
						name="facilities"
						data-value="ATM"
					/>
					<fs-checkbox
						v-model="facilities"
						id="Motel"
						label="Motel"
						name="facilities"
						data-value="Motel"
					/>
				</div>
				<div align="center">
					<fs-button
						align="center"
						color="green"
						style="padding:8px"
						shadow
						@click.native="save"
					>
						<span>Kaydet</span>
					</fs-button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    const SuperUserContactForm = () =>
	import("@/components/superuser/SuperUserContactForm");

export default {
	name: "UpdateStation",
	components: { SuperUserContactForm },
	data() {
		return {
			tempStation: {},
			facilities: [],
		};
	},

	computed: {
		...mapState("station", ["station"]),
		...mapState("superUser", ["superUser", "superUserStations"]),

		superStationID() {
			return this.$route.params.superStationID;
		},

		facilitiesForBackend() {
			let facilities = {
				WC: this.facilities.indexOf("WC") !== -1 ? "1" : "0",
				Market: this.facilities.indexOf("Market") !== -1 ? "1" : "0",
				CarWash: this.facilities.indexOf("CarWash") !== -1 ? "1" : "0",
				TireRepair:
					this.facilities.indexOf("TireRepair") !== -1 ? "1" : "0",
				Mechanic:
					this.facilities.indexOf("Mechanic") !== -1 ? "1" : "0",
				Restaurant:
					this.facilities.indexOf("Restaurant") !== -1 ? "1" : "0",
				ParkSpot:
					this.facilities.indexOf("ParkSpot") !== -1 ? "1" : "0",
				ATM: this.facilities.indexOf("ATM") !== -1 ? "1" : "0",
				Motel: this.facilities.indexOf("Motel") !== -1 ? "1" : "0",
			};
			return JSON.stringify([facilities]);
		},
	},

	methods: {
		...mapActions({
			fetchSuperUserStations: "superUser/fetchSuperUserStations",
			fetchStation: "station/currentStation",
			updateStation: "station/updateStation",
		}),

		openReport() {
			this.openModal("superUserContactForm");
		},

		openModal() {
			this.$modal.show("superUserContactForm");
			document.querySelector("body").style.overflow = "hidden";
		},

		closeModal(modalName) {
			this.$modal.hide(modalName);
		},

		beforeClose() {
			document.querySelector("body").removeAttribute("style");
		},

		async save() {
			const validationResponse = await this.$validator.validateAll(
				"updateStationForm",
			);

			if (!validationResponse) {
				return false;
			}

			const payload = {
				stationID: this.superStationID,
				stationName: this.tempStation.name,
				country: this.tempStation.country,
				address: this.tempStation.vicinity,
				facilities: this.facilitiesForBackend,
				gasolinePrice: this.tempStation.gasolinePrice,
				dieselPrice: this.tempStation.dieselPrice,
				lpgPrice: this.tempStation.lpgPrice,
				electricityPrice: this.tempStation.electricityPrice,
			};

			this.updateStation(payload)
				.then(() => {
					this.$snotify.success(
						"İstasyon Güncellendi!",
						"Başarılı!",
						{
							timeout: 3000,
							showProgressBar: false,
						},
					);

					this.$router.push({
						name: "MyStation",
						params: {
							superStationID: this.superStationID,
						},
					});
				})
				.catch((error) => {
					this.$snotify.error("Hata!", "Bir Hata Oluştu!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		},
	},

	async created() {
		await this.fetchSuperUserStations();

		let superIDs = [];
		let isVerified = 0;

		for (let i = 0; i < this.superUserStations.length; i++) {
			superIDs[i] = this.superUserStations[i].id;
			isVerified = this.superUserStations[i].isVerified;
		}

		if (superIDs.includes(this.superStationID)) {
			if (Number(isVerified) === 1) {
				await this.fetchStation(this.superStationID);

				this.tempStation = JSON.parse(JSON.stringify(this.station));
				this.tempStation.gasolinePrice = Number(
					this.tempStation.gasolinePrice,
				);
				this.tempStation.dieselPrice = Number(
					this.tempStation.dieselPrice,
				);
				this.tempStation.lpgPrice = Number(this.tempStation.lpgPrice);
				this.tempStation.electricityPrice = Number(
					this.tempStation.electricityPrice,
				);

				const facilities = JSON.parse(this.tempStation.facilities)[0];

				Object.keys(facilities).filter((f) => {
					if (Number(facilities[f]) === 1) {
						this.facilities.push(f);
					}
				});
			} else {
				this.$snotify.error(
					"İstasyon henüz onay aşamasında. Sizinle en kısa sürede iletişime geçeceğiz.",
					"Hata!",
					{
						timeout: 3000,
						showProgressBar: false,
					},
				);
			}
		} else {
			this.$snotify.error("Bu sayfayı görmeye yetkiniz yok.", "Hata!", {
				timeout: 3000,
				showProgressBar: false,
			});
		}
	},
};
</script>

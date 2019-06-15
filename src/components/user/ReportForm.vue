<template>
	<form
		class="form p-relative"
		data-vv-scope="reportForm"
		@submit.prevent="submit"
	>
		<a
			class="v--modal__close fg-red-lighten-2 p-absolute top-0 right-0"
			@click="$modal.hide('reportModal')"
		>
			<i class="far fa-times"></i>
		</a>

		<h1 class="form__heading text-center">
			<span v-if="type === 'report'">İstasyon</span>
			<span v-else>Fiyat</span>
			Bildir
		</h1>
		<template v-if="type === 'report'">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12 mb-3 wrapper--validation">
						<label class="form__label">Probleminizi belirtin</label>
						<select
							class="form-control"
							data-vv-scope="reportForm"
							name="report"
							v-model="report.report"
							v-validate="'required'"
							placeholder="Rapor"
						>
							<option value="İstasyon mevcut değil" selected>
								İstasyon mevcut değil
							</option>
							<option value="Mevcut bir yerin kopyası">
								Mevcut bir yerin kopyası
							</option>
							<option value="Hatalı istasyon bilgileri">
								Hatalı istasyon bilgileri
							</option>
							<option value="Hatalı tesis bilgileri">
								Hatalı tesis bilgileri
							</option>
							<option value="Hizmet ve kalite problemleri">
								Hizmet ve kalite problemleri
							</option>
							<option value="Diğer">Diğer</option>
						</select>
						<span
							class="validate validate--error"
							v-if="errors.has('reportForm.report')"
						>
							{{ errors.first("reportForm.report") }}
						</span>
					</div>

					<div class="col-12">
						<label class="form__label">Probleminizi anlatın</label>
						<textarea
							class="form-control"
							cols="30"
							data-vv-scope="reportForm"
							rows="4"
							name="details"
							v-validate="'required|min:3'"
							v-model="report.details"
						></textarea>
						<span
							class="validate validate--error"
							v-if="errors.has('reportForm.details')"
						>
							{{ errors.first("reportForm.details") }}
						</span>
					</div>
				</div>
			</div>
		</template>

		<template v-else>
			<div class="container-fluid">
				<div class="row">
					<div class="col-12 col-md-6 mt-3">
						<label class="form__label" for="gasoline">Benzin</label>
						<currency-input
							class="form-control"
							currency="TRY"
							:distraction-free="false"
							id="gasoline"
							type="text"
							name="gasoline"
							v-model="report.prices.gasoline"
							placeholder="₺0,00"
						></currency-input>
					</div>

					<div class="col-12 col-md-6 mt-3">
						<label class="form__label" for="diesel">Dizel</label>
						<currency-input
							class="form-control"
							currency="TRY"
							:distraction-free="false"
							id="diesel"
							type="text"
							name="diesel"
							v-model="report.prices.diesel"
							placeholder="₺0,00"
						></currency-input>
					</div>

					<div class="col-12 col-md-6 mt-3">
						<label class="form__label" for="lpg">LPG</label>
						<currency-input
							class="form-control"
							currency="TRY"
							:distraction-free="false"
							id="lpg"
							type="text"
							name="lpg"
							v-model="report.prices.lpg"
							placeholder="₺0,00"
						></currency-input>
					</div>

					<div class="col-12 col-md-6 mt-3">
						<label class="form__label" for="electricity">
							Elektrik
						</label>
						<currency-input
							class="form-control"
							currency="TRY"
							:distraction-free="false"
							id="electricity"
							type="text"
							name="electricity"
							v-model="report.prices.electricity"
							placeholder="₺0,00"
						></currency-input>
					</div>
				</div>
			</div>
		</template>

		<div class="col-12 mt-3">
			<label class="form__label">Fotoğraf ekleyin</label>
			<input
				class="form-control"
				type="file"
				aria-label="Fotoğraf"
				v-validate="'required'"
				name="photo"
				@change="onFileChanged"
				ref="photo"
			/>
			<span
				class="validate validate--error"
				v-if="errors.has('reportForm.photo')"
			>
				{{ errors.first("reportForm.photo") }}
			</span>
		</div>

		<div class="col-12">
			<hr class="my-4" />
		</div>

		<div class="col-12 d-flex flex-row justify-content-end">
			<fs-button color="green" type="submit">
				<i class="far fa-save mr-2 fs-16"></i>
				Kaydet
			</fs-button>
		</div>
	</form>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
	name: "ReportForm",

	data() {
		return {
			report: {
				report: "",
				details: "",
				photo: null,
				prices: {
					gasoline: null,
					diesel: null,
					lpg: null,
					electricity: null,
				},
			},
		};
	},

	props: {
		type: {
			type: String,
			default: "report", // report, price
		},
	},

	computed: {
		...mapState("user", ["user"]),
		...mapState("station", ["station"]),
	},

	components: {},

	methods: {
		...mapActions({
			addReport: "station/addReport",
		}),

		onFileChanged(event) {
			const file = event.target.files[0];
			this.getBase64(file);
		},

		getBase64(file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function() {
				this.report.photo = reader.result;
				this.report.photo = this.report.photo.replace(
					"data:image/png;base64,",
					"",
				);
				this.report.photo = this.report.photo.replace(
					"data:image/jpeg;base64,",
					"",
				);
			}.bind(this);
		},

		async submit() {
			const validationResponse = await this.$validator.validateAll(
				"reportForm",
			);

			if (!validationResponse) {
				return false;
			}

			let payload = JSON.parse(JSON.stringify(this.report));
			payload.username = this.user.username;
			payload.stationID = this.station.id;

			this.addReport(payload)
				.then(() => {
					this.$snotify.success(
						"Raporunuz Gönderildi!",
						"Başarılı!",
						{
							timeout: 3000,
							showProgressBar: false,
						},
					);

					this.$emit("reportCompleted");
				})
				.catch((error) => {
					this.$snotify.error("Bir Hata Oluştu!", "Hata!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		},
	},

	created() {
		if (this.type === "price") {
			this.report.report = "Fiyatlar uygulamadakinden farklı";
		}
	},
};
</script>

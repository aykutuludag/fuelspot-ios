<template>
	<div>
		<form
			class="form"
			data-vv-scope="campaignForm"
			@submit.prevent="submit"
		>

		<div class="container">
			<div class="row">
				<div class="col-12">
					<label class="form__label">
						Kampanya Adı
					</label>
					<input
						class="form-control"
						data-vv-scope="campaignForm"
						type="text"
						name="campaignName"
						aria-label="Adınız ve Soyadınız"
						v-model="campaign.campaignName"
						v-validate="'required'"
					/>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<label class="form__label">
						Kampanya Detayları
					</label>
					<textarea
						class="form-control"
						style="max-width: 540px;"
						data-vv-scope="campaignForm"
						rows="4"
						name="campaignDesc"
						v-validate="'required|min:15'"
						v-model="campaign.campaignDesc"
					></textarea>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-md-6">
					<label class="form__label">
						Başlangıç
					</label>
					<datepicker
						data-vv-scope="campaignForm"
						input-class="form-control"
						name="campaignStart"
						:language="tr"
						monday-first
						format="dd MMMM yyyy"
						aria-label="Başlangıç Tarihi"
						v-validate="'required'"
						v-model="campaignStart"
					>
					</datepicker>
				</div>
				<div class="col-12 col-md-6">
					<label class="form__label">
						Bitiş
					</label>
					<datepicker
						data-vv-scope="campaignForm"
						input-class="form-control"
						name="campaignEnd"
						:language="tr"
						monday-first
						format="dd MMMM yyyy"
						aria-label="Bitiş Tarihi"
						v-validate="'required'"
						v-model="campaignEnd"
					>
					</datepicker>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<label class="form__label">
						Kampanya Görseli
					</label>
					<input
						data-vv-scope="campaignForm"
						class="form-control"
						type="file"
						aria-label="Profil Fotoğrafınız"
						@change="onFileChanged"
						ref="photo"
						v-if="!campaign.campaignPhoto"
						v-validate="'required'"
						name="campaignPhoto"
					/>
					<template>
						<img :src="campaign.campaignPhoto">
						<a
							class="p-absolute top-0 right-0 mr-3 fg-red"
							@click="removeCampaignImage()"
							v-if="campaign.campaignPhoto"
						>
							<i class="far fa-times-circle"></i>
						</a>
					</template>
				</div>
			</div>
		</div>			

			<fs-button
				class="mt-4"
				color="green"
			>
				<i class="far fa-save mr-2" style="font-size: 17px"></i>
				<span>Kaydet</span>
			</fs-button>
		</form>
	</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { tr } from 'vuejs-datepicker/dist/locale';
import moment from 'moment';

export default {
	name: "CampaignForm",

	data() {
		return {
			campaign: {},
			campaignStart: null,
			campaignEnd: null,
			tr: tr,
		};
	},

	props: {

		dataCampaign: {
			type: Object,
			required: false,
		},

	},

	computed: {
		
		editStatus() {
			return this.dataCampaign !== undefined;
		},

	},

	components: {
		Datepicker,
	},

	methods: {
		
		async submit() {
			const validationResult = await this.$validator.validateAll(
				"campaignForm",
			);

			if (!validationResult) {
				this.$snotify.error(
					'Hata!',
					this.errors.items[0].msg,
					{
						timeout: 3000,
						showProgressBar: false
					}
				);
				return false;
			}

			this.campaign.campaignStart = moment(this.campaignStart).format('YYYY-MM-DD');
			this.campaign.campaignEnd 	= moment(this.campaignEnd).format('YYYY-MM-DD');

			this.$emit("submit", this.campaign);

			this.$validator.reset("campaignForm");
		},

		onFileChanged (event) {
			const file = event.target.files[0]
			this.getBase64(file)
		},

		getBase64(file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				this.campaign.campaignPhoto = reader.result;
                this.campaign.campaignPhoto = this.campaign.campaignPhoto.replace("data:image/png;base64,", "");
                this.campaign.campaignPhoto = this.campaign.campaignPhoto.replace("data:image/jpeg;base64,", "");
			}.bind(this);
		},

		removeCampaignImage(){
			this.campaign.campaignPhoto     = null;
			this.$refs.photo.value      	= "";
		},

	},

	created() {

		if (typeof this.dataCampaign !== 'undefined') {

			this.campaign 		= JSON.parse(JSON.stringify(this.dataCampaign));
			this.campaignStart 	= moment(this.campaign.campaignStart).format('YYYY-MM-DD');
			this.campaignEnd 	= moment(this.campaign.campaignEnd).format('YYYY-MM-DD');

		}else{
			this.campaign = JSON.parse(JSON.stringify(this.$store.state['campaigns'].campaign));
		}

	},
};
</script>

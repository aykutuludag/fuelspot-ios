<template>
	<div>
		<div class="v--modal__img p-relative">
			<img
				:src="campaign.campaignPhoto"
				alt="kampanya!"
			/>
			<div
				class="p-absolute top-0 left-0 w-100 h-100"
				:style="`background-image: url(${campaign.campaignPhoto}); filter: blur(8px);`"
			></div>
		</div>
		<div class="v--modal__body">
			<h3 class="v--modal__heading">
				{{ campaign.campaignName }}
			</h3>
			<p class="v--modal__time font-numeric">
				{{ campaign.campaignStart | moment("calendar") }} - {{ campaign.campaignEnd | moment("calendar") }}
			</p>
			<p class="v--modal__time--end text-uppercase fg-blue">
				{{ campaign.campaignEnd | moment("from", "now") }} sonra sona eriyor!
			</p>
			<p class="v--modal__text">
				{{ campaign.campaignDesc }}
			</p>
			<a v-if="station.owner === superUser.username" @click="openCampEditModal">Düzenle</a>
			<a v-if="station.owner === superUser.username" @click="openCampDeleteModal">Sil</a>
		</div>

		<!-- Modals -->

			<modal
				:name="`editCampaignModal_${compID}`"
				height="auto"
				@before-close="beforeClose()"
			>
				<div class="v--modal__inner py-4 px-3">
					<h1 class="form__heading">
						Kampanya Düzenle
					</h1>
					<campaign-form
						@submit="editCampaign"
						:dataCampaign="campaign"
					/>
				</div>
			</modal>

			<modal
			:name="`deleteCampaignModal_${compID}`"
			height="auto"
			@before-close="beforeClose()"
		>
			<div class="v--modal__inner py-4 px-3">
				<h1 class="v--modal__heading fg-blue-grey">
					<i
						class="d-block mb-4 far fa-exclamation-circle fg-orange"
						style="font-size:28px"
					></i>
					<span>Bu kampanyayı silmek istediğinize emin misiniz?</span>
				</h1>
				<div class="d-flex flex-row align-items-center justify-content-between">
					<fs-button
						color="blue-grey"
						borderless
						width="100px"
						@click.native="closeCampDeleteModal"
					>
						Vazgeç
					</fs-button>
					<fs-button
						color="red"
						width="100px"
						borderless
						@click.native="remove"
					>
						Sil
					</fs-button>
				</div>
			</div>
		</modal>

		<!-- Modals End-->

	</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	const CampaignForm 	= () => import('@/components/CampaignForm');

	export default {

		name: "CampaignModal",

		data(){
			return {
				compID: Math.random().toString(36).replace('0.', '').substring(0, 10).toUpperCase()
			}
		},

		props: {
			
			campaignID: {
				type: [Number, String],
			}

		}, // PROPS

		computed: {

			...mapState('campaigns', ['campaigns']),
			...mapState('superUser', ['superUser']),
			...mapState('station', ['station']),

			campaign(){
				return this.campaigns.find(c => c.id === this.campaignID);
			}

		}, // COMPUTED

		components: {
			CampaignForm
		},

		methods: {

			...mapActions({
				'updateCampaign': 'campaigns/updateCampaign',
				'deleteCampaign': 'campaigns/deleteCampaign',
			}),

			openCampEditModal(){
	        	this.$modal.show(`editCampaignModal_${this.compID}`);
				document.querySelector("body").style.overflow = "hidden";
	        },

	        closeCampEditModal(){
	        	this.$modal.hide(`editCampaignModal_${this.compID}`);
	        },

	        openCampDeleteModal(){
	        	this.$modal.show(`deleteCampaignModal_${this.compID}`);
				document.querySelector("body").style.overflow = "hidden";
	        },

	        closeCampDeleteModal(){
	        	this.$modal.hide(`deleteCampaignModal_${this.compID}`);
	        },

	        beforeClose() {
				document.querySelector("body").removeAttribute("style");
			},

	        editCampaign(campaign){
	        	
	        	campaign.stationID 	= this.station.id;
	        	campaign.campaignID = this.campaign.id;

				this.updateCampaign(campaign).then(() => {

					this.$snotify.success(
						"Kampanyanız Güncellendi!",
						'Başarılı!', {
						timeout: 3000,
						showProgressBar: false
					});

					this.closeCampEditModal();

				}).catch((error) => {
					console.log(error);
					this.$snotify.error(
						'Hata!',
						'Bir Hata Oluştu!', {
						timeout: 3000,
						showProgressBar: false
					});
				})
	        },

	        remove(){

			this.deleteCampaign(this.campaign.id).then(() => {

				this.$snotify.success(
					'Kampanya Silindi!',
					'Başarılı!', {
					timeout: 3000,
					showProgressBar: false
				});

				this.closeCampDeleteModal();

			}).catch((error) => {
				this.$snotify.error(
					'Hata!',
					'Bir Hata Oluştu!', {
					timeout: 3000,
					showProgressBar: false
				});
			})

		},

		}, // METHODS

		async created(){
		}
	
	}
</script>

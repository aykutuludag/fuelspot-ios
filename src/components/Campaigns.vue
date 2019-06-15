<template>
	<div class="v--modal__inner">
		<a
			class="v--modal__close fg-red-lighten-2 p-absolute top-0 right-0"
			@click="$modal.hide('campaigns')"
		>
			<i class="far fa-times"></i>
		</a>
		<a 
			v-if="station.owner === superUser.username"
			@click="openNewCampModal"
		>
			Kampanya Ekle
		</a>

		<template v-if="loaded">
			<template v-if="campaigns">
				<single-campaign
					v-for="(campaign, keyCampaign) in campaigns"
					:campaignID="campaign.id"
				>	
				</single-campaign>
			</template>
			<template v-else>
				<p>Güncel bir kampanya yok...</p>
			</template>
		</template>

		<!-- Modals -->

			<modal
				name="newCampModal"
				height="auto"
				@before-close="beforeClose()"
			>
				<div class="v--modal__inner py-4 px-3">
					<h1 class="form__heading">
						Kampanya Ekle
					</h1>
					<campaign-form
						@submit="newCampaign"
					/>
				</div>
			</modal>

		<!-- Modals End-->

	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	const SingleCampaign 	= () => import("@/components/SingleCampaign");
	const CampaignForm 		= () => import('@/components/CampaignForm');

	export default {

		name: "Campaigns",

		data(){
			return {
				loaded: false
			}
		},

		props: {
			stationID: {
				type: [String, Number]
			}
		},

		computed: {

			...mapState('campaigns', ['campaigns']),
			...mapState('station', ['station']),
			...mapState('superUser', ['superUser']),

		},

		components: {
			SingleCampaign,
			CampaignForm
		},

		methods: {

			...mapActions({
				'fetchCampaigns': 'campaigns/fetchCampaigns',
				'addCampaign': 'campaigns/addCampaign',
			}),

			openNewCampModal(){
	        	this.$modal.show('newCampModal');
				document.querySelector("body").style.overflow = "hidden";
	        },

	        closeNewCampModal(){
	        	this.$modal.hide('newCampModal');
	        },

	        beforeClose() {
				document.querySelector("body").removeAttribute("style");
			},

			newCampaign(campaign){

				campaign.stationID = this.station.id;

				this.addCampaign(campaign).then(() => {

					this.$snotify.success(
						"Kampanyanız Eklendi!",
						'Başarılı!', {
						timeout: 3000,
						showProgressBar: false
					});

					this.closeNewCampModal();

				}).catch((error) => {
					console.log(error);
					this.$snotify.error(
						'Hata!',
						'Bir Hata Oluştu!', {
						timeout: 3000,
						showProgressBar: false
					});
				})

			}

		},

		async created(){
			await this.fetchCampaigns(this.stationID);
			this.loaded = true;
		}

	}
</script>

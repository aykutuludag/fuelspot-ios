<template>
	<div class="stations">
		<div class="home">
			<div class="main-wrapper">
				<div class="container">
					<div class="row">
						<div class="col-12 mb-4">
							<GoogleMap />
						</div>
						<div class="col-12 col--sorting py-1 mb-0">
							<div>
								<span>Şuna göre sırala:</span>
								<select v-model="stationFilter">
									<option value="distance" selected>Mesafe</option>
									<option value="gasoline">Benzin</option>
									<option value="diesel">Dizel</option>
									<option value="lpg">LPG</option>
									<option value="electricity">Elektrik</option>
								</select>
							</div>
							<div>
								<span>
									Filtrele:
								</span>
								<a
									class="fg-blue fw-400"
									href="#"
									@click.prevent="openFilterModal"
								>
									<!-- kaç tane seçiliyse -->
									{{ facilitiesCount }} seçili
								</a>
								<modal
									name="facilitiesFilter"
									height="auto"
									@before-close="beforeClose()"
								>
									<stations-facilities-filter />
								</modal>
							</div>

						</div>
					</div>
					<div class="row row--stations">
						<div class="col-12 station">
							<StationCard />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const GoogleMap 				= () => import("@/components/user/GoogleMap");
const StationCard 				= () => import("@/components/user/StationCard");
const StationsFacilitiesFilter 	= () => import("@/components/user/StationsFacilitiesFilter");

import {mapActions, mapGetters, mapState} from "vuex";

export default {
	name: "Stations",

	data() {
		return {

		};
	},

	computed:{

		stationFilter: {
			get(){
				return this.sortStation;
			},
			set(sortStation){
				this.$store.commit('station/SET_SORT_STATION', sortStation);
			}
		},

		...mapState('station', ['sortStation']),

		...mapGetters({
			'facilitiesCount': 'station/facilitiesCount'
		})

	},

	components: {
		StationCard,
		GoogleMap,
		StationsFacilitiesFilter
	},

	metaInfo: {
		title: "İstasyonlar",
	},

	methods: {

		...mapActions({
			fetchLocation: "station/fetchLocation",
		}),

		openFilterModal(){
			this.$modal.show('facilitiesFilter');
			document.querySelector("body").style.overflow = "hidden";
		},

		closefilterModal(){
			this.$modal.hide('facilitiesFilter');
		},

		beforeClose() {
			document.querySelector("body").removeAttribute("style");
		},

	},

	async created() {
		this.fetchLocation();
	},
};
</script>

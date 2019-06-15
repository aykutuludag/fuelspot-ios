<template>
	<div class="v--modal__inner d-flex flex-row flex-wrap v--modal--filter py-4 px-3">
		<h1 class="form__heading d-block w-100">
			Filtrele
		</h1>
		<fs-checkbox
			v-model="selectedFacilities"
			id="WC"
			label="WC"
			name="selectedFacilities"
			dataValue="WC"
		/>
		<fs-checkbox
			v-model="selectedFacilities"
			id="Market"
			label="Market"
			name="selectedFacilities"
			dataValue="Market"
		/>
		<fs-checkbox
			v-model="selectedFacilities"
			id="CarWash"
			label="Oto Yıkama"
			name="selectedFacilities"
			dataValue="CarWash"
		/>
		<fs-checkbox
			v-model="selectedFacilities"
			id="TireRepair"
			label="Lastik Tamir"
			name="selectedFacilities"
			dataValue="TireRepair"
		/>
		<fs-checkbox
			v-model="selectedFacilities"
			id="Mechanic"
			label="Oto Tamir"
			name="selectedFacilities"
			dataValue="Mechanic"
		/>
		<fs-checkbox
			v-model="selectedFacilities"
			id="Restaurant"
			label="Restaurant"
			name="selectedFacilities"
			dataValue="Restaurant"
		/>
		<fs-checkbox
			v-model="selectedFacilities"
			id="ParkSpot"
			label="Otopark"
			name="selectedFacilities"
			dataValue="ParkSpot"
		/>
		<fs-checkbox
			v-model="selectedFacilities"
			id="ATM"
			label="ATM"
			name="selectedFacilities"
			dataValue="ATM"
		/>
		<fs-checkbox
			v-model="selectedFacilities"
			id="Motel"
			label="Motel"
			name="selectedFacilities"
			dataValue="Motel"
		/>
	</div>
</template>

<script>

const StarRating = () => import("vue-star-rating");

import {mapState, mapActions} from 'vuex';

export default {

	name: "StationFacilitiesFilter",

	data(){

		return {

		}

	},

	computed: {

		...mapState('station', ['stationsFacilitiesFilter']),

		selectedFacilities: {

			get(){
				return this.stationsFacilitiesFilter;
			},
			set(selectedFacilities){
				this.$store.commit('station/SET_STATIONS_FACILITIES_FILTER', selectedFacilities);
			}

		}

	}


};
</script>

<template>
	<div>
		<div
			class="card card--station shadow-sm mb-3"
			v-for="station in superUserStations"
			:style="
				station.id === selectedStationID ? 'border:2px solid green' : ''
			"
			:key="station.googleID"
		>
			<!-- header -->
			<router-link
				:to="{
					name: 'MyStation',
					params: {
						superStationID: station.id,
					},
				}"
			>
				<div class="card--station__header p-relative d-flex flex-row">
					<!-- logo -->
					<div
						class="card--station__logo"
						:class="[
							station.isVerified > 0 ? 'bc-green' : 'bc-red',
						]"
						:title="
							station.isVerified > 0
								? 'Onaylı istasyon'
								: 'İstasyon'
						"
						v-tippy="{ placement: 'left' }"
					>
						<img :src="station.logoURL" alt="Logo" />
					</div>
					<div class="card--station__info">
						<!-- istasyon adı -->
						<p class="card--station__name">
							{{ station.name }}
							<span
								class="card--station__isVerified"
								title="Onaylı İstasyon"
								v-tippy="{ placement: 'right' }"
								v-if="station.isVerified > 0"
							>
								<i
									class="fas fa-map-marker-check ml-2 fg-green"
								></i>
							</span>
						</p>
						<!-- adres -->
						<p
							class="card--station__vicinity fg-blue-grey fw-500 d-inline-block text-truncate mb-0"
						>
							{{ station.vicinity }}
						</p>
					</div>
					<!-- son güncelleme -->
					<div
						class="card--station__lastUpdated fg-blue-grey-lighten-1 p-absolute top-0 right-0"
						title="Son güncellenme tarihi"
					>
						{{ station.lastUpdated | moment("from", "now") }}
						<i class="fal fa-history"></i>
					</div>
				</div>
				<!-- /header -->

				<hr />

				<!-- footer -->
				<div class="card--station__footer">
					<!-- benzin fiyat -->
					<span class="station__gasolinePrice">
						<strong class="d-block">Benzin:</strong>
						<b class="fg-black">
							{{
								Number(station.gasolinePrice) > 0
									? station.gasolinePrice + " ₺"
									: "-"
							}}
						</b>
					</span>
					<!-- dizel fiyat -->
					<span class="station__dieselPrice">
						<strong class="d-block">Dizel:</strong>
						<b class="fg-red">
							{{
								Number(station.dieselPrice) > 0
									? station.dieselPrice + " ₺"
									: "-"
							}}
						</b>
					</span>
					<!-- LPG fiyat -->
					<span class="station__lpgPrice">
						<strong class="d-block">LPG:</strong>
						<b class="fg-blue">
							{{
								Number(station.lpgPrice) > 0
									? station.lpgPrice + " ₺"
									: "-"
							}}
						</b>
					</span>
					<!-- Elektrik fiyat -->
					<span class="station__electricityPrice">
						<strong class="d-block">Elektrik:</strong>
						<b class="fg-green">
							{{
								Number(station.electricityPrice) > 0
									? station.electricityPrice + " ₺"
									: "-"
							}}
						</b>
					</span>
				</div>
				<!-- /footer -->
			</router-link>
		</div>
	</div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
	name: "StationCard",

	data() {
		return {
			stationLocation: {
				latitude: null,
				longitude: null,
			},
			stationFacilities: {
				wc: {
					src: "wc-sign",
					api: "WC",
					alt: "WC",
				},
				market: {
					src: "market-sign",
					api: "Market",
					alt: "Market",
				},
				wash: {
					src: "carwash-sign",
					api: "CarWash",
					alt: "Otoyıkama",
				},
				tire: {
					src: "tire-sign",
					api: "TireRepair",
					alt: "Lastik Tamir",
				},
				mechanic: {
					src: "mechanic-sign",
					api: "Mechanic",
					alt: "Oto Tamir",
				},
				restaurant: {
					src: "restaurant-sign",
					api: "Restaurant",
					alt: "Restoran",
				},
				parking: {
					src: "parking-sign",
					api: "ParkSpot",
					alt: "Park Yeri",
				},
				atm: {
					src: "atm",
					api: "ATM",
					alt: "ATM",
				},
				motel: {
					src: "motel",
					api: "Motel",
					alt: "Motel",
				},
			},
			selectedStationID: localStorage.getItem("selectedStation"),
		};
	},

	computed: {
		...mapState("superUser", ["superUser", "superUserStations"]),
	},
};
</script>

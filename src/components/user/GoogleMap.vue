<template>
	<div>
		<gmap-map
			class="shadow-sm google-map"
			:center="center"
			style="height: 325px;"
			:zoom="13"
			:options="{
				fullscreenControl: true,
				mapTypeControl: false,
				streetViewControl: true,
			}"
		>
			<gmap-marker
				v-for="(m, index) in stations"
				:key="index"
				:position="{
					lat: Number(m.location.split(';')[0]),
					lng: Number(m.location.split(';')[1]),
				}"
				:clickable="true"
				:draggable="false"
				:label="m.label"
				:icon="{
					url:
						Number(m.isVerified) === 1
							? require('../../assets/img/verified_station.png')
							: require('../../assets/img/default_station.png'),
				}"
				@click="openWindow(m)"
			/>
			<!-- https://xkjyeah.github.io/vue-google-maps/infowindow.html -->
			<gmap-info-window
				@closeclick="window_open = false"
				:opened="window_open"
				:position="window_pos"
				:options="{
					pixelOffset: {
						width: 0,
						height: 0,
					},
				}"
			>
				<div class="google-map__popover">
					<img class="google-map__popover__logo" :src="stationLogo" />
					<p class="google-map__popover__address fg-blue-grey">
						{{ vicinity }}
					</p>
					<ul class="google-map__popover__price">
						<li class="google-map__popover__price__item fg-red">
							Benzin: {{ gasolinePrice }} ₺
						</li>
						<li class="google-map__popover__price__item fg-green">
							Dizel: {{ dieselPrice }} ₺
						</li>
						<li class="google-map__popover__price__item fg-blue">
							LPG: {{ lpgPrice }} ₺
						</li>
					</ul>
					<router-link
						class="google-map__popover__button"
						:to="redirectURL"
					>
						İstasyonu görüntüle
						<i class="fas fa-chevron-right ml-2"></i>
					</router-link>
				</div>
			</gmap-info-window>
			<GmapCircle
				:key="-1"
				:center="center"
				:radius="2500"
				:visible="true"
				:options="{ fillColor: '#212121', fillOpacity: 0.1 }"
			></GmapCircle>
		</gmap-map>
	</div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
	name: "GoogleMap",

	data() {
		return {
			// default to Montreal to keep it simple
			// change this to whatever makes sense
			center: { lat: 39.92562, lng: 32.83805 },
			window_open: false,
			window_pos: null,
			id: 0,
			redirectURL: "",
			gasolinePrice: 0,
			dieselPrice: 0,
			lpgPrice: 0,
			stationLogo: "",
			vicinity: "",
		};
	},

	computed: {
		...mapState("station", ["stations"]),
	},

	methods: {
		geolocate: function() {
			navigator.geolocation.getCurrentPosition((position) => {
				this.center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
			});
		},

		openWindow: function(marker) {
			this.window_open = true;
			this.window_pos = {
				lat: Number(marker.location.split(";")[0]),
				lng: Number(marker.location.split(";")[1]),
			};
			this.id = marker.id;
			this.redirectURL = "stations/" + this.id;
			this.stationLogo = marker.logoURL;
			this.vicinity = marker.vicinity;
			this.gasolinePrice = marker.gasolinePrice;
			this.dieselPrice = marker.dieselPrice;
			this.lpgPrice = marker.lpgPrice;
		},
	},

	mounted() {
		this.geolocate();
	},
};
</script>

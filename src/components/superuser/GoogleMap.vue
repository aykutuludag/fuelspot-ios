<template>
	<gmap-map
		class="shadow-sm google-map"
		:center="center"
		style="height: 300px;"
		:zoom="17.5"
		:options="{
			fullscreenControl: false,
			mapTypeControl: false,
			streetViewControl: true,
		}"
	>
		<gmap-circle
			:key="-1"
			:center="center"
			:radius="50"
			:visible="true"
			:options="{ fillColor: 'red', fillOpacity: 0.1 }"
		/>
		<gmap-marker
			:position="{
				lat: Number(stationObject.location.split(';')[0]),
				lng: Number(stationObject.location.split(';')[1]),
			}"
			:clickable="true"
			:draggable="false"
			:label="stationObject.label"
			@click="openWindow(stationObject)"
		/>
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
				<img
					class="google-map__popover__logo"
					:src="stationObject.logoURL"
				/>
				<ul class="google-map__popover__price">
					<li class="google-map__popover__price__item fg-black">
						Benzin: {{ stationObject.gasolinePrice }}
					</li>
					<li class="google-map__popover__price__item fg-red">
						Dizel: {{ stationObject.dieselPrice }}
					</li>
					<li class="google-map__popover__price__item fg-blue">
						LPG: {{ stationObject.lpgPrice }}
					</li>
					<li class="google-map__popover__price__item fg-green">
						Elektrik: {{ stationObject.electricityPrice }}
					</li>
				</ul>
			</div>
		</gmap-info-window>
	</gmap-map>
</template>

<script>
export default {
	name: "GoogleMap",

	props: ["center", "stationObject"],

	data: () => ({
		window_open: false,
		window_pos: null,
	}),

	methods: {
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
};
</script>

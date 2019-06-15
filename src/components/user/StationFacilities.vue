<template>
	<ul class="facilities__list">
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].WC === '1'"
		>
			<span class="facilities__list__item__single">
				Tuvalet
			</span>
		</li>
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].Market === '1'"
		>
			<span class="facilities__list__item__single">
				Market
			</span>
		</li>
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].CarWash === '1'"
		>
			<span class="facilities__list__item__single">
				Oto Yıkama
			</span>
		</li>
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].TireRepair === '1'"
		>
			<span class="facilities__list__item__single">
				Oto Lastik
			</span>
		</li>
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].Mechanic === '1'"
		>
			<span class="facilities__list__item__single">
				Oto Tamir
			</span>
		</li>
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].Restaurant === '1'"
		>
			<span class="facilities__list__item__single">
				Restoran
			</span>
		</li>
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].ParkSpot === '1'"
		>
			<span class="facilities__list__item__single">
				Otopark
			</span>
		</li>
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].ATM === '1'"
		>
			<span class="facilities__list__item__single">
				ATM
			</span>
		</li>
		<li
			class="facilities__list__item"
			v-if="JSON.parse(facilities)[0].Motel === '1'"
		>
			<span class="facilities__list__item__single">
				Motel
			</span>
		</li>
	</ul>
</template>

<script>
export default {
	name: "StationFacilities",
	props: {
        facilities: {},
	},
};
</script>

<template>
	<table class="station__price-table">
		<thead>
			<tr>
				<td class="fg-blue-grey-darken-1">
					Yakıt Türü
				</td>
				<td class="fg-blue-grey-darken-1">
					Güncel Fiyat
				</td>
				<td class="fg-blue-grey-darken-1 p-relative">
					ℓitre / 100 ₺
					<i
						class="far fa-question-circle fg-grey"
						title="İstasyonun güncel yakıt fiyatları üzerinden 100 ₺ ile kaç litre yakıt alabileceğinizi gösterir"
						v-tippy="{ placement: 'right', trigger: 'click' }"
					></i>
				</td>
			</tr>
		</thead>
		<tbody>
			<tr class="fg-black fw-500">
				<td>Benzin</td>
				<td class="station__prices__single font-numeric">
					{{
						Number(station.gasolinePrice) > 0
							? station.gasolinePrice + " ₺"
							: "-"
					}}
				</td>
				<td class="station__prices__single font--400">
					{{
						Number(station.gasolinePrice) > 0
							? (100 / station.gasolinePrice).toFixed(2) +
							  " litre"
							: "-"
					}}
				</td>
			</tr>
			<tr class="fg-red fw-500">
				<td>Dizel</td>
				<td class="station__prices__single font-numeric">
					{{
						Number(station.dieselPrice) > 0
							? station.dieselPrice + " ₺"
							: "-"
					}}
				</td>
				<td class="station__prices__single font--400">
					{{
						Number(station.dieselPrice) > 0
							? (100 / station.dieselPrice).toFixed(2) + " litre"
							: "-"
					}}
				</td>
			</tr>
			<tr class="fg-blue fw-500">
				<td>LPG</td>
				<td class="station__prices__single font-numeric">
					{{
						Number(station.lpgPrice) > 0
							? station.lpgPrice + " ₺"
							: "-"
					}}
				</td>
				<td class="station__prices__single font--400">
					{{
						Number(station.lpgPrice) > 0
							? (100 / station.lpgPrice).toFixed(2) + " litre"
							: "-"
					}}
				</td>
			</tr>
			<tr class="fg-green fw-500">
				<td>Elektrik</td>
				<td class="station__prices__single font-numeric">
					{{
						Number(station.electricityPrice) > 0
							? station.electricityPrice + " ₺"
							: "-"
					}}
				</td>
				<td class="station__prices__single font--400">
					{{
						Number(station.electricityPrice) > 0
							? (100 / station.electricityPrice).toFixed(2) + " ₺"
							: "-"
					}}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: "StationPrices",
	props: {
		station: {
			type: null,
			default: null,
		},
	},
};
</script>

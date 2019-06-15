<template>
	<section class="settings">
		<div class="main-wrapper">
			<div class="container">
				<h1 class="headline headline--main">Uygulama Bilgileri</h1>
				<div class="row">
					<div class="col-12 col-md-6">
						<h3 class="headline headline--sub">Temel</h3>
						<table class="table table-bordered table--basis">
							<thead class="table__head">
								<tr class="table__row">
									<th
										colspan="2"
										class="table__data table__data--left"
									>
										Konuma bağlı bilgiler
									</th>
								</tr>
							</thead>
							<tbody class="table__body">
								<tr class="table__row">
									<td class="table__data table__data--left">
										Ülke
									</td>
									<td class="table__data table__data--right">
										Türkiye
									</td>
								</tr>
								<tr>
									<td class="table__data table__data--left">
										Dil
									</td>
									<td class="table__data table__data--right">
										Türkçe
									</td>
								</tr>
								<tr>
									<td class="table__data table__data--left">
										Para birimi
									</td>
									<td class="table__data table__data--right">
										Türk Lirası (₺)
									</td>
								</tr>
								<tr>
									<td class="table__data table__data--left">
										Ölçü birimi
									</td>
									<td class="table__data table__data--right">
										Litre
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="col-12 col-md-6">
						<h3 class="headline headline--sub">Vergi</h3>
						<table class="table table-bordered table--tax">
							<thead class="table__head">
								<tr class="table__row">
									<th
										colspan="2"
										class="table__data table__data--left"
									>
										Yakıt türüne bağlı vergiler
									</th>
								</tr>
							</thead>
							<tbody class="table__body">
								<tr class="table__row">
									<td class="table__data table__data--left">
										Benzin
									</td>
									<td class="table__data table__data--right">
										%
										{{
											parseFloat(
												(
													taxArray.gasolineTax * 100
												).toFixed(10),
											)
										}}
									</td>
								</tr>
								<tr class="table__row">
									<td class="table__data table__data--left">
										Dizel
									</td>
									<td class="table__data table__data--right">
										%
										{{
											parseFloat(
												(
													taxArray.dieselTax * 100
												).toFixed(10),
											)
										}}
									</td>
								</tr>
								<tr class="table__row">
									<td class="table__data table__data--left">
										LPG
									</td>
									<td class="table__data table__data--right">
										%
										{{
											parseFloat(
												(taxArray.LPGTax * 100).toFixed(
													10,
												),
											)
										}}
									</td>
								</tr>
								<tr class="table__row">
									<td class="table__data table__data--left">
										Elektrik
									</td>
									<td class="table__data table__data--right">
										%
										{{
											parseFloat(
												(
													taxArray.electricityTax *
													100
												).toFixed(10),
											)
										}}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<footer
						class="col-12 text-center mt-5 footer footer--settings"
					>
						<div class="container-fluid">
							<div class="row">
								<div class="col">
									<!--Popup olabilir. Bağlanılacak api: https://fuelspot.com.tr/api/other/feedback.php (username,message,AUTH_KEY) -->
									<fs-button
										width="100%"
										tag="a"
										color="grey"
										to="#"
									>
										Geri bildirim
									</fs-button>
								</div>

								<div class="col">
									<fs-button
										width="100%"
										tag="a"
										color="grey"
										to="/privacy"
									>
										Gizlilik Politikası
									</fs-button>
								</div>

								<div class="col">
									<fs-button
										width="100%"
										tag="a"
										color="grey"
										to="/terms-and-conditions"
									>
										Şartlar & Koşullar
									</fs-button>
								</div>
							</div>
						</div>

						<h3
							class="headline headline--sub"
							style="margin-top: 16px;"
						>
							SOSYAL MEDYA
						</h3>
						<div
							class="col-12 d-flex flex-row justify-content-between align-items-center mb-4"
						>
							<a
								href="https://www.facebook.com/fuelspotapp/"
								target="_blank"
							>
								<i class="fab fa-facebook fa-5x"></i>
							</a>
							<a
								href="https://twitter.com/fuelspotapp"
								target="_blank"
							>
								<i class="fab fa-twitter-square fa-5x"></i>
							</a>
							<a
								href="https://www.instagram.com/fuelspot/"
								target="_blank"
							>
								<i class="fab fa-instagram fa-5x"></i>
							</a>
							<a
								href="https://www.youtube.com/channel/UCy7-mbEFFvOyaPYfhQRReyw"
								target="_blank"
							>
								<i class="fab fa-youtube-square fa-5x"></i>
							</a>
						</div>
					</footer>

					<div class="col-12 text-center mt-4">
						<p>FuelSpot v1.0.0 - made with ♥ in Ankara</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
	name: "Settings",

	components: {},

	data() {
		return {
			taxArray: {},
		};
	},

	metaInfo: {
		title: "Ayarlar",
	},

	created() {
		this.fetchTaxRates("TR").then(
			(taxArray) => (this.taxArray = taxArray[0]),
		);
	},
	methods: {
		...mapActions(["fetchTaxRates"]),
	},
};
</script>

<style lang="scss" scoped></style>

<template>
	<div class="my-station" v-if="loaded">
		<div class="main-wrapper">
			<div class="container">
				<div class="mb-4">
					<div class="card card--my-station shadow-sm mt-4 p-3">
						<!-- header -->
						<router-link
							:to="{
								name: 'SingleStation',
								params: { id: station.id },
							}"
						>
							<div class="card--my-station__header">
								<!-- logo -->
								<div
									class="station__logo"
									:class="[
										station.isVerified > 0
											? 'bc-green'
											: 'bc-red',
									]"
									:title="
										station.isVerified > 0
											? 'Onaylı istasyon'
											: 'İstasyon'
									"
								>
									<img :src="station.logoURL" alt="Logo" />
								</div>
								<div class="station__info">
									<!-- istasyon adı -->
									<h1
										class="station__name d-inline-block p-relative"
									>
										{{ station.name }}
										<span
											class="station__isVerified"
											title="Onaylı İstasyon"
											v-tippy="{ placement: 'right' }"
											v-if="station.isVerified > 0"
										>
											<i
												class="fas fa-map-marker-check fg-green"
											></i>
										</span>
									</h1>
									<!-- adres -->
									{{ station.vicinity }}
									<!-- son güncelleme -->
									<div
										class="station__lastUpdated fg-blue-grey fw-500"
									>
										{{
											station.lastUpdated
												| moment("from", "now")
										}}
										güncellendi
									</div>
									<div class="station__facilities mt-4">
										<station-facilities
											:facilities="facilities"
										></station-facilities>
									</div>
								</div>
							</div>
							<!-- /header -->

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
												? station.electricityPrice +
												  " ₺"
												: "-"
										}}
									</b>
								</span>
							</div>
							<!-- /footer -->
						</router-link>
					</div>
				</div>

				<section class="section">
					<h3 class="headline headline--main">
						Temel İstasyon bilgileri
					</h3>
					<div align="center">
						<p>
							Buradan temel istasyon bilgilerini (fiyatlar,
							tesisler, adres vs.) güncelleyebilirsiniz.
						</p>

						<fs-button
							v-if="isVerifiedByFuelSpot"
							color="blue-grey"
							borderless
							:to="{
								name: 'UpdateStation',
								params: { superStationID: superStationID },
							}"
						>
							Güncelle
						</fs-button>
						<fs-button v-else color="blue-grey" borderless>
							Hesabınız onay sürecindedir. Sizinle en kısa sürede
							iletişime geçeceğiz.
						</fs-button>
					</div>
				</section>

				<section class="section">
					<h3 class="headline headline--main">
						Yorumlar
					</h3>
					<div align="center">
						<p>
							İstasyonunuz için yapılan değerlendirmeleri
							cevaplayabilirsiniz.
						</p>
						<fs-button
							v-if="isVerifiedByFuelSpot"
							color="blue-grey"
							borderless
							@click.native="openReviewsModal"
						>
							Yorumları görüntüle
						</fs-button>
						<fs-button v-else color="blue-grey" borderless>
							Hesabınız onay sürecindedir. Sizinle en kısa sürede
							iletişime geçeceğiz.
						</fs-button>
					</div>
				</section>

				<section class="section">
					<h3 class="headline headline--main">
						Kampanyalar
					</h3>
					<div align="center">
						<p>
							İstasyonunuz için kampanya
							ekleyip/güncelleyip/silebilir, firmanız tarafından
							eklenen kampanyaları görüntüleyebilirsiniz.
						</p>
						<fs-button
							v-if="isVerifiedByFuelSpot"
							color="blue-grey"
							borderless
							@click.native="openCampsModal"
						>
							Kampanyaları görüntüle
						</fs-button>
						<fs-button v-else color="blue-grey" borderless>
							Hesabınız onay sürecindedir. Sizinle en kısa sürede
							iletişime geçeceğiz.
						</fs-button>
					</div>
				</section>
			</div>
		</div>
		<!-- stationReviews Modal -->
		<modal name="stationReviews" @before-close="beforeClose()">
			<station-reviews :station-i-d="$route.params.id">
				<template slot="answerForm">
					<!--	<StationReviewForm
                            @submit="newComment"
                            v-if="userNewCommentStatus"
                        /> -->
				</template>
			</station-reviews>
		</modal>
		<!-- /stationReviews Modal -->

		<!-- Campaigns Modal -->
		<modal name="campaigns" @before-close="beforeClose()">
			<campaigns :station-i-d="superStationID" />
		</modal>
		<!-- /Campaigns Modal -->
	</div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    const StationReviews = () => import("@/components/StationReviews");
const StationFacilities = () => import("@/components/user/StationFacilities");
const Campaigns = () => import("@/components/Campaigns");

export default {
	name: "MyStation",

	data() {
		return {
			window_open: false,
			window_pos: null,
			loaded: false,
			myStation: [],
			isVerifiedByFuelSpot: false,
		};
	},

	computed: {
		...mapState("station", ["station", "reviews"]),
		...mapState("superUser", ["superUser", "superUserStations"]),
		superStationID() {
			return this.$route.params.superStationID;
		},
		facilities() {
			return this.station.facilities;
		},
	},

	components: {
		StationReviews,
		StationFacilities,
		Campaigns,
	},

	methods: {
		...mapActions("station", ["fetchReviews", "currentStation"]),
		...mapActions("campaigns", ["fetchCampaigns"]),
		...mapActions({
			fetchSuperUserStations: "superUser/fetchSuperUserStations",
		}),

		openReviewsModal() {
			this.$snotify.error("Çok yakında!", {
				timeout: 1000,
				showProgressBar: false,
			});

			//this.$modal.show("stationReviews");
			//document.querySelector("body").style.overflow = "hidden";
		},

		openCampsModal() {
			this.$snotify.error("Çok yakında!", {
				timeout: 1000,
				showProgressBar: false,
			});

			//this.$modal.show("campaigns");
			//document.querySelector("body").style.overflow = "hidden";
		},

		beforeClose() {
			document.querySelector("body").removeAttribute("style");
		},
	},

	async created() {
		await this.fetchSuperUserStations();

		let superIDs = [];
		for (let i = 0; i < this.superUserStations.length; i++) {
			superIDs[i] = this.superUserStations[i].id;
		}

		if (superIDs.includes(this.superStationID)) {
			localStorage.setItem("selectedStation", this.superStationID);
			await this.currentStation(this.superStationID)
				.then(() => {
					this.myStation = this.station;

					this.isVerifiedByFuelSpot =
						Number(this.station.isVerified) === 1;

					this.loaded = true;
				})
				.catch(() => {
					this.$snotify.error("Hata!", "Bir Hata Oluştu!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		} else {
			this.$snotify.error(
				"Bu sayfayı görmeye yetkiniz yok.",
				"Bir Hata Oluştu!",
				{
					timeout: 3000,
					showProgressBar: false,
				},
			);
		}
	},
};
</script>

<style lang="scss" scoped>
.section {
	padding: 1rem 0;
}
</style>

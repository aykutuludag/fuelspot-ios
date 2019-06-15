<template>
	<div class="station-page" v-if="loadStatus">
		<div class="main-wrapper">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<div class="card shadow-sm p-2 p-md-4">
							<img
								class="station__logo"
								:src="
									station.logoURL ||
										'https://fuelspot.com.tr/default_icons/station.png'
								"
								:alt="station.name"
							/>
							<!-- card-header -->
							<div class="card__header">
								<h1 class="station__name">
									{{ station.name }}
									<span class="station__id">
										({{ station.id }})
									</span>
								</h1>
								<p class="station__vicinity text-truncate">
									{{ station.vicinity }}
								</p>
								<div class="mb-3">
									<div
										class="d-flex flex-row align-items-center mb-1"
										v-if="this.reviews.length"
									>
										<star-rating
											class="d-flex flex-row"
											read-only
											:rating="Number(stars)"
											:show-rating="false"
											:star-size="18"
											:increment="0.1"
											:fixed-points="1"
											:round-start-rating="false"
										>
											{{ stars }}
										</star-rating>
										<span
											class="review__stars mt-1 ml-1 fg-grey"
										>
											({{ stars.toFixed(1) }})
										</span>
									</div>
									<span class="font-italic fg-orange" v-else>
										Henüz puan verilmemiş.
									</span>
								</div>
								<!-- Campaigns Modal -->
								<modal
									name="campaigns"
									@before-close="beforeClose()"
								>
									<campaigns :station-i-d="station.id" />
								</modal>
								<!-- /Campaigns Modal -->
								<div
									class="p-absolute top-0 right-0 mt-2 mr-2 mt-md-4 mr-md-4"
								>
									<div class="d-flex flex-column flex-md-row">
										<a
											href="#"
											class="fg-green mb-3 mb-md-0"
											@click.prevent="
												openModal('campaigns')
											"
										>
											<i class="far fa-gift mr-md-2"></i>
											<span class="hide-under-md">
												Kampanyalar
											</span>
										</a>
										<a
											:href="
												'https://www.google.com/maps/dir/?api=1&origin' +
													this.center.lat +
													',' +
													this.center.lng +
													'&destination=' +
													splitLocation() +
													'&travelmode=driving '
											"
											target="_blank"
											rel="noopener noreferrer"
											class="fg-blue mb-3 mb-md-0"
										>
											<i
												class="far fa-directions mr-md-2"
											></i>
											<span class="hide-under-md">
												Yol tarifi
											</span>
										</a>
										<a
											href="#"
											class="fg-red mb-3 mb-md-0"
											@click.prevent="openReport('price')"
										>
											<i class="far fa-coins mr-md-2"></i>
											<span class="hide-under-md">
												Fiyat Bildir
											</span>
										</a>
										<a
											href="#"
											class="fg-red mb-3 mb-md-0"
											@click.prevent="
												openReport('report')
											"
										>
											<i
												class="far fa-exclamation-circle mr-md-2"
											></i>
											<span class="hide-under-md">
												İstasyon Bildir
											</span>
										</a>
									</div>
								</div>
							</div>
							<!-- /card-header -->

							<!-- Report Modal -->
							<modal
								name="reportModal"
								@before-close="beforeClose()"
							>
								<div class="v--modal__inner py-4 px-3">
									<report-form
										:type="reportType"
										@reportCompleted="
											closeModal('reportModal')
										"
									/>
								</div>
							</modal>
							<!-- Report Modal -->

							<!-- card-body -->
							<div class="card__body">
								<div class="station__facilities">
									<h3
										class="heading heading--facilities d-inline-block"
									>
										Hizmetler
									</h3>
									<station-facilities
										:facilities="station.facilities"
									></station-facilities>
								</div>
								<div class="station__prices">
									<h3 class="heading heading--prices">
										Fiyatlar
									</h3>
									<station-prices
										:station="station"
									></station-prices>
								</div>
								<!-- Station Reviews -->
								<div class="station__reviews">
									<h3 class="heading heading--reviews">
										Yorumlar
									</h3>
									<StationReviews
										:station-i-d="$route.params.id"
									>
										<template slot="commentForm" v-if="!superUserLoggedIn">
											<StationReviewForm
												@submit="newComment"
												v-if="userNewCommentStatus"
											/>
										</template>
									</StationReviews>
								</div>
								<div class="station__priceHistory">
									<h3 class="heading heading--price-history">
										Fiyat geçmişi
									</h3>
									<GChart
										type="LineChart"
										:data="chartDataPriceHistory"
										:options="chartOptions"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import {GChart} from "vue-google-charts";
    import {mapActions, mapGetters, mapState} from "vuex";

    const StarRating = () => import("vue-star-rating");
const Campaigns = () => import("@/components/Campaigns");
const StationFacilities = () => import("@/components/user/StationFacilities");
const StationPrices = () => import("@/components/user/StationPrices");
const StationReviews = () => import("@/components/StationReviews");
const ReportForm = () => import("@/components/user/ReportForm");
const StationReviewForm = () => import("@/components/user/StationReviewForm");

export default {
	name: "SingleStation",

	data() {
		return {
			loadStatus: false,
			panorama: null,
			chartOptions: {
				width: "100%",
				lineWidth: 4,
				height: 450,
				legend: { position: "bottom" },
				series: {
					0: { color: "#000000" },
					1: { color: "#ff0000" },
					2: { color: "#0000FF" },
					3: { color: "#008000" },
				},
				chartArea: {
					left: 25,
					right: 25,
					bottom: 75,
					top: 25,
					width: "100%",
					height: "100%",
				},
			},
			reportType: "report",
			center: { lat: 39.92562, lng: 32.83805 },
            superUserLoggedIn: localStorage.getItem("superUser") != null,
		};
	},

	metaInfo() {
		const stationName = this.station.name;
		const stationId = this.station.id;
		return {
			title: `${stationName} (${stationId})`,
		};
	},

	components: {
		StarRating,
		Campaigns,
		StationFacilities,
		StationPrices,
		StationReviews,
		GChart,
		ReportForm,
		StationReviewForm,
	}, // COMPONENTS

	computed: {
		...mapState("station", ["station", "reviews", "priceHistory"]),

		...mapState("user", ["user"]),

		...mapGetters({
			stars: "station/stars",
			chartDataPriceHistory: "station/chartDataPriceHistory",
		}),

		userNewCommentStatus() {
			return !this.reviews.find((r) => r.username === this.user.username);
		},
	}, // COMPUTED

	methods: {
		...mapActions("station", [
			"currentStation",
			"fetchReviews",
			"fetchStationPriceHistory",
			"addComment",
		]),

		openReport(type) {
			this.reportType = type;
			this.openModal("reportModal");
		},

		openModal(modalName) {
			this.$modal.show(modalName);
			document.querySelector("body").style.overflow = "hidden";
		},

		closeModal(modalName) {
			this.$modal.hide(modalName);
		},

		beforeClose() {
			document.querySelector("body").removeAttribute("style");
		},

		splitLocation() {
			return this.station.location.split(";").join(",");
		},

		newComment({ comment, rating }) {
			const payload = {
				comment: comment,
				stars: rating,
				username: this.user.username,
				user_photo: this.user.photo,
				stationID: this.station.id,
			};

			this.addComment(payload)
				.then(() => {
					this.$snotify.success("Yorumunuz Eklendi!", "Başarılı!", {
						timeout: 3000,
						showProgressBar: false,
					});
				})
				.catch((error) => {
					this.$snotify.error("Bir Hata Oluştu", "Hata!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		},

		geolocate: function() {
			navigator.geolocation.getCurrentPosition((position) => {
				this.center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
			});
		},
	}, // METHODS

	async created() {
		await this.currentStation(this.$route.params.id);
		await this.fetchReviews(this.$route.params.id);
		await this.fetchStationPriceHistory(this.$route.params.id);

		this.loadStatus = true;
	}, // CREATED

	mounted() {
		this.geolocate();
	},
};
</script>

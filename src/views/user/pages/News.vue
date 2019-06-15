<template>
	<section class="news">
		<div class="main-wrapper">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<h1 class="headline headline--main">
							Haberler
						</h1>
					</div>
					<div class="col-12">
						<NewsCard></NewsCard>
					</div>

					<div class="col-12 my-5"></div>

					<div class="col-12">
						<h1 class="headline headline--main">
							İstatistikler
						</h1>
						<h4 class="headline headline--sub">
							FuelSpot Akaryakıt Endeksi
						</h4>
						<GChart
							type="LineChart"
							:data="chardDataPriceHistory"
							:options="chartPriceHistoryOptions"
						/>
						<h4 class="headline headline--sub">
							Akaryakıt dağıtım firmaları
						</h4>
						<GChart
							type="PieChart"
							:data="chartDataCompanies"
							:options="chardCompaniesOptions"
						/>
						<p class="fg-blue-grey fw-500">
							Kayıtlı istasyon sayısı:
							<span class="fw-400 fg-blue-grey-darken-4">
								{{ Number(totalNumOfStation) }}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
const NewsCard = () => import("@/components/user/NewsCard");

import {mapActions, mapGetters} from "vuex";
import {GChart} from "vue-google-charts";

export default {
	name: "News",

	data() {
		return {
			chartData2: [["Tarih", "Benzin", "Dizel", "LPG", "Elektrik"]],
			chardCompaniesOptions: {
				pieSliceText: "label",
				width: "auto",
				height: 450,
				is3D: true,
				legend: { position: "bottom" },
                chartArea: {
                    left: 25,
                    right: 25,
                    bottom: 75,
                    top: 25,
                    width: "100%",
                    height: "100%",
                },
			},
			chartPriceHistoryOptions: {
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
		};
	},

	metaInfo: {
		title: "Haberler",
	},

	computed: {
		...mapGetters({
			priceHistory: "news/priceHistory",
			chartDataCompanies: "news/chartDataCompanies",
			chardDataPriceHistory: "news/chardDataPriceHistory",
			companies: "news/companies",
			totalNumOfStation: "news/totalNumOfStation",
		}),
	},

	components: {
		NewsCard,
		GChart,
	},

	methods: {
		...mapActions({
			fetchNews: "news/fetchNews",
			fetchCompanies: "news/fetchCompanies",
			fetchPriceHistory: "news/fetchPriceHistory",
		}),
	},

	created() {
		this.fetchNews();
		this.fetchCompanies();
		this.fetchPriceHistory();
	},
};
</script>

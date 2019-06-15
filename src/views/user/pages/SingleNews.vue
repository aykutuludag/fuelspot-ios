<template>
	<div class="news--single">
		<div class="main-wrapper">
			<div class="container">
				<div class="row">
					<div class="col-12 col-md-10 offset-0 offset-md-1">
						<img
							:src="newsDetail.photo"
							width="100%"
							height="240px"
							class="news--single__image shadow-sm mb-3 br-4px"
						/>
					</div>

					<div class="col-12 col-md-8 offset-0 offset-md-2">
						<div
							class="p-relative mb-1 d-flex flex-row align-items-center"
						>
							<a
								class="p-absolute fg-red hide-under-md fa-2x"
								style="left: -45px;"
								@click="$router.go(-1)"
							>
								<i class="fas fa-long-arrow-left"></i>
							</a>
							<h1 class="news--single__heading m-0">
								{{ newsDetail.title }}
							</h1>
						</div>
						<p class="news--single__date fg-blue-grey fw-600">
							{{ newsDetail.releaseDate | moment("D MMMM YYYY") }}
						</p>
						<p class="news--single__content mb-5" v-html="newsDetail.content">
							{{ newsDetail.content }}
						</p>

						<div style="font-size: 0.875rem">
							<p class="mb-1">
								<b>Ülke:</b>
								{{ newsDetail.country }}
							</p>
							<p class="mb-1">
								<b>Etiketler:</b>
								{{ newsDetail.tags }}
							</p>
							<p class="mb-1 text-truncate">
								<b>Kaynak:</b>
								<a
									class="fg-red"
									:href="newsDetail.sourceURL"
									target="_blank"
									rel="noopener noreferrer"
								>
									{{ newsDetail.sourceURL }}
								</a>
							</p>
						</div>

						<hr />

						<div class="news--single__share">
							<i class="fas fa-share-alt fg-red"></i>
							<b class="fg-blue-grey-darken-3">Paylaş</b>
							<social-sharing
								:url="
									`https://fuelspot.com.tr/news/${
										this.$route.params.slug
									}`
								"
								:title="newsDetail.title"
								description=""
								quote="FuelSpot - Dijital Benzinlik"
								:hashtags="newsDetail.tags"
								twitter-user="FuelSpotapp"
								network-tag="a"
								inline-template
							>
								<div class="social-sharing">
									<network network="facebook">
										<i class="fab fa-facebook"></i>
										&nbsp;Facebook
									</network>
									<network network="twitter">
										<i class="fab fa-twitter"></i>
										&nbsp;Twitter
									</network>
									<network network="linkedin">
										<i class="fab fa-linkedin"></i>
										&nbsp;LinkedIn
									</network>
									<network network="telegram">
										<i class="fab fa-telegram-plane"></i>
										&nbsp;Telegram
									</network>
									<network network="whatsapp">
										<i class="fab fa-whatsapp"></i>
										&nbsp;WhatsApp
									</network>
								</div>
							</social-sharing>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
	name: "SingleNews",

	data() {
		return {
			newsDetail: {},
		};
	},

	metaInfo() {
		const newsTitle = this.newsDetail.title;
		return {
			title: `${newsTitle}`,
		};
	},

	components: {},

	props: {
		slug: {
			type: String,
			default: null,
		},
	},

	created() {
		this.fetchSingleNews(
			"https://fuelspot.com.tr/news/" +
				this.$route.params.slug.toString(),
		).then((newsDetail) => (this.newsDetail = newsDetail[0]));
	},

	methods: {
		...mapActions(["fetchSingleNews"]),
	},
};
</script>

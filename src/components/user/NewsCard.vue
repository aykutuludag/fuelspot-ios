<template>
	<div class="d-flex flex-row flex-wrap p-relative">
		<div class="card card--news" v-for="haber in news" :key="haber.id">
			<img
				class="card--news__image"
				:src="haber.photo"
				width="100%"
				height="200px"
			/>
			<div class="p-3">
				<h1 class="card--news__title text-truncate">{{ haber.title }}</h1>
				<p class="fg-blue-grey fw-500 card--news__date">{{ haber.releaseDate | moment("from", "now") }}</p>
			</div>
			<fs-button
				class="p-absolute bottom-0 left-0"
				borderless
				block
				:to="{
					name: 'SingleNews',
					params: {
						slug: haber.url.replace(
							'https://fuelspot.com.tr/news/',
							'',
						),
					},
				}"
			>Devamını oku</fs-button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "NewsCard",
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			news: "news/news",
		}),
	},
};
</script>

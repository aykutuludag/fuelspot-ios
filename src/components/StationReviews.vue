<template>
	<div>
		<div v-if="reviews.length">
			<div
				class="reviewer__wrapper"
				v-for="(review, index) in reviews"
				:key="index"
			>
				<single-review :review="review" />
			</div>
		</div>
		<span class="font-italic fg-blue-grey" v-else>
			Henüz yorum yapılmamış.
		</span>
		<hr style="width: 540px; margin-left: 0;" />
		<slot name="commentForm" />
	</div>
</template>

<script>
const SingleReview = () => import("./SingleReview");

import {mapActions, mapState} from "vuex";

export default {
	name: "StationReviews",

	props: {
		stationID: {
			type: [Number, String],
		},
	},

	computed: {
		...mapState("station", ["station", "reviews"]),
	},

	components: {
		SingleReview,
	},

	methods: {
		...mapActions("station", ["fetchReviews"]),
	},

	async created() {
		await this.fetchReviews(this.stationID);
	},
};
</script>

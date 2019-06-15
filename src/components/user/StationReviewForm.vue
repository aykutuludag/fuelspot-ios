<template>
	<div>
		<form
			class="form"
			data-vv-scope="commentForm"
			@submit.prevent="submit"
		>

			<label class="form__label">Yorum yazın</label>

			<div class="wrapper wrapper--valiadation mb-2">
				<textarea
					class="form-control"
					style="max-width: 540px;"
					data-vv-scope="commentForm"
					rows="4"
					name="comment"
					v-validate="'required|min:15'"
					v-model="comment.comment"
				></textarea>

				<span
					class="validate validate--error"
					v-if="errors.has('commentForm.comment')"
				>{{ errors.first('commentForm.comment') }}</span>
			</div>

			<div class="wrapper wrapper--validation mb-2">
				<star-rating
					data-vv-scope="commentForm"
					name="rating"
					:show-rating="false"
					:star-size="24"
					v-model="comment.rating"
					v-validate="'required|min_value:1'"
				></star-rating>

				<span
					class="validate validate--error"
					v-if="errors.has('commentForm.rating')"
				>{{ errors.first('commentForm.rating') }}</span>
			</div>

			<fs-button
				class="mt-4"
				color="green"
			>
				<i class="far fa-save mr-2" style="font-size: 17px"></i>
				<span>Kaydet</span>
			</fs-button>
		</form>
	</div>
</template>

<script>
const StarRating = () => import("vue-star-rating");

export default {
	name: "StationReviews",

	data() {
		return {
			comment: {
				comment: "",
				rating: 0,
			},
		};
	},

	props: {
		data: {
			type: Object,
			required: false,
		},
	},

	computed: {
		editStatus() {
			return this.data !== undefined;
		},
	},

	components: {
		StarRating,
	},

	methods: {
		async submit() {
			const validationResult = await this.$validator.validateAll(
				"commentForm",
			);

			if (!validationResult) {
				return false;
			}

			this.$emit("submit", this.comment);

			this.comment = {
				comment: "",
				rating: 0,
			};

			this.$validator.reset("commentForm");
		},
	},

	created() {
		if (this.editStatus) {
			this.comment = JSON.parse(JSON.stringify(this.data));
		}
	},
};
</script>

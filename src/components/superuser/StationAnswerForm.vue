<template>
	<div>
		<form
			class="form"
			data-vv-scope="answerForm"
			@submit.prevent="submit"
		>

			<label class="form__label">Cevap yazın</label>

			<div class="wrapper wrapper--valiadation mb-2">
				<textarea
					class="form-control"
					style="max-width: 540px;"
					data-vv-scope="answerForm"
					rows="4"
					name="answer"
					v-validate="'required|min:15'"
					v-model="answer"
				></textarea>

				<span
					class="validate validate--error"
					v-if="errors.has('answerForm.answer')"
				>{{ errors.first('answerForm.answer') }}</span>
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

export default {
	name: "StationReviews",

	data() {
		return {
			answer: ''
		};
	},

	props: {
		data: {
			type: String,
			default: ''
		},
	},

	methods: {
		async submit() {
			const validationResult = await this.$validator.validateAll(
				"answerForm",
			);

			if (!validationResult) {
				return false;
			}

			this.$emit("submit", this.answer);

			this.answer = '';

			this.$validator.reset("answerForm");
		},
	},

	created() {
		this.answer = JSON.parse(JSON.stringify(this.data));
	},
};
</script>

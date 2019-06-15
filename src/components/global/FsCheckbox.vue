<template>
	<div class="checkbox">
		<input
			type="checkbox"
			class="checkbox__input"
			:id="id"
			:name="name"
			:value="dataValue"
			@change="updateInput"
			:checked="checkedStatus"
		>
		<label :for="id" class="checkbox__label">
			<span class="checkbox__box"></span>
			<span class="checkbox__slot">{{ label }}</span>
		</label>
	</div>
</template>

<script>
export default {
	name: "FsCheckbox",

	data() {
		return {};
	},

	props: {
		id: {
			type: String,
			default: Math.random()
				.toString(36)
				.replace("0.", "")
				.substring(0, 10)
				.toUpperCase(),
		},

		name: {
			type: String,
			default: Math.random()
				.toString(36)
				.replace("0.", "")
				.substring(0, 10)
				.toUpperCase(),
		},

		value: {
			type: [String, Boolean, Array],
			required: true,
		},

		dataValue: {},

		label: {
			type: [String, Number],
			required: true,
		},
	},

	computed: {
		checkedStatus() {
			if (this.checkboxIsMultiple) {
				return this.value.includes(this.dataValue);
			} else {
				return this.value;
			}
		},

		checkboxIsMultiple() {
			return typeof this.value !== "boolean";
		},
	},

	methods: {
		updateInput(event) {
			if (this.checkboxIsMultiple) {
				let tempVal = JSON.parse(JSON.stringify(this.value));

				if (tempVal.includes(this.dataValue)) {
					tempVal.splice(tempVal.indexOf(this.dataValue), 1);
				} else {
					tempVal.push(this.dataValue);
				}

				this.$emit("input", tempVal);
			} else {
				this.$emit("input", !this.value);
			}
		},
	},
};
</script>

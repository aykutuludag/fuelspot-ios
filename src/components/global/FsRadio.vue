<template>
	<div
		class="radio"
		:class="[ color.length ? `radio-${color}` : '' ]"
	>
		<input
			class="radio__input"
			type="radio"
			:name="name"
			:id="id"
			:value="data"
			:checked="checkedStatus"
			:disabled="disabled"
			:aria-label="label"
			@change="updateInput"
		/>
		<label class="radio__label" :for="id">
			<span class="radio__circle"></span>
			<span class="radio__label__text">
				{{ label }}
			</span>
		</label>
	</div>
</template>

<script>
export default {
	name: "FsRadio",
	props: {
		color: {
			type: String,
			default: "",
			required: false
		},
		name: {
			type: String,
			default: null,
			required: false
		},
		data: {
			required: true
		},
		value: {
			required: true
		},
		id: {
			type: String,
			default: null,
			required: true
		},
		checked: {
			type: Boolean,
			default: false,
			required: false
		},
		disabled: {
			type: Boolean,
			default: false,
			required: false
		},
		label: {
			type: String,
			default: null,
			required: true
		}
	},
	data() {
		return {};
	},
	computed: {
		checkedStatus(){
			return this.value === this.id;
		}
	},
	methods: {
		updateInput(event) {
			this.$emit("input", event.target.value);
		}
	}
};
</script>

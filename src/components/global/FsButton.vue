<template>
	<component
		class="btn"
		:is="tag"
		:class="[
			{
				'shadow-sm': shadow,
				'btn-block': block,
				'borderless': borderless,
			},
			color ? `btn-${color}` : null
		]"
		:style="{
			'width': width,
		}"
		:href="href"
		:target="target"
		:rel="[
			noopener ? 'noopener noreferrer': rel
		]"
		:type="type"
		:value="value"
		:disabled="disabled"
		v-if="!routerRedirectStatus"
	>
		<span class="focus-content" tabindex="-1">
			<slot></slot>
		</span>
	</component>

	<router-link
		tag="a"
		class="btn"
		:class="[
			{
				'shadow-sm': shadow,
				'btn-block': block,
				'borderless': borderless,
			},
			color ? `btn-${color}` : null
		]"
		:style="{
			'width': width
		}"
		:to="to"
		v-else
	>
		<span class="focus-content" tabindex="-1">
			<slot></slot>
		</span>
	</router-link>
</template>

<script>
	export default {
		name: "FsButton",

		data() {
			return {};
		},

		props: {
			color: {
				type: String,
				required: false,
				default: null,
			},
			width: {
				type: String,
				required: false,
				default: null,
			},
			shadow: {
				type: Boolean,
				required: false,
				default: false,
			},
			block: {
				type: Boolean,
				required: false,
				default: false,
			},
			borderless: {
				type: Boolean,
				required: false,
				default: false,
			},
			type: {
				type: String,
				required: false,
				default: null,
			},
			value: {
				type: String,
				required: false,
				default: null,
			},
			disabled: {
				type: Boolean,
				required: false,
				default: false,
			},
			href: {
				type: String,
				required: false,
				default: null,
			},
			target: {
				type: String,
				required: false,
				default: null,
			},
			rel: {
				type: String,
				required: false,
				default: "",
			},
			noopener: {
				type: Boolean,
				required: false,
				default: null,
			},
			to: {
				type: [String, Object],
				default: null,
			},
			tag: {
				type: String,
				required: false,
				default: "button",
			},
		},

		computed: {
			routerRedirectStatus() {
				return this.to !== null;
			},
		},
	};

</script>

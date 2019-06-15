<template>
	<div class="four-o-four d-flex flex-column align-items-center justify-content-center">
		<h1>FuelSpot</h1>
		<h2 class="font-numeric">404</h2>
		<p>Sayfa bulunamadı</p>
		<div
			class="d-flex flex-row align-items-center justify-content-between"
		>
			<fs-button
				color="orange"
				shadow
				@click.native="$router.go(-1)"
			>
				<i
					class="fas fa-arrow-circle-left mr-2 fs-12"
				></i>
				<span>Geri dön</span>
			</fs-button>
			<fs-button
				class="ml-2"
				color="orange"
				shadow
				to="/"
			>
				<i
					class="fas fa-home mr-2 fs-12"
				></i>
				<span>Anasayfa</span>
			</fs-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "NotFound",

	metaInfo: {
		title: 'Aradığınız sayfa bulunamadı'
	},
};
</script>

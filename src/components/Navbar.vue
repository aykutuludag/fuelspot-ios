<template>
	<div class="shadow navbar">
		<div class="container">
			<p class="m-0">
				<router-link
					v-if="superUserLoggedIn"
					class="navbar__brand"
					:to="{
						name: 'MyStation',
						params: {
							superStationID: getSelectedStation(),
						},
					}"
				>
					FuelSpot
				</router-link>
				<router-link v-else class="navbar__brand" to="/">
					FuelSpot
				</router-link>
			</p>
			<div class="navbar__nav">
				<router-link
					class="navbar__nav__link"
					v-if="superUserLoggedIn"
					:to="{
						name: 'MyStation',
						params: {
							superStationID: getSelectedStation(),
						},
					}"
				>
					<i class="fal fa-badge-check fa-lg"></i>
				</router-link>
				<router-link
					class="navbar__nav__link"
					:to="{ name: 'Stations' }"
				>
					<i class="fal fa-gas-pump fa-lg"></i>
				</router-link>
				<router-link class="navbar__nav__link" :to="{ name: 'News' }">
					<i class="fal fa-rss fa-lg"></i>
				</router-link>
				<router-link
					v-if="userLoggedIn"
					class="navbar__nav__link"
					:to="{ name: 'Profile' }"
				>
					<i class="fal fa-user-cog fa-lg"></i>
				</router-link>
				<router-link
					v-if="superUserLoggedIn"
					class="navbar__nav__link"
					:to="{ name: 'SuperUserProfile' }"
				>
					<i class="fal fa-user-cog fa-lg"></i>
				</router-link>
				<router-link
					class="navbar__nav__link"
					:to="{ name: 'Settings' }"
				>
					<i class="fal fa-info-circle fa-lg"></i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
	name: "Navbar",
	data() {
		return {
			userLoggedIn: localStorage.getItem("user") != null,
			superUserLoggedIn: localStorage.getItem("superUser") != null,
		};
	},
	computed: {
		...mapState("superUser", ["superUser", "superUserStations"]),
	},

	methods: {
		...mapActions({
			fetchSuperUserStations: "superUser/fetchSuperUserStations",
		}),
		logout() {
			localStorage.removeItem("superUser");
			this.$router.push({
				name: "Login",
			});
		},
		getSelectedStation() {
			return localStorage.getItem("selectedStation");
		},
	},

	async created() {
		if (this.superUserLoggedIn) {
			this.getSelectedStation();
			await this.fetchSuperUserStations();
		}
	},
};
</script>

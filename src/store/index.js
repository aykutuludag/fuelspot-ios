import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import StationStore from "./modules/Stations.js";
import UserStore from "./modules/User.js";
import SuperUserStore from "./modules/SuperUser.js";
import NewsStore from "./modules/News.js";
import CampaignStore from "./modules/Campaigns.js";

Vue.use(Vuex);

// API Configuration
let token = "";
if (localStorage.getItem("user") != null) {
	token = JSON.parse(localStorage.getItem("user")).token;
}
if (localStorage.getItem("superUser") != null) {
	token = JSON.parse(localStorage.getItem("superUser")).token;
}
const reqConfig = {
	headers: {
		Authorization: "Bearer " + token,
	},
};
export default new Vuex.Store({
	state: {},

	getters: {},

	mutations: {},

	actions: {
		//eslint-disable-next-line
		async fetchSingleNews({}, url) {
			return await axios
				.get(
					`${process.env.VUE_APP_API_URL}other/news-single.php?url=${url}`,
					reqConfig,
				)
				.then((response) => response.data);
		},

		async fetchTaxRates() {
			return await axios
				.get(
					`${process.env.VUE_APP_API_URL}other/tax.php?country=TR`,
					reqConfig,
				)
				.then((response) => response.data);
		},

		//eslint-disable-next-line
		async fetchUserReviews({}, username) {
			return await axios
				.get(
					`${
						process.env.VUE_APP_API_URL
					}comment/fetch.php?username=${username}`,
					reqConfig,
				)
				.then((response) => response.data);
		},
	},

	modules: {
		station: StationStore,
		user: UserStore,
		superUser: SuperUserStore,
		news: NewsStore,
		campaigns: CampaignStore,
	},
});

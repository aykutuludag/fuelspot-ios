import axios from "axios";
import moment from "moment";

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

export default {
	namespaced: true,

	state: {
		news: [],

		companies: [],

		priceHistory: [],
	}, // STATE

	getters: {
		news: (state) => state.news,

		companies: (state) => state.companies,

		priceHistory: (state) => state.priceHistory,

		chartDataCompanies(state) {
			let result = [["Firmalar", "İstasyon sayıları"]];
			let otherCount = 0;

			state.companies.filter((c) => {
				if (c.numOfStations < 300) {
					otherCount += Number(c.numOfStations);
				} else {
					result.push([c.companyName, Number(c.numOfStations)]);
				}
			});

			if (otherCount > 0) {
				result.push(["Diğer", otherCount]);
			}

			return result;
		},

		totalNumOfStation: (state) =>
			state.companies.reduce((val, company) => {
				return (val += Number(company.numOfStations));
			}, 0),

		chardDataPriceHistory(state) {
			let result = [["Tarih", "Benzin", "Dizel", "LPG", "Elektrik"]];
			let day;

			state.priceHistory.reverse().filter((p) => {
				day = [
					moment(p.date).format("DD MMM HH:mm"),
					Number(p.gasolinePrice) !== 0
						? Number(p.gasolinePrice)
						: null,
					Number(p.dieselPrice) !== 0 ? Number(p.dieselPrice) : null,
					Number(p.lpgPrice) !== 0 ? Number(p.lpgPrice) : null,
					Number(p.electricityPrice),
				];

				result.push(day);
			});

			return result;
		},
	}, // GETTERS

	mutations: {
		SET_NEWS(state, news) {
			state.news = news;
		},

		SET_PRICE_HISTORY(state, priceHistory) {
			state.priceHistory = priceHistory;
		},

		SET_COMPANIES(state, companies) {
			state.companies = companies;
		},
	}, // MUTATIONS

	actions: {
		//eslint-disable-next-line
		async fetchNews({ commit }) {
			return await axios
				.get(
					`${process.env.VUE_APP_API_URL}other/news.php?country=TR`,
					reqConfig,
				)
				.then((response) => {
					commit("SET_NEWS", response.data);
				});
		},

		async fetchPriceHistory({ commit }) {
			return await axios
				.get(
					`${
						process.env.VUE_APP_API_URL
					}finance/fetch-prices.php?country=TR`,
					reqConfig,
				)
				.then((response) => {
					commit("SET_PRICE_HISTORY", response.data);
				});
		},

		async fetchCompanies({ commit }) {
			return await axios
				.get(
					`${process.env.VUE_APP_API_URL}other/company.php`,
					reqConfig,
				)
				.then((response) => {
					// log success, config, res here
					commit("SET_COMPANIES", response.data);
				});
		},
	}, // ACTIONS
};

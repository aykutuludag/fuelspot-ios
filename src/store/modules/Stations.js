import axios from "axios";
import * as defines from "../defines.js";
import moment from "moment";

const activeRad = "2500";

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
		stations: [],

		station: JSON.parse(JSON.stringify(defines.STATION)),

		location: {},

		priceHistory: [],

		reviews: [],

		campaigns: [],

		sortStation: "distance",

		stationsFacilitiesFilter: [],
	}, // STATE

	getters: {
		stars(state) {
			let total = state.reviews.reduce(function(sum, val) {
				return sum + Number(val.stars);
			}, 0);

			return total / state.reviews.length;
		},

		chartDataPriceHistory(state) {
			const allPriceHistory = state.priceHistory.map((ph) => [
				moment(ph.date).format("DD MMM HH:mm"),
				Number(ph.gasolinePrice),
				Number(ph.dieselPrice),
				Number(ph.lpgPrice),
				Number(ph.electricityPrice),
			]);

			allPriceHistory.reverse();
			allPriceHistory.unshift([
				"Tarih",
				"Benzin",
				"Dizel",
				"LPG",
				"Elektrik",
			]);

			return allPriceHistory;
		},

		filterStationsByFacilities(state) {
			if (state.stationsFacilitiesFilter.length === 0) {
				return state.stations;
			}

			let stationFacilities = [];

			return state.stations.filter((s) => {
				stationFacilities = JSON.parse(s.facilities)[0];

				return state.stationsFacilitiesFilter.every(
					(f) => Number(stationFacilities[f]) === 1,
				);
			});
		},

		sortedStations(state, getters) {
			switch (state.sortStation) {
				case "distance":
					return getters.filterStationsByFacilities.sort((a, b) =>
						Number(a.distance) > Number(b.distance) ? 1 : -1,
					);
					break;
				case "gasoline":
					return getters.filterStationsByFacilities.sort((a, b) => {
						if (
							Number(a.gasolinePrice) === 0 &&
							Number(b.gasolinePrice) === 0
						) {
							return 0;
						} else if (Number(a.gasolinePrice) === 0) {
							return 1;
						} else if (Number(b.gasolinePrice) === 0) {
							return -1;
						} else if (
							Number(a.gasolinePrice) === Number(b.gasolinePrice)
						) {
							return Number(a.distance) > Number(b.distance)
								? 1
								: -1;
						} else {
							return Number(a.gasolinePrice) >
								Number(b.gasolinePrice)
								? 1
								: -1;
						}
					});
					break;
				case "diesel":
					return getters.filterStationsByFacilities.sort((a, b) => {
						if (
							Number(a.dieselPrice) === 0 &&
							Number(b.dieselPrice) === 0
						) {
							return 0;
						} else if (Number(a.dieselPrice) === 0) {
							return 1;
						} else if (Number(b.dieselPrice) === 0) {
							return -1;
						} else if (
							Number(a.dieselPrice) === Number(b.dieselPrice)
						) {
							return Number(a.distance) > Number(b.distance)
								? 1
								: -1;
						} else {
							return Number(a.dieselPrice) > Number(b.dieselPrice)
								? 1
								: -1;
						}
					});
					break;
				case "lpg":
					return getters.filterStationsByFacilities.sort((a, b) => {
						if (
							Number(a.lpgPrice) === 0 &&
							Number(b.lpgPrice) === 0
						) {
							return 0;
						} else if (Number(a.lpgPrice) === 0) {
							return 1;
						} else if (Number(b.lpgPrice) === 0) {
							return -1;
						} else if (Number(a.lpgPrice) === Number(b.lpgPrice)) {
							return Number(a.distance) > Number(b.distance)
								? 1
								: -1;
						} else {
							return Number(a.lpgPrice) > Number(b.lpgPrice)
								? 1
								: -1;
						}
					});
					break;
				case "electricity":
					return getters.filterStationsByFacilities.sort((a, b) => {
						if (
							Number(a.electricityPrice) === 0 &&
							Number(b.electricityPrice) === 0
						) {
							return 0;
						} else if (Number(a.electricityPrice) === 0) {
							return 1;
						} else if (Number(b.electricityPrice) === 0) {
							return -1;
						} else if (
							Number(a.electricityPrice) ===
							Number(b.electricityPrice)
						) {
							return Number(a.distance) > Number(b.distance)
								? 1
								: -1;
						} else {
							return Number(a.electricityPrice) >
								Number(b.electricityPrice)
								? 1
								: -1;
						}
					});
					break;
			}
			return state.stations;
		},

		facilitiesCount: (state) => state.stationsFacilitiesFilter.length,
	}, // GETTERS

	mutations: {
		SET_STATIONS(state, stations) {
			state.stations = stations;
		},

		SET_STATION(state, station) {
			state.station = station;
		},

		SET_LOCATION(state, location) {
			state.location = location;
		},

		SET_CAMPAIGNS(state, campaigns) {
			state.campaigns = campaigns;
		},

		SET_PRICE_HISTORY(state, priceHistory) {
			state.priceHistory = priceHistory;
		},

		SET_REVIEWS(state, reviews) {
			state.reviews = reviews;
		},

		SET_SORT_STATION(state, sortStation) {
			state.sortStation = sortStation;
		},

		SET_STATIONS_FACILITIES_FILTER(state, stationsFacilitiesFilter) {
			state.stationsFacilitiesFilter = stationsFacilitiesFilter;
		},
	}, // MUTATIONS

	actions: {
		async fetchStations({ commit, state }) {
			const { data: response } = await axios.get(
				`${process.env.VUE_APP_API_URL}station/search.php?location=${
					state.location.latitude
				};${state.location.longitude}&radius=${activeRad}`,
				reqConfig,
			);

			if (typeof response === "object") {
				commit("SET_STATIONS", response);
			} else {
				commit("SET_STATIONS", []);
			}
		},

		fetchLocation({ dispatch, commit }) {
			function showError(error) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						alert(
							"Konum iznini reddettiniz. FuelSpot yakınınızdaki istasyonları göstermek için konum bilginize ihtiyaç duymaktadır. Konum ve GPS ayarlarını kontrol edip tekrar deneyiniz.",
						);
						break;
					case error.POSITION_UNAVAILABLE:
						alert(
							"Konum bilgisi çekilemedi. Lütfen konum ve GPS ayarlarını kontrol edip tekrar deneyiniz.",
						);
						break;
					case error.TIMEOUT:
						alert(
							"Konum izni zamanaşımına uğradı. Lütfen daha sonra tekrar deneyiniz.",
						);
						break;
					case error.UNKNOWN_ERROR:
						alert("Bilinmeyen hata.");
						break;
				}
			}

			async function showPosition(position) {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				let location = {};

				(location.latitude = lat), (location.longitude = lon);
				await commit("SET_LOCATION", location);
				//This is bug. In a first login for normal user, stations doesn't fetched because token seems to be empty. After refreshing token shows up and everything back to normal.
				if (localStorage.getItem("user") != null) {
					token = JSON.parse(localStorage.getItem("user")).token;
				}
				if (localStorage.getItem("superUser") != null) {
					token = JSON.parse(localStorage.getItem("superUser")).token;
				}
				reqConfig.headers.Authorization = "Bearer " + token;
				//This is bug. In a first login for normal user, stations doesn't fetched.
				dispatch("fetchStations");
			}

			navigator.geolocation.getCurrentPosition(showPosition, showError);
		},

		//eslint-disable-next-line
        async currentStation({commit}, stationID) {
			const { data: stations } = await axios.get(
				`${
					process.env.VUE_APP_API_URL
				}station/fetch.php?stationID=${stationID}`,
				reqConfig,
			);

			commit("SET_STATION", stations[0]);
		},

		//eslint-disable-next-line
        async fetchStationPriceHistory({commit}, stationID) {
			const { data: priceHistory } = await axios.get(
				`${
					process.env.VUE_APP_API_URL
				}finance/fetch-station-prices.php?stationID=${stationID}`,
				reqConfig,
			);

			commit("SET_PRICE_HISTORY", priceHistory);
		},

		//eslint-disable-next-line
        async fetchReviews({commit}, stationID) {
			const { data: reviews } = await axios.get(
				`${
					process.env.VUE_APP_API_URL
				}comment/fetch-station.php?stationID=${stationID}`,
				reqConfig,
			);

			if (typeof reviews !== "string") {
				commit("SET_REVIEWS", reviews);
			} else {
				commit("SET_REVIEWS", []);
			}
		},

		async addComment(
			{ commit, dispatch, state },
			{ comment, stars, username, user_photo, stationID },
		) {
			const params = await new URLSearchParams();
			params.append("stationID", stationID);
			params.append("comment", comment);
			params.append("stars", stars);
			params.append("username", username);
			params.append("user_photo", user_photo);

			try {
				const { data: result } = await axios.post(
					`${process.env.VUE_APP_API_URL}comment/add.php`,
					params,
					reqConfig,
				);

				if (result === "Fail") {
					return Promise.reject(e);
				}
			} catch (e) {
				return Promise.reject(e);
			}

			dispatch("fetchReviews", state.station.id);
		},

		async updateComment(
			{ commit, dispatch, state },
			{ comment, stars, commentID },
		) {
			const params = await new URLSearchParams();
			params.append("commentID", commentID);
			params.append("comment", comment);
			params.append("stars", stars);

			try {
				const { data: result } = await axios.post(
					`${process.env.VUE_APP_API_URL}comment/update.php`,
					params,
					reqConfig,
				);

				if (result === "Fail") {
					return Promise.reject(e);
				}
			} catch (e) {
				return Promise.reject(e);
			}

			dispatch("fetchReviews", state.station.id);
		},

		async deleteComment({ commit, dispatch, state }, commentID) {
			const params = await new URLSearchParams();
			params.append("commentID", commentID);

			try {
				const { data: result } = await axios.post(
					`${process.env.VUE_APP_API_URL}comment/delete.php`,
					params,
					reqConfig,
				);

				if (result === "Fail") {
					return Promise.reject(e);
				}
			} catch (e) {
				return Promise.reject(e);
			}

			dispatch("fetchReviews", state.station.id);
		},

		async updateAnswer(
			{ commit, dispatch, state },
			{ answer, commentID, logo },
		) {
			const params = await new URLSearchParams();
			params.append("commentID", commentID);
			params.append("answer", answer);
			params.append("logo", logo);

			try {
				const { data: result } = await axios.post(
					`${process.env.VUE_APP_API_URL}comment/answer/add.php`,
					params,
					reqConfig,
				);

				if (result === "Fail") {
					return Promise.reject(e);
				}
			} catch (e) {
				return Promise.reject(e);
			}

			dispatch("fetchReviews", state.station.id);
		},

		async deleteAnswer({ commit, dispatch, state }, commentID) {
			const params = await new URLSearchParams();
			params.append("commentID", commentID);

			try {
				const { data: result } = await axios.post(
					`${process.env.VUE_APP_API_URL}comment/answer/delete.php`,
					params,
					reqConfig,
				);

				console.log(result);
				if (result === "Fail") {
					return Promise.reject(e);
				}
			} catch (e) {
				return Promise.reject(e);
			}

			dispatch("fetchReviews", state.station.id);
		},

		async addReport(
			{ commit, state },
			{ report, details, photo, prices, username, stationID },
		) {
			const params = await new URLSearchParams();
			params.append("report", report);
			params.append("details", details);
			params.append("photo", photo);
			params.append("username", username);
			params.append("stationID", stationID);
			params.append("prices", JSON.stringify(prices));

			try {
				const { data: result } = await axios.post(
					`${process.env.VUE_APP_API_URL}other/report.php`,
					params,
					reqConfig,
				);
			} catch (e) {
				return Promise.reject(e);
			}
		},

		async updateStation({ commit, state }, payload) {
			const params = await new URLSearchParams();
			params.append("stationID", payload.stationID);
			params.append("stationName", payload.stationName);
			params.append("country", payload.country);
			params.append("address", payload.address);
			params.append("facilities", payload.facilities);
			params.append("gasolinePrice", payload.gasolinePrice);
			params.append("dieselPrice", payload.dieselPrice);
			params.append("lpgPrice", payload.lpgPrice);
			params.append("electricityPrice", payload.electricityPrice);

			try {
				const { data: result } = await axios.post(
					`${process.env.VUE_APP_API_URL}station/update.php`,
					params,
					reqConfig,
				);

				if (result === "Fail") {
					return Promise.reject(e);
				}
			} catch (e) {
				return Promise.reject(e);
			}
		},
	}, // ACTIONS
};

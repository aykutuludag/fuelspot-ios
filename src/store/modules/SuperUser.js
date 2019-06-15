import axios from "axios";

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
export default {
	namespaced: true,

	state: {
		superUser: {},

		superUserStations: [],
	}, // STATE

	getters: {}, // GETTERS

	mutations: {
		SET_SUPER_USER(state, superUser) {
			state.superUser = superUser;
		},

		SET_SUPER_USER_STATIONS(state, superUserStations) {
			state.superUserStations = superUserStations;
		},
	}, // MUTATIONS

	actions: {
		async setSuperUser({ dispatch, commit }, superUser) {
			await localStorage.setItem("superUser", JSON.stringify(superUser));
			await commit("SET_SUPER_USER", superUser);
			await localStorage.removeItem("user");
			token = JSON.parse(localStorage.getItem("superUser")).token;
			reqConfig.headers.Authorization = "Bearer " + token;
		},

		async fetchSuperUserStations({ commit, state }) {
			const { data: superUserStations } = await axios.get(
				`${
					process.env.VUE_APP_API_URL
				}station/fetch-superuser.php?superusername=${
					state.superUser.username
				}`,
				reqConfig,
			);
			await commit("SET_SUPER_USER_STATIONS", superUserStations);
		},

		async updateSuperUser({ commit, state }, user) {
			const params = await new URLSearchParams();
			params.append("username", state.superUser.username);

			for (const key of Object.keys(user)) {
				params.append(key, user[key]);
			}

			return axios
				.post(
					`${process.env.VUE_APP_API_URL}superuser/update.php`,
					params,
					reqConfig,
				)
				.then((response) => {
					return response.data;
				});
		},
	}, // ACTIONS
};

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
		user: {},

		userReviews: [],
	}, // STATE

	getters: {}, // GETTERS

	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},

		SET_USER_REVIEWS(state, userReviews) {
			state.userReviews = userReviews;
		},
	}, // MUTATIONS

	actions: {
		async setUser({ commit }, user) {
			await localStorage.setItem("user", JSON.stringify(user));
            await commit("SET_USER", user);
			await localStorage.removeItem("superUser");
			token = JSON.parse(localStorage.getItem("user")).token;
			reqConfig.headers.Authorization = "Bearer " + token;
		},

		async fetchUserReviews({ commit, state }) {
			const { data: userReviews } = await axios.get(
				`${process.env.VUE_APP_API_URL}comment/fetch.php?username=${
					state.user.username
				}`,
				reqConfig,
			);

			commit("SET_USER_REVIEWS", userReviews);
		},

		async updateUser({ commit, state, dispatch }, user) {
			const params = await new URLSearchParams();
			params.append("username", state.user.username);

			for (const key of Object.keys(user)) {
				params.append(key, user[key]);
			}

			return axios
				.post(
					`${process.env.VUE_APP_API_URL}user/update.php`,
					params,
					reqConfig,
				)
				.then((response) => {
					if (user.photo) {
						user.photo = `https://fuelspot.com.tr/uploads/users/${
							user.username
						}.jpg`;
					}

					dispatch("setUser", JSON.parse(JSON.stringify(user)));
					return response.data;
				});
		},
	}, // ACTIONS
};

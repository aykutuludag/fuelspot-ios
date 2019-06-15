import axios from "axios";

let token = "";
if (localStorage.getItem("user") != null) {
    token = JSON.parse(localStorage.getItem("user")).token;
}
if (localStorage.getItem("superUser") != null) {
    token = JSON.parse(localStorage.getItem("superUser")).token;
}
const reqConfig = {
    headers: {
        Authorization: "Bearer " + token
    },
};
export default {

	namespaced: true,

	state: {

		campaigns: [],
		
		campaign: {
			stationID: null,
			campaignName: null,
			campaignDesc: null,
			campaignStart: null,
			campaignEnd: null,
			campaignPhoto: null,
		},

	}, // STATE

	getters: {

	}, // GETTERS

	mutations: {

		SET_CAMPAIGNS(state, campaigns) {
			state.campaigns = campaigns;
		},

		SET_CAMPAIGN(state, campaign) {
			state.campaign = campaign;
		},

	}, // MUTATIONS

	actions: {

		async fetchCampaigns({commit}, stationID) {
			const { data: campaigns } = await axios.get(
				`${process.env.VUE_APP_API_URL}campaign/fetch.php?stationID=${stationID}`,
				reqConfig,
			);

			commit('SET_CAMPAIGNS', campaigns);

		},

		async addCampaign({dispatch}, {stationID, campaignName, campaignDesc, campaignStart, campaignEnd, campaignPhoto}) {

			const params = await new URLSearchParams();
			params.append("stationID", stationID);
			params.append("campaignName", campaignName);
			params.append("campaignDesc", campaignDesc);
			params.append("campaignStart", campaignStart);
			params.append("campaignEnd", campaignEnd);
			params.append("campaignPhoto", campaignPhoto);

			const { data: campaigns } = await axios.post(
				`${process.env.VUE_APP_API_URL}campaign/add.php`,
				params,
				reqConfig,
			);

			dispatch('fetchCampaigns', stationID);

		},

		async updateCampaign({dispatch}, {stationID, campaignID, campaignName, campaignDesc, campaignStart, campaignEnd, campaignPhoto}) {

			const params = await new URLSearchParams();
			params.append("stationID", stationID);
			params.append("campaignID", campaignID);
			params.append("campaignName", campaignName);
			params.append("campaignDesc", campaignDesc);
			params.append("campaignStart", campaignStart);
			params.append("campaignEnd", campaignEnd);
			params.append("campaignPhoto", campaignPhoto);

			const { data: campaigns } = await axios.post(
				`${process.env.VUE_APP_API_URL}campaign/update.php`,
				params,
				reqConfig,
			);

			dispatch('fetchCampaigns', stationID);

		},

		async deleteCampaign({dispatch, rootState}, campaignID) {

			const params = await new URLSearchParams();
			params.append("campaignID", campaignID);

			const { data: campaigns } = await axios.post(
				`${process.env.VUE_APP_API_URL}campaign/delete.php`,
				params,
				reqConfig,
			);

			dispatch('fetchCampaigns', rootState['station/station'].id);

		},

	}, // ACTIONS

};

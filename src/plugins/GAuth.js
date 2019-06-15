import Vue from "vue";
import GAuth from "vue-google-oauth2";

const gauthOption = {
	clientId:
		"82431707983-je28ruu6o78s0fen5bkggus357dkde4p.apps.googleusercontent.com",
	scope: "profile email",
	prompt: "select_account",
};

Vue.use(GAuth, gauthOption);

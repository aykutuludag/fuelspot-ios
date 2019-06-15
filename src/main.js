import Vue from "vue";
import App from "./App.vue";
// Plugins
import "./plugins/GAuth";
import "./plugins/moment";
import "./plugins/VModal";
import "./plugins/VSocialSharing";
import "./plugins/GMaps";
import "./plugins/VeeValidate";
import "./plugins/Snotify";
import "./plugins/Tippy";
import "./plugins/CurrencyInput";

import router from "./router";
import store from "./store";
import axios from "axios";
import "./registerServiceWorker";
import "./assets/styles/main.scss";
// Components
import "./components/global/components";

/* eslint-disable */
axios.interceptors.request.use((config) => {
	if (["put", "post"].includes(config.method)) {
		NProgress.start();
	}
	return config;
});

axios.interceptors.response.use((response) => {
	NProgress.done();
	return response;
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";

const moment = require("moment");
require("moment/locale/tr");

Vue.use(require("vue-moment"), {
	moment,
});

const path = require("path");

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				"@public": path.resolve(__dirname, "./public"),
				"@img": path.resolve(__dirname, "./src/assets/img"),
				"@styles": path.resolve(__dirname, "./src/assets/styles"),
				"@components": path.resolve(__dirname, "./src/components"),
				"@views": path.resolve(__dirname, "./src/views"),
			},
		},
	},
};

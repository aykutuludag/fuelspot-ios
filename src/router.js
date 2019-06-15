import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";

Vue.use(Router);
Vue.use(Meta);

const Navbar = () => import("@components/Navbar");

const routes = {
	mode: "history",
	routes: [
		{
			path: "/",
			name: "GuestLayout",
			component: () => import("@views/guest/Layout.vue"),
			redirect: {
				name: "Login",
			},
			children: [
				{
					path: "login",
					name: "Login",
					component: () => import("@views/guest/pages/Login.vue"),
				},
				{
					path: "/privacy",
					name: "Privacy",
					component: () => import("@views/guest/pages/Privacy.vue"),
				},
				{
					path: "/terms-and-conditions",
					name: "TermsAndConditions",
					component: () => import("@views/guest/pages/Terms.vue"),
				},
				{
					path: "/help",
					name: "Help",
					component: () => import("@views/guest/pages/Help.vue"),
				},
				{
					path: "/help-for-superuser",
					name: "Help (Station Manager)",
					component: () =>
						import("@views/guest/pages/HelpForSuperuser.vue"),
				},
				{
					path: "welcome",
					name: "Welcome",
					component: () =>
						import("@views/superuser/pages/Welcome.vue"),
				},
				{
					path: "/register",
					name: "Register",
					component: () =>
						import("@views/superuser/pages/Register.vue"),
				},
			],
		},

		/**
		 * User
		 **/
		{
			path: "/user",
			name: "UserLayout",
			components: {
				default: () => import("@views/user/Layout.vue"),
				navbar: Navbar,
			},
			redirect: {
				name: "Stations",
			},
			children: [
				{
					path: "/stations",
					name: "Stations",
					components: {
						default: () => import("@views/user/pages/Stations.vue"),
					},
				},
				{
					path: "/news",
					name: "News",
					components: {
						default: () => import("@views/user/pages/News.vue"),
					},
				},
				{
					path: "/profile",
					name: "Profile",
					components: {
						default: () => import("@views/user/pages/Profile.vue"),
					},
				},
				{
					path: "/settings",
					name: "Settings",
					components: {
						default: () => import("@views/user/pages/Settings.vue"),
					},
				},
				{
					path: "/stations/:id",
					name: "SingleStation",
					props: true,
					components: {
						default: () =>
							import("@views/user/pages/SingleStation.vue"),
					},
				},
				{
					path: "/news/:slug",
					name: "SingleNews",
					props: true,
					components: {
						default: () =>
							import("@views/user/pages/SingleNews.vue"),
					},
				},
			],
		},

		/**
		 * Super User
		 **/
		{
			path: "/superuser",
			name: "SuperUserLayout",
			components: {
				default: () => import("@views/superuser/Layout.vue"),
				navbar: Navbar,
			},
			redirect: {
				path: "/my-station/:superStationID",
			},
			children: [
				{
					path: "/my-station/:superStationID",
					name: "MyStation",
					component: () =>
						import("@views/superuser/pages/MyStation.vue"),
				},
				{
					path: "/update-station/:superStationID",
					name: "UpdateStation",
					component: () =>
						import("@views/superuser/pages/UpdateStation.vue"),
				},
				{
					path: "/super-profile",
					name: "SuperUserProfile",
					component: () =>
						import("@views/superuser/pages/Profile.vue"),
				},
				{
					path: "/add-station",
					name: "AddStation",
					component: () =>
						import("@views/superuser/pages/AddStation.vue"),
				},
			],
		},

		/**
		 * 404
		 */

		{
			path: "/404",
			name: "NotFound",
			component: () => import("@views/notFound/NotFound.vue"),
		},

		{
			path: "*",
			redirect: "/404",
		},
	],
};

const router = new Router(routes);

/* eslint-disable */
router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
});

router.afterEach((to, from) => {
    NProgress.done();
});

// AUTH GUARD
router.beforeEach((to, from, next) => {

    const superUserPageNames = routes.routes.find(l => l.name === 'SuperUserLayout').children.map(p => p.name);
    const userPageNames = routes.routes.find(l => l.name === 'UserLayout').children.map(p => p.name);
    const authRequired = superUserPageNames.includes(to.name) || userPageNames.includes(to.name);
    const userLoggedIn = localStorage.getItem('user') != null;
    const superUserLoggedIn = localStorage.getItem('superUser') != null;

    if (authRequired) {
        if (!userLoggedIn && !superUserLoggedIn) {
            return next({
                path: '/login',
            });
        } else if (userLoggedIn && !superUserLoggedIn) {
            if (superUserPageNames.includes(to.name)) {
                return next({
                    path: '/login',
                });
            }
        }
    } else if (userLoggedIn && to.name === 'Login') {
        return next({
            name: 'UserLayout',
        });
    } else if (superUserLoggedIn && to.name === 'Login') {
        return next({
            name: 'UserLayout',
        });
    } else if (superUserLoggedIn && to.name === 'Welcome') {
        return next({
            name: 'SuperUserLayout',
        });
    } else if (!superUserLoggedIn && to.name === 'Register') {
        return next({
            path: '/welcome',
        });
    }
    next();
});

export default router;

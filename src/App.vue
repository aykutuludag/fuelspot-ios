<template>
	<div id="app">
		<router-view name="navbar" />
		<transition name="fade" mode="out-in">
			<router-view v-if="projectLoadStatus" />
		</transition>
		<vue-snotify></vue-snotify>
	</div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {

	name: "App",

	components: {},

	data() {
		return {
			projectLoadStatus: false
		};
	},

	metaInfo: {
		title: 'FuelSpot',
		titleTemplate: 'FuelSpot | %s'
    },

	methods: {

		...mapActions({
			setUser: 		'user/setUser',
			setSuperUser: 	'superUser/setSuperUser',
		}),

	},

	async created(){

		// SET_USER
		const user = localStorage.getItem('user');

		if(user){
			await this.setUser(JSON.parse(user));
		}

		// SET_SUPER_USER
		const superUser = localStorage.getItem('superUser');

		if(superUser){
			await this.setSuperUser(JSON.parse(superUser));
		}

		this.projectLoadStatus = true;

	}

};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition-duration: 0.3s;
	transition-property: opacity;
	transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0
}
</style>

<template>
	<section class="profile profile--super">
		<div class="main-wrapper">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<div
							class="fs-headline headline--main d-flex flex-row align-items-center justify-content-between"
						>
							<h1 class="mb-0">
								Profil
							</h1>
							<fs-button
								class="bg-white bg-hover-grey-lighten-4 fg-green borderless"
								:to="{
									path: '/help-for-superuser',
								}"
							>
								<i class="fas fa-question mr-1 fa-lg"></i>
								<span>Yardım</span>
							</fs-button>
							<fs-button
								class="bg-white bg-hover-grey-lighten-4 fg-red borderless"
								@click.native="logout"
							>
								<i class="fas fa-sign-out mr-2 fa-lg"></i>
								<span>Oturumu kapat</span>
							</fs-button>
						</div>

						<div
							class="card--user d-flex flex-column align-items-start p-relative mb-5"
						>
							<div
								class="d-flex flex-row flex-xl-column align-items-center align-items-xl-start"
							>
								<img
									class="card--user__image p-xl-absolute mb-3"
									:src="superUser.photo"
									alt="user"
								/>
								<div class="d-flex flex-column">
									<h1
										class="card--user__name fg-blue-grey-darken-3"
									>
										{{ superUser.name }}
										<div
											class="d-flex flex-row align-items-center ml-4"
										>
											<a
												class="fg-blue fg-hover-blue-darken-1"
												href="#"
												title="Profili Düzenle"
												v-tippy="{
													placement: 'right',
												}"
												@click.prevent="
													openEditProfileModal
												"
											>
												<i class="far fa-edit"></i>
											</a>
										</div>
									</h1>
									<h2
										class="card--user__username fg-blue-grey fw-500"
									>
										<span>@</span>
										<span>{{ superUser.username }}</span>
									</h2>
								</div>
							</div>
							<table>
								<tbody>
									<tr>
										<td>
											<i
												class="far fa-envelope mr-2"
												v-tippy="{ placement: 'left' }"
												title="E-Posta"
											></i>
										</td>
										<td>
											<span>{{ superUser.email }}</span>
										</td>
									</tr>
									<tr>
										<td>
											<i
												class="far fa-phone fa-flip-horizontal mr-2"
												v-tippy="{ placement: 'left' }"
												title="Telefon"
											></i>
										</td>
										<td>
											<span>
												{{ superUser.phoneNumber }}
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<i
												class="far fa-venus-mars fa-flip-horizontal mr-2"
												v-tippy="{ placement: 'left' }"
												title="Cinsiyet"
											></i>
										</td>
										<td>
											<span
												v-if="
													superUser.gender === 'male'
												"
											>
												Erkek
											</span>
											<span
												v-else-if="
													superUser.gender ===
														'female'
												"
											>
												Kadın
											</span>
											<span
												v-else-if="
													superUser.gender === 'other'
												"
											>
												Belirtilmedi
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<i
												class="far fa-birthday-cake mr-2"
												v-tippy="{ placement: 'left' }"
												title="Doğum Günü"
											></i>
										</td>
										<td>
											<span>{{ birthday }}</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div
							class="fs-headline headline--main d-flex flex-row align-items-center justify-content-between"
						>
							<h3 class="mb-0">
								Kayıtlı İstasyonlar
							</h3>
						</div>
						<div class="row row--stations">
							<div class="col-12 station">
								<StationCard />
								<div align="center">
									<fs-button
										color="green"
										style="margin: 16px;"
										borderless
										:to="{
											name: 'AddStation',
										}"
									>
										İstasyon ekle
									</fs-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Profile Edit Modal -->
		<modal name="profileEdit" height="auto" @before-close="beforeClose()">
			<div class="v--modal__inner py-4 px-3">
				<profile-form @submit="submit" :user="superUser" />
			</div>
		</modal>
		<!-- /Profile Edit Modal -->
	</section>
</template>

<script>
const StationCard = () => import("@/components/superuser/StationCard");
const ProfileForm = () => import("@/components/superuser/ProfileForm");

import moment from "moment";
import {mapActions, mapState} from "vuex";

export default {
	name: "SuperUserProfile",

	data() {
		return {};
	},

	components: {
		StationCard,
		ProfileForm,
	},

	metaInfo: {
		title: "Profil",
	},

	computed: {
		...mapState("superUser", ["superUser", "superUserStations"]),

		birthday() {
			return this.superUser.birthday
				? moment(this.superUser.birthday, "DD/MM/YYYY").format(
						"DD/MM/YYYY",
				  )
				: null;
		},
	},

	methods: {
		...mapActions({
			updateSuperUser: "superUser/updateSuperUser",
		}),
		...mapActions({
			fetchSuperUserStations: "superUser/fetchSuperUserStations",
		}),

		async submit(user) {
			this.updateSuperUser(user)
				.then((response) => {
					this.$snotify.success("Profil Güncellendi!", "Başarılı!", {
						timeout: 3000,
						showProgressBar: false,
					});
					localStorage.setItem("superUser", JSON.stringify(user));
					this.$modal.hide("profileEdit");
				})
				.catch((error) => {
					this.$snotify.error("Bir Hata Oluştu!", "Hata!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		},

		openEditProfileModal() {
			this.$modal.show("profileEdit");
			document.querySelector("body").style.overflow = "hidden";
		},

		beforeClose() {
			document.querySelector("body").removeAttribute("style");
		},
		logout() {
			localStorage.removeItem("superUser");
			this.$router.push({
				name: "Login",
			});
		},
	},

	async created() {
		await this.fetchSuperUserStations();
	},
};
</script>

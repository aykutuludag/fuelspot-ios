<template>
	<section class="profile">
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
								borderless
								:to="{
									path: '/help',
								}"
							>
								<i class="fas fa-question mr-1 fa-lg"></i>
								<span>Yardım</span>
							</fs-button>
							<fs-button
								class="bg-white bg-hover-grey-lighten-4 fg-red borderless"
								@click.native="logout"
							>
								<i class="fas fa-sign-out mr-2"></i>
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
									:src="user.photo"
									alt="user"
								/>
								<div class="d-flex flex-column">
									<h1
										class="card--user__name fg-blue-grey-darken-3"
									>
										{{ user.name }}
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
										<span>{{ user.username }}</span>
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
											<span>{{ user.email }}</span>
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
											<span>{{ user.phoneNumber }}</span>
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
											<span v-if="user.gender === 'male'">
												Erkek
											</span>
											<span
												v-else-if="
													user.gender === 'female'
												"
											>
												Kadın
											</span>
											<span
												v-else-if="
													user.gender === 'other'
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
									<tr>
										<td>
											<i
												class="far fa-map-marker-alt mr-2"
												v-tippy="{ placement: 'left' }"
												title="Adres"
											></i>
										</td>
										<td>
											<span>{{ user.location }}</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="col-12 mt-2">
						<h1 class="headline headline--main">
							Son yorumlarınız
						</h1>
						<p
							class="font-italic fg-blue-grey"
							v-if="userReviews.length === 0"
						>
							Henüz yorum yapmadınız.
						</p>
						<div
							class="reviewer__wrapper"
							v-for="(review, index) in userReviews"
							:key="index"
							v-else
						>
							<single-review :review="review" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Profile Edit Modal -->
		<modal name="profileEdit" height="auto" @before-close="beforeClose()">
			<div class="v--modal__inner py-4 px-3">
				<profile-form @submit="submit" :user="user" />
			</div>
		</modal>
		<!-- /Profile Edit Modal -->
	</section>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import moment from "moment";

    const SingleReview = () => import("@/components/SingleReview");
const ProfileForm = () => import("@/components/user/ProfileForm");

export default {
	name: "Profile",

	data() {
		return {};
	},

	metaInfo: {
		title: "Profil",
	},

	components: {
		SingleReview,
		ProfileForm,
	},

	computed: {
		...mapState("user", ["user", "userReviews"]),

		birthday() {
			return this.user.birthday
				? moment(this.user.birthday, "DD/MM/YYYY").format("D MMMM YYYY")
				: null;
		},
	},

	methods: {
		...mapActions({
			fetchUserReviews: "user/fetchUserReviews",
			updateUser: "user/updateUser",
		}),

		async submit(user) {
			this.updateUser(user)
				.then((response) => {
					this.$snotify.success("Profil Güncellendi!", "Başarılı!", {
						timeout: 3000,
						showProgressBar: false,
					});
					localStorage.setItem("user", JSON.stringify(user));
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
			localStorage.removeItem("user");
			this.$router.push({
				name: "Login",
			});
		},
	},

	async created() {
		await this.fetchUserReviews();
	},
};
</script>

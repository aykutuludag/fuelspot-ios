<template>
	<div
		class="review--single p-relative"
		style="margin: 8px; border: solid 1px #ff0000; padding: 4px"
	>

		<div class="reviewer d-flex flex-row align-items-center">
			<router-link
				:to="{
					name: 'SingleStation',
					params: { id: review.station_id },
				}"
			>
				<img
					class="reviewer__image"
					:src="
						review.user_photo ||
							'https://fuelspot.com.tr/default_icons/profile.png'
					"
					width="36"
					height="36"
					alt="user"
				/>
				<span class="reviewer__username fg-blue-grey fw-500">
					{{ review.username }}
				</span>
				<div class="ml-2">
					<div class="d-flex flex-row align-items-center ml-2">
						<star-rating
							read-only
							:show-rating="false"
							:star-size="14"
							:rating="Number(review.stars)"
							:round-start-rating="false"
						/>
						<span class="reviewer__reply-time">
							{{ review.time | moment("D MMMM YYYY") }}
						</span>
					</div>
				</div>
			</router-link>
		</div>
		<div class="reviewer__review mb-0">
			<p class="reviewer__comment" v-if="!formEditStatus">
				{{ review.comment }}
			</p>
			<a
				v-if="review.username === user.username"
				class="fg-blue-grey m-0"
				href="#"
				@click.prevent="openReviewModal"
			>
				Düzenle
			</a>

			<a
				v-if="review.username === user.username"
				class="fg-red"
				href="#"
				@click.prevent="openDeleteConfirmationModal"
			>
				Sil
			</a>

			<div class="d-inline-block">
				<i class="fas fa-circle"></i>
			</div>
			<div
				v-if="review.answer"
				style="margin: 4px; background-color: #f0f0f0; padding: 4px;"
			>
				<img
					:src="
						review.logo ||
							'https://fuelspot.com.tr/default_icons/station.png'
					"
					width="36"
					height="36"
					alt="station"
				/>
				{{ review.answer }} --
				{{ review.replyTime | moment("D MMMM YYYY") }}

				<a
					v-if="isSuperUser && !superUserAnswerStatus"
					@click="openSuperUserAnswerForm"
				>
					Cevapla
				</a>
				<a
					v-if="isSuperUser && superUserAnswerStatus"
					@click="openSuperUserAnswerForm"
				>
					Düzenle
				</a>
				<a
					v-if="isSuperUser && superUserAnswerStatus"
					@click="openSuperUserDeleteConfirmation"
				>
					Sil
				</a>
			</div>
		</div>
		<!-- Modals -->
		<modal
			:name="`reviewModal_${compID}`"
			height="auto"
			@before-close="beforeClose()"
		>
			<div class="v--modal__inner py-4 px-3">
				<h1 class="form__heading">
					Yorumunuzu düzenleyin
				</h1>
				<station-review-form
					@submit="editComment"
					:data="{
						comment: review.comment,
						rating: Number(review.stars),
					}"
				/>
			</div>
		</modal>

		<modal
			:name="`answerModal_${compID}`"
			height="auto"
			@before-close="beforeClose()"
		>
			<div class="v--modal__inner py-4 px-3">
				<h1 class="form__heading">
					Yorumu Cevaplayın
				</h1>
				<station-answer-form
					@submit="addAnswer"
					:data="review.answer"
				/>
			</div>
		</modal>

		<modal
			:name="`deleteConfirmation_${compID}`"
			height="auto"
			@before-close="beforeClose()"
		>
			<div class="v--modal__inner py-4 px-3">
				<h1 class="v--modal__heading fg-blue-grey">
					<i
						class="d-block mb-4 far fa-exclamation-circle fg-orange"
						style="font-size:28px"
					></i>
					<span>Bu yorumu silmek istediğinize emin misiniz?</span>
				</h1>
				<div
					class="d-flex flex-row align-items-center justify-content-between"
				>
					<fs-button
						color="blue-grey"
						borderless
						width="100px"
						@click.native="closeDeleteConfirmationModal"
					>
						Vazgeç
					</fs-button>
					<fs-button
						color="red"
						width="100px"
						borderless
						@click.native="remove"
					>
						Sil
					</fs-button>
				</div>
			</div>
		</modal>

		<modal
			:name="`superUserDeleteConfirmation_${compID}`"
			height="auto"
			@before-close="beforeClose()"
		>
			<div class="v--modal__inner py-4 px-3">
				<h1 class="v--modal__heading fg-blue-grey">
					<i
						class="d-block mb-4 far fa-exclamation-circle fg-orange"
						style="font-size:28px"
					></i>
					<span>Bu cevabı silmek istediğinize emin misiniz?</span>
				</h1>
				<div
					class="d-flex flex-row align-items-center justify-content-between"
				>
					<fs-button
						color="blue-grey"
						borderless
						width="100px"
						@click.native="closeSuperUserDeleteConfirmation"
					>
						Vazgeç
					</fs-button>
					<fs-button
						color="red"
						width="100px"
						borderless
						@click.native="removeAnswer"
					>
						Sil
					</fs-button>
				</div>
			</div>
		</modal>
		<!-- /Modals -->
	</div>
</template>

<script>
const StarRating = () => import("vue-star-rating");
const StationReviewForm = () => import("@/components/user/StationReviewForm");
const StationAnswerForm = () =>
	import("@/components/superuser/StationAnswerForm");

import {mapActions, mapState} from "vuex";

export default {
	name: "SingleReview",

	data() {
		return {
			formEditStatus: false,
			compID: Math.random()
				.toString(36)
				.replace("0.", "")
				.substring(0, 10)
				.toUpperCase(),
			isSuperUser: localStorage.getItem("superUser") != null,
		};
	},

	props: {
		review: {},
	},

	computed: {
		...mapState("user", ["user"]),
		...mapState("superUser", ["superUser"]),
		...mapState("station", ["station"]),

		superUserAnswerStatus() {
			return Boolean(this.review.answer);
		},
	},

	components: {
		StarRating,
		StationReviewForm,
		StationAnswerForm,
	},

	methods: {
		...mapActions({
			updateComment: "station/updateComment",
			deleteComment: "station/deleteComment",
			updateAnswer: "station/updateAnswer",
			deleteAnswer: "station/deleteAnswer",
		}),

		editComment({ comment, rating }) {
			const payload = {
				comment: comment,
				stars: rating,
				commentID: this.review.id,
			};

			this.updateComment(payload)
				.then(() => {
					this.$snotify.success(
						"Yorumunuz Guncellendi!",
						"Başarılı!",
						{
							timeout: 3000,
							showProgressBar: false,
						},
					);

					this.changeFormEditStatus();
					this.closeReviewModal();
				})
				.catch((error) => {
					this.$snotify.error("Hata!", "Bir Hata Oluştu!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		},

		changeFormEditStatus() {
			this.formEditStatus = !this.formEditStatus;
		},

		openReviewModal() {
			this.changeFormEditStatus();
			this.$modal.show(`reviewModal_${this.compID}`);
			document.querySelector("body").style.overflow = "hidden";
		},

		openSuperUserAnswerForm() {
			this.$modal.show(`answerModal_${this.compID}`);
			document.querySelector("body").style.overflow = "hidden";
		},

		closeSuperUserAnswerForm() {
			this.$modal.hide(`answerModal_${this.compID}`);
		},

		closeReviewModal() {
			this.$modal.hide(`reviewModal_${this.compID}`);
		},

		openDeleteConfirmationModal() {
			this.$modal.show(`deleteConfirmation_${this.compID}`);
			document.querySelector("body").style.overflow = "hidden";
		},

		closeDeleteConfirmationModal() {
			this.$modal.hide(`deleteConfirmation_${this.compID}`);
		},

		beforeClose() {
			document.querySelector("body").removeAttribute("style");
		},

		remove() {
			this.deleteComment(this.review.id)
				.then(() => {
					this.$snotify.success("Yorumunuz Silindi!", "Başarılı!", {
						timeout: 3000,
						showProgressBar: false,
					});

					this.closeDeleteConfirmationModal();
				})
				.catch((error) => {
					this.$snotify.error("Hata!", "Bir Hata Oluştu!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		},

		addAnswer(answer) {
			const payload = {
				answer: answer,
				commentID: this.review.id,
				logo: this.review.logo,
			};

			this.updateAnswer(payload)
				.then(() => {
					this.$snotify.success(
						this.superUserAnswerStatus
							? "Cevabınız Güncellendi!"
							: "Cevabınız Eklendi!",
						"Başarılı!",
						{
							timeout: 3000,
							showProgressBar: false,
						},
					);

					this.closeSuperUserAnswerForm();
				})
				.catch((error) => {
					this.$snotify.error("Hata!", "Bir Hata Oluştu!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		},

		removeAnswer() {
			this.deleteAnswer(this.review.id)
				.then(() => {
					this.$snotify.success("Cevabınız Silindi!", "Başarılı!", {
						timeout: 3000,
						showProgressBar: false,
					});

					this.closeSuperUserDeleteConfirmation();
				})
				.catch((error) => {
					this.$snotify.error("Hata!", "Bir Hata Oluştu!", {
						timeout: 3000,
						showProgressBar: false,
					});
				});
		},

		openSuperUserDeleteConfirmation() {
			this.$modal.show(`superUserDeleteConfirmation_${this.compID}`);
			document.querySelector("body").style.overflow = "hidden";
		},

		closeSuperUserDeleteConfirmation() {
			this.$modal.hide(`superUserDeleteConfirmation_${this.compID}`);
		},
	},
};
</script>

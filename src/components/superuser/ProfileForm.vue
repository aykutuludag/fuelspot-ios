<template>
	<form class="form form--profile-edit p-relative" @submit.prevent="submit">

		<a
				class="v--modal__close fg-red-lighten-2 p-absolute top-0 right-0"
				@click="$modal.hide('profileEdit')"
		>
			<i class="far fa-times"></i>
		</a>

		<h1 class="v--modal__heading">
			Bilgilerinizi güncelleyin
		</h1>

		<div class="container">
			<div class="row">

				<div class="col-12 col-md-6">
					<label class="form__label">
						Ad Soyad
					</label>
					<input
							class="form-control"
							type="text"
							name="name"
							aria-label="Adınız ve Soyadınız"
							v-model="tempUser.name"
							v-validate="'required'"
					/>
				</div>

				<div class="col-12 col-md-6">
					<label class="form__label">
						E-Posta
					</label>
					<input
							class="form-control"
							type="text"
							name="email"
							aria-label="E-Posta Adresiniz"
							v-model="tempUser.email"
							v-validate="'required|email'"
					/>
				</div>

				<div class="col-12 col-md-6">
					<label class="form__label">
						Telefon
					</label>
					<input
							class="form-control"
							type="text"
							name="phoneNumber"
							aria-label="Telefon Numaranız"
							v-model="tempUser.phoneNumber"
							v-validate
					/>
				</div>

				<div class="col-12 col-md-6 p-relative">
					<label class="form__label">
						Fotoğraf
					</label>
					<input
							class="form-control"
							type="file"
							aria-label="Profil Fotoğrafınız"
							@change="onFileChanged"
							ref="photo"
					/>
					<a
							class="p-absolute top-0 right-0 mr-3 fg-red"
							@click="removeUserImage()"
							v-if="tempUser.photo"
					>
						<i class="far fa-times-circle"></i>
					</a>
				</div>

				<div class="col-12 col-md-6">
					<label class="form__label">
						Doğum günü
					</label>
					<datepicker
							input-class="form-control"
							name="birthday"
							:language="tr"
							monday-first
							format="dd MMMM yyyy"
							aria-label="Doğum Tarihiniz"
							v-validate
							v-model="birthday"
					>
					</datepicker>
				</div>

				<div class="col-12">
					<label class="form__label">
						Cinsiyet
					</label>
					<fs-radio
							name="gender"
							id="male"
							label="Erkek"
							data="male"
							v-model="tempUser.gender"
							v-validate="'required'"
					/>
					<fs-radio
							name="gender"
							id="female"
							label="Kadın"
							data="female"
							v-model="tempUser.gender"
							v-validate="'required'"
					/>
					<fs-radio
							name="gender"
							id="other"
							label="Belirtmek istemiyorum"
							data="other"
							v-model="tempUser.gender"
							v-validate="'required'"
					/>
				</div>

				<div class="col-12">
					<hr class="my-1" />
				</div>

				<div class="col-12 mt-3 d-flex justify-content-end">
					<fs-button
							color="green"
					>
						<template>
							<i
									class="far fa-save mr-2"
									style="font-size: 17px"
							></i>
							Kaydet
						</template>
					</fs-button>
				</div>

			</div>
		</div>
	</form>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import {tr} from 'vuejs-datepicker/dist/locale';
    import moment from 'moment';

    export default {

        name: "ProfileForm",

        data() {
            return {
                tempUser: {},
                tr: tr,
                birthday: null
            };
        },

        props: {

            user: {
                type: Object,
                required: true
            }

        },

        components: {
            Datepicker
        },

        methods: {

            async submit(){

                const validationResponse = await this.$validator.validateAll();

                if(!validationResponse){
                    this.$snotify.error(
                        'Hata!',
                        this.errors.items[0].msg,
                        {
                            timeout: 3000,
                            showProgressBar: false
                        }
                    );
                    return false;
                }

                this.tempUser.birthday = moment(this.birthday).format('DD/MM/YYYY');

                this.$emit('submit', this.tempUser);

            },

            onFileChanged (event) {
                const file = event.target.files[0]
                this.getBase64(file);
            },

            getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    this.tempUser.photo = reader.result;
                    this.tempUser.photo = this.tempUser.photo.replace("data:image/png;base64,", "");
                    this.tempUser.photo = this.tempUser.photo.replace("data:image/jpeg;base64,", "");
                }.bind(this);
            },

            removeUserImage(){
                this.tempUser.photo         = null;
                this.$refs.photo.value      = "";
            },

        },

        created(){
            this.tempUser = JSON.parse(JSON.stringify(this.user));
            this.birthday = moment(this.user.birthday, "DD/MM/YYYY").format('YYYY-MM-DD');
        }
    };
</script>
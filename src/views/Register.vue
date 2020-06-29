<template>
  <v-container>
    <div>
      <v-card max-width="600" class="ma-auto">
        <v-card-title class="mx-4">{{ $t("register") }}</v-card-title>
        <v-alert
          class="mx-4"
          color="red darken-3"
          outlined
          v-if="error_email_exist"
          close-label
          >{{ error_email_exist }}</v-alert
        >
        <v-form
          ref="form"
          v-model="valid"
          class="px-4 mx-4"
          @submit.prevent="submit()"
        >
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                :counter="20"
                :rules="nameRules"
                :label="$t('full_name')"
                required
                v-model="full_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :label="$t('email')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :type="show ? 'text' : 'password'"
                :counter="20"
                :label="$t('password')"
                required
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                :counter="20"
                :label="$t('confirm_password')"
                required
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                v-model="confirm_password"
                :rules="passwordRules"
                @keydown="removeError"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-alert
            color="red darken-3"
            dark
            outlined
            v-show="show_password_error"
            transition="fade-transition"
            >{{ password_error }}</v-alert
          >
          <v-btn
            class="ma-2"
            color="success"
            :disabled="!valid"
            type="submit"
            @click="validate"
            ref="signupButton"
          >
            <span>
              {{ $t("signup") }}
            </span>
          </v-btn>
          <v-btn class="ma-2" color="warning" @click="reset">
            <span>{{ $t("reset") }}</span>
          </v-btn>
          <vue-programmatic-invisible-google-recaptcha
            v-show="false"
            ref="invisibleRecaptcha1"
            :sitekey="'6LeS6vcUAAAAABj_G8v4ubrf27yQFqczAsGrSIhK'"
            :elementId="'invisibleRecaptcha1'"
            :badgePosition="'left'"
            :showBadgeMobile="true"
            :showBadgeDesktop="true"
            @recaptcha-callback="recaptchaCallback"
          ></vue-programmatic-invisible-google-recaptcha>
        </v-form>
      </v-card>
      <v-snackbar v-model="snackbar" top>
        {{ $t("register_sucsses") }}
        <v-btn color="warning" dark text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import register from "../mixins/httpHandler";
import i18n from "../plugins/i18n";
export default {
  data() {
    return {
      show1: false,
      show: false,
      nameRules: [
        v => !!v || i18n.tc("name_required"),
        v => (v && v.length <= 20) || i18n.tc("name_count")
      ],
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
      emailRules: [
        v => !!v || i18n.tc("email_required"),
        v => /.+@.+\..+/.test(v) || i18n.tc("email_valid")
      ],
      passwordRules: [
        v => !!v || i18n.tc("password_required"),
        v => (v && v.length >= 8) || i18n.tc("password_count")
      ],
      valid: true,
      snackbar: false,
      error_email_exist: null,
      password_error: null,
      register_error: null,
      show_password_error: false
    };
  },
  methods: {
    validate() {
      if (this.password !== this.confirm_password) {
        this.valid = false;
        this.password_error = i18n.tc("password_dose_not_match");
        this.show_password_error = true;
      } else {
        this.valid = true;
        this.$refs.form.validate();
        this.show_password_error = false;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.invisibleRecaptcha1.reset();
    },
    removeError() {
      this.show_password_error = false;
      this.$refs.form.validate();
      this.valid = true;
    },
    async submit() {
      console.log("fired from register mixin");

      await this.$refs.invisibleRecaptcha1.execute();
    },
    async recaptchaCallback(recaptchaToken) {
      let userInfo = {
        email: this.email,
        password: this.password,
        full_name: this.full_name,
        recaptchaToken: recaptchaToken,
        router: "signup"
      };
      await this.post(userInfo, false).then(async respone => {
        console.log(respone);
        if (respone.data.signup == true) {
          this.snackbar = true;
          this.$router.push("/login");
        } else {
          if (respone.data.signup == false) {
            this.error_email_exist = respone.data.errors;
            this.error_email_exist = i18n.tc("email_exist");
          }
        }
      });
    }
  },
  mixins: [register]
};
</script>

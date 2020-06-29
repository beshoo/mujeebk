<template>
  <div class="login-component">
    <v-container>
      <v-alert
        v-if="false"
        text
        color="success"
        icon="mdi-check"
        border="left"
        v-model="alert"
        width="600"
      >
        {{ $t("sucsses_sign_in") }}
        <v-btn color="warning" dark text @click="alert = false">
          {{ $t("close") }}
        </v-btn>
      </v-alert>
      <v-card max-width="600" :class="cardMargin" class="pa-2 pb-4 margin-top">
        <v-card-actions>
          <v-img
            src="../assets/mid_logo.png"
            max-width="150"
            class="ma-auto"
          ></v-img>
        </v-card-actions>
        <v-form
          ref="form"
          v-model="valid"
          class="px-4 mx-4"
          @submit.prevent="submit()"
        >
          <v-alert
            color="red darken-3"
            dark
            outlined
            v-show="error"
            transition="fade-transition"
            >{{ $t("email_password_not_correct") }}</v-alert
          >
          <v-text-field
            color="#33368d"
            @keydown="hideError"
            v-model="email"
            :rules="emailRules"
            :label="$t('email')"
            required
          ></v-text-field>
          <v-text-field
            color="#33368d"
            v-model="password"
            :counter="20"
            :rules="passwordRules"
            :label="$t('password')"
            required
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-card-actions class="pa-0">
            <v-btn text color="primary" class="ps-0">
              <span>{{ $t("forget") }}</span>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="pa-0">
            <v-btn text to="/register" class="ps-0">
              <span
                >{{ $t("newAccount") }}
                <span class="primary--text">{{ $t("register") }}</span>
              </span>
            </v-btn>
          </v-card-actions>
          <v-btn
            class="ma-2"
            color="#33368d"
            type="submit"
            dark
            :loading="showLoading"
          >
            <span>
              {{ $t("login") }}
            </span>
          </v-btn>
          <v-btn class="ma-2" color="warning" @click="reset">
            <span>{{ $t("reset") }}</span>
          </v-btn>
        </v-form>

        <v-snackbar :value="snake" top> </v-snackbar>
      </v-card>
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
    </v-container>
  </div>
</template>

<script>
import httpHandler from "../mixins/httpHandler.js";
import i18n from "../plugins/i18n";
export default {
  components: {},
  data() {
    return {
      show1: false,
      passwordRules: [
        (v) => !!v || i18n.tc("password_is_required"),
        (v) => (v && v.length >= 7) || i18n.tc("password_count"),
      ],
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || i18n.tc("email_is_required"),
        (v) => /.+@.+\..+/.test(v) || i18n.tc("email_valid"),
      ],
      valid: true,
      email_password_not_correct: "",
      error: null,
      snake: false,
      showLoading: false,
      alert: true,
      cardMargin: "",
      sessionId: "session_id",
    };
  },
  props: {
    msg: String,
  },
  methods: {
    hideError() {
      this.error = false;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
      this.$refs.invisibleRecaptcha1.reset();
    },
    async submit() {
      console.log("fired from register mixin");
      await this.$refs.invisibleRecaptcha1.execute();
      this.showLoading = true;
    },
    async recaptchaCallback(recaptchaToken) {
      let userInfo = {
        email: this.email,
        password: this.password,
        recaptchaToken: recaptchaToken,
        router: "login",
      };
      await this.post(userInfo, true).then((respone) => {
        if (respone.data.session) {
          this.alert = true;
          setTimeout(() => {
            localStorage.setItem("local_lang", "en");
            this.$router.push("/cards");
          }, 1000);
        } else {
          this.error = true;
          this.showLoading = false;
          this.email_password_not_correct = respone.data.errors;
        }
      });
    },
    changeCardMargin() {
      if (
        localStorage.getItem(this.sessionId) == null ||
        localStorage.getItem(this.sessionId) == undefined
      ) {
        this.cardMargin = "mx-auto";
      } else {
        this.cardMargin = "";
      }
    },
  },
  created() {
    this.changeCardMargin();
  },
  mixins: [httpHandler],
};
</script>
<style scoped>
.span_color {
  color: #32368b;
}
.margin-top {
  margin-top: 104px !important;
}
</style>

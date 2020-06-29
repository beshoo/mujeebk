import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "@/plugins/i18n";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import VueTapTarget from "vue-tap-target";
import VueInputAutowidth from "vue-input-autowidth";
import VueProgrammaticInvisibleGoogleRecaptcha from "vue-programmatic-invisible-google-recaptcha";
import VuePlyr from 'vue-plyr'


Vue.component(
  "vue-programmatic-invisible-google-recaptcha",
  VueProgrammaticInvisibleGoogleRecaptcha
);

Vue.config.productionTip = false;
Vue.use(VueInputAutowidth);
Vue.use(VueLodash, { name: "custom", lodash: lodash });
Vue.use(VueTapTarget);
Vue.use(VuePlyr)
export const bus = new Vue();
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");

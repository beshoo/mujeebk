<template>
  <v-app>
    <v-row>
      <Navigation v-if="show" />
      <v-content :class="paddingClass" id="content">
        <router-view></router-view>
        <v-container>
          <v-alert color="red darken-3" outlined v-show="networkError">
            {{ error }}
          </v-alert>
        </v-container>
      </v-content>
    </v-row>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import checkSession from "./mixins/httpHandler.js";
import { bus } from "./main";
export default {
  name: "App",

  components: {
    Navigation,
  },
  data: () => ({
    error: "",
    networkError: null,
    paddingValue: "",
    show: true,
    isArabic: "",
    isEnglish: "",
    overlay: true,
    sessionId: "session_id",
    number: "",
    colCounter: "",
    paddingClass: "englishPadding",
    //
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {},
  computed: {},
  created() {
    this.post({ router: this.sessionId }, true);
    if (
      localStorage.getItem(this.sessionId) == null ||
      localStorage.getItem(this.sessionId) == undefined
    ) {
      this.show = false;
      this.paddingClass = "";
    } else {
      this.show = true;
      if (localStorage.getItem("local_lang") == "en") {
        this.paddingClass = "englishPadding";
      } else {
        this.paddingClass = "arabicPadding";
      }
    }
    bus.$on("arabicLang", () => {
      this.paddingClass = "arabicPadding";
    });
    bus.$on("englishLang", () => {
      this.paddingClass = "englishPadding";
    });
  },
  updated() {
    if (
      localStorage.getItem(this.sessionId) == null ||
      localStorage.getItem(this.sessionId) == undefined
    ) {
      this.show = false;
      this.paddingClass = "";
    } else {
      this.show = true;
      if (localStorage.getItem("local_lang") == "en") {
        this.paddingClass = "englishPadding";
      } else {
        this.paddingClass = "arabicPadding";
      }
    }
  },
  mounted() {
    let loading = document.getElementById("loading");
    let app = document.getElementById("app");
    setTimeout(() => {
      loading.style.display = "none";
      app.style.display = "block";
    }, 3000);
    let jsonQScript = document.createElement("script");
    jsonQScript.setAttribute("src", "https://www.mujeebk.com/panel/jq.js");
    console.log(jsonQScript);
    document.head.appendChild(jsonQScript);
  },
  mixins: [checkSession],
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@600&display=swap");

.app {
  font-family: "Cairo" !important;
  font-size: 18px;
}
.englishPadding {
  padding: 0 0 0 170px !important;
}
.arabicPadding {
  padding: 0 170px 0 0 !important;
}
.withOutPadding {
  padding: 0 !important;
}
</style>

<template>
  <nav>
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon >
    <v-navigation-drawer v-model="drawer" :right="right()" width="250" fixed>
      <v-list shaped class="pa-0 mr-12">
        <v-list-item-group color="#0d0e69">
          <v-list-item href="/">
            <v-list-item-content>
              <v-img max-width="172" src="../assets/small-mid-logo.png"></v-img>
            </v-list-item-content>
          </v-list-item>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on" dense>
                <v-list-item-icon v-on="on" class="iconMargin">
                  <v-icon>
                    mdi-cog-outline
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t("settings") }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-card>
              <v-toolbar dark color="#0d0e69">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="dialog = false">Save</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-list three-line subheader>
                <v-subheader>User Controls</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Content filtering</v-list-item-title>
                    <v-list-item-subtitle
                      >Set the content filtering level to restrict apps that can
                      be downloaded</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Password</v-list-item-title>
                    <v-list-item-subtitle
                      >Require password for purchase or use password to restrict
                      purchase</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list three-line subheader>
                <v-subheader>General</v-subheader>
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox v-model="notifications"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Notifications</v-list-item-title>
                    <v-list-item-subtitle
                      >Notify me about updates to apps or games that I
                      downloaded</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox v-model="sound"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Sound</v-list-item-title>
                    <v-list-item-subtitle
                      >Auto-update apps at any time. Data charges may
                      apply</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox v-model="widgets"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Auto-add widgets</v-list-item-title>
                    <v-list-item-subtitle
                      >Automatically add home screen
                      widgets</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-dialog>
          
          <v-list-item to="/login" dense v-show="loginButton">
            <v-list-item-icon class="iconMargin">
              <v-icon>
                mdi-login
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("login") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense @click="logout" v-show="logoutButton">
            <v-list-item-icon class="iconMargin">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("logout") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item color="#0d0e69" to="/cards" dense>
            <v-list-item-icon class="iconMargin">
              <v-icon>mdi-card-account-details-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("cards") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/mujeebk_web" dense>
            <v-list-item-icon class="iconMargin">
              <v-icon>mdi-qrcode</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Qrscane
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/box" color="#0d0e69" dense>
            <v-list-item-icon class="iconMargin">
              <v-icon>
                mdi-robot
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("automated_answers") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/how-to-use" color="#0d0e69" dense>
            <v-list-item-icon class="iconMargin">
              <v-icon>
                mdi-map-marker-path
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("automated_answers") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            class="my-2"
            color="#0d0e69"
            v-model="active"
            no-action
            dense
          >
            <template v-slot:activator>
              <v-list-item-icon class="iconMargin">
                <v-icon>
                  mdi-earth
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t("lang") }}
              </v-list-item-title>
            </template>

            <v-list-item @click="changeLTR" dense>
              <v-list-item-content>
                <v-list-item-title>English</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="changeRTL" dense>
              <v-list-item-content>
                <v-list-item-title>العربية</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import i18n from "@/plugins/i18n";
// import axios from 'axios';
import logout from "../mixins/httpHandler.js";
import { bus } from '../main'
export default {
  data() {
    return {
      drawer: true,
      item: "text",
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      logoutButton: null,
      loginButton: null,
      active: true,
    };
  },
  methods: {
    changeRTL() {
      this.$vuetify.rtl = true;
      this.changeLocale("ar");
      localStorage.setItem('local_lang', "ar")
      bus.$emit('arabicLang')
    },
    changeLTR() {
      this.$vuetify.rtl = false;
      this.changeLocale("en");
      localStorage.setItem('local_lang', "en")
      bus.$emit('englishLang')
    },
    changeLocale(locale) {
      i18n.locale = locale;
      // localStorage.setItem("local_lang", locale);
    },
    right() {
      if (this.$vuetify.rtl == true) {
        return true;
      }
    },
    logout() {
      localStorage.clear();
      this.post({ router: "logout" }, true);
      this.logoutButton = false;
      this.loginButton = true;
    },
    checkSessionState() {
      this.post({ router: "session_status" }, false).then(respone => {
        if (
          respone.data.session == false ||
          localStorage.getItem("session_id") == null
        ) {
          this.loginButton = true;
          this.logoutButton = false;
        } else {
          this.loginButton = false;
          this.logoutButton = true;
        }
      });
    }
  },
  created() {
    this.checkSessionState();
  },
  updated() {
    this.checkSessionState();
  },
  mixins: [logout]
};
</script>
<style>
.v-application .white {
  border-color: #0d0e73 !important;
  background-color: #ffffff;
}
.border-bottom {
  border-bottom: 3px solid #0d0e73 !important;
  background-color: #ffffff !important;
}
.v-list-item--link:before
{
  width: 230px !important
}
.iconMargin{
  margin-right: 20px !important
}
</style>

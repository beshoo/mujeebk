<template>
  <div class="qrscane">
    <v-container>
      <v-card flat class="scale">
        <v-row>
          <v-col cols="12" md="7" class="pt-0">
            <v-card-title class="font-weight-normal headline">
              {{ $t("use_mujeebk") }} :
            </v-card-title>
            <v-list>
              <v-list-item class="title font-weight-light">
                1. {{ $t("steps.step_one") }}
              </v-list-item>
              <v-list-item class="title font-weight-light">
                2. {{ $t("steps.step_two.part_one") }}
                <v-icon color="black">mdi-dots-vertical</v-icon>
                {{ $t("steps.step_two.part_two") }}
                <v-icon class="ms-1 me-1">mdi-cog-outline </v-icon
                >{{ $t("steps.step_two.part_three") }}
              </v-list-item>
              <v-list-item class="title font-weight-light">
                3. {{ $t("steps.step_three") }}
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="5">
            <v-sheet
              height="264"
              width="264"
              style="position: absolute"
              color="transparent"
            >
              <v-img src="../assets/whats_app.svg" width="50" class="whatsapp">
              </v-img>
              <v-overlay absolute opacity="0" v-if="showOverlay">
                <v-card
                  width="200"
                  height="200"
                  color="secondary"
                  style="border-radius: 50%"
                  @click="disableOverlay"
                >
                  <v-card-actions>
                    <v-icon large style="margin-top: 45px" class="mx-auto">
                      mdi-replay
                    </v-icon>
                  </v-card-actions>
                  <v-card-text class="title white--text pt-0">
                    {{ $t("qr_reload") }}
                    <p class="text-center">{{ $t("code") }}</p>
                  </v-card-text>
                </v-card>
              </v-overlay>
            </v-sheet>
            <qrcode-vue
              :value="qr_code"
              level="M"
              :size="264"
              :class="opacityQr"
            >
            </qrcode-vue>
          </v-col>
        </v-row>
        <v-card class="text-center mt-12" flat>
          <vue-plyr style="width: 800px;" class="mx-auto">
            <video
              poster="../assets/qr-video.jpg"
              src="https://mujeebk.com/whatsapp.mp4"
            ></video>
          </vue-plyr>
        </v-card>
      </v-card>
    </v-container>
    <v-subheader>{{ socketData }}</v-subheader>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
// import qr from "../mixins/test";
import io from "socket.io-client";
import checkSessionQrscane from "../mixins/httpHandler";
export default {
  /*eslit-disable*/
  components: {
    QrcodeVue,
  },
  data() {
    return {
      socketData: "",
      currentTabComponent: "bot",
      qr_code: "",
      sessionId: "session_id",
      showOverlay: false,
      opacityQr: "",
      showImage: true,
      showVideos: true,
    };
  },
  watch: {},
  methods: {
    soketStart() {
      var URL_SERVER = "https://mujeebk.com:8090";
      var socket = io.connect(URL_SERVER);
      console.log(socket);
      socket.on("qr_code", (data) => {
        this.qr_code = data;
      });
      socket.on(
        "profile_json",
        async function(data) {
          if (data === true) {
            await socket.disconnect();
            this.$router.push("/cards");
          }
        }.bind(this)
      );

      socket.on("log_out", function() {
        socket.disconnect();
      });
      socket.on(
        "colose_connection",
        function() {
          socket.disconnect();
          this.showOverlay = true;
          this.opacityQr = "opacity-qr";
        }.bind(this)
      );
      socket.emit("check_session", localStorage.getItem("session_id"));
    },
    socketClosed(){
      var URL_SERVER = "https://mujeebk.com:8090";
      var socket = io.connect(URL_SERVER);
      socket.on(
        "colose_connection",
        function() {
          socket.disconnect();
          console.log('closed connection');
          
        }
      );
    },
    disableOverlay() {
      this.showOverlay = false;
      this.opacityQr = "";
      this.soketStart();
    },
  },
  created() {},
  mounted() {
    this.soketStart();
    this.post({ router: this.sessionId }, true);
  },
  updated() {
    this.post({ router: this.sessionId }, true);
  },
  beforeRouteLeave(to, from, next) {
      var URL_SERVER = "https://mujeebk.com:8090";
      var socket = io.connect(URL_SERVER);
      socket.on(
        "colose_connection",
        function() {
          socket.disconnect();
          console.log('closed connection');
          
        }
      );
      next()
  },
  mixins: [checkSessionQrscane],
};
</script>

<style scoped>
.whatsapp {
  width: 50px;
  margin: auto;
  margin-top: 39%;
}
.video {
  outline: none;
}
.opacity-qr {
  opacity: 0.12 !important;
}
</style>

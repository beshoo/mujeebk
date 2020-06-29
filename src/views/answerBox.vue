<template>
  <div class="automated-answer">
    <v-container class="pa-0">
      <v-card flat >
        <v-card-title class="headline font-weight-medium">
          Automated Answer
        </v-card-title>
        <v-card-subtitle class="subtitle-1 font-weight-regular">
          Chatra bot is useful to provide answers to frequently asked questions
          and decrease the load on your team. It can also learn more about the
          visitor’s needs before they are transferred to a human agent.
        </v-card-subtitle>
      </v-card>
      <v-row>
        <v-col cols="12" xs="8" sm="8" md="8" v-if="chatAutomated">
          <v-card color="transparent bg" flat class="pa-4" scrollable height="350">
            <automated />
          </v-card>
        </v-col>
        <v-col cols="12" md="8" v-if="false">
          <v-card flat class="pa-2" height="500">
            <scenarios />
          </v-card>
        </v-col>
        <v-col cols="12" md="4" v-if="false">
          <v-card>
            <v-card-title class="">
              Explane Automated Fields
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>

import automated from "../components/automated/Conversation";
import scenarios from "../components/Scenarios";
import checkSessionAutomatedAnswer from '../mixins/httpHandler'
export default {
  components: {
    automated,
    scenarios,
  },
  data() {
    return {
      chatAutomated: true,
      sessionId: 'session_id'
    };
  },
  mounted() {
    this.post({router: this.sessionId},true)
  },
  updated() {
        this.post({router : this.sessionId}, true)
  },
  mixins: [checkSessionAutomatedAnswer]
};
</script>
<style scoped>
.automated-answer {
  height: 100vh;
}
</style>

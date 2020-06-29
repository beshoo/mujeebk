<!--
<template>
<div class="how-to-use">
      <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Select an app
      <small>Summarize if needed</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="grey lighten-1" class="mb-12" height="200px">
          <v-card-title>
              Step one
          </v-card-title>
      </v-card>
      <v-btn color="#0d0e6d" dark @click="e6 = 2">Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="#0d0e6d" dark @click="e6 = 3">Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="#0d0e6d" dark @click="e6 = 4">Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">View setup instructions</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="#0d0e6d" dark @click="e6 = 1">Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</div>
</template>

<script>
  export default {
    data () {
      return {
        e6: 1,
      }
    },
  }
</script>
<style scoped>
.v-stepper
{
    box-shadow: none !important;
}
</style>
-->
<!--
<template>
  <v-timeline>
    <v-timeline-item
      v-for="(year, i) in years"
      :key="i"
      :color="year.color"
      small
    >
      <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold ${year.color}--text`"
          v-text="year.year"
        ></span>
      </template>
      <div class="py-4">
        <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">Lorem ipsum</h2>
        <div>
            {{year.text}}
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
  export default {
    data: () => ({
      years: [
        {
          color: 'cyan',
          year: '1960',
          text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
        },
        {
          color: 'green',
          year: '1970',
          text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
        },
        {
          color: 'pink',
          year: '1980',
          text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
        },
        {
          color: 'amber',
          year: '1990',
          text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
        },
        {
          color: 'orange',
          year: '2000',
          text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
        },
      ],
    }),
  }
</script>
-->
<template>
  <div class="text-center">
    <v-btn @click="dialog = true">
      Click
    </v-btn>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="pa-2">
        <v-btn icon class="ml-auto" @click="closeDialog">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-menu offset-x>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark width="200" class="ma-auto" v-on="on">
              {{dialogName}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="showImageItem" dense>Send photo</v-list-item>
            <v-list-item @click="showVideoItem" dense>Send viedo</v-list-item>
            <v-list-item @click="showDocItem" dense>Send document</v-list-item>
            <v-list-item @click="showVoiceItem" dense>Send audio</v-list-item>
            <v-list-item @click="showSsrItem" dense>Send SSR feed</v-list-item>
            <v-list-item
              v-for="ask in asks"
              :key="ask.id"
              dense
              @click="showTarget($event)"
              :title="ask.textareaLabel"
              >{{ ask.label }}</v-list-item
            >
          </v-list>
        </v-menu>
        <v-card-actions>
          <v-text-field
            label="Send Text Message"
            v-if="showText"
            type="send_text"
          ></v-text-field>
        </v-card-actions>
        <v-card-actions>
          <v-row>
            <v-col cols="12" md="6" v-if="showCol">
              <v-file-input
                v-if="showImage"
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Send photo"
              ></v-file-input>
              <v-file-input
                v-if="showVid"
                :rules="rules"
                accept="video/mp4, video/mkv"
                placeholder="Pick an viedeo"
                prepend-icon="mdi-video"
                label="Send video"
              ></v-file-input>
              <v-file-input
                v-if="showDoc"
                :rules="rules"
                accept=".psd, .pdf"
                placeholder="Pick an document"
                prepend-icon="mdi-file-document"
                label="Send document"
              ></v-file-input>
              <v-file-input
                v-if="showVoice"
                :rules="rules"
                accept=".mp3, .m4a"
                placeholder="Pick an voice"
                prepend-icon="mdi-phone-outline"
                label="Send audio"
              ></v-file-input>
              <v-text-field
                v-if="showSsr"
                outlined
                placeholder="Set your URL"
                prepend-icon="mdi-web"
                label="SSR"
              ></v-text-field>
              <v-textarea
                v-if="showTextarea"
                name="input-7-1"
                :label="textarea"
                auto-grow
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-actions>
          <v-btn v-if="showButtons">
            Save
          </v-btn>
          <v-btn v-if="showButtons">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    dialog: false,
    showImage: false,
    showVid: false,
    showDoc: false,
    showVoice: false,
    showSsr: false,
    showText: false,
    showUrl: false,
    showButtons: false,
    asks: [
      {
        label: "Ask for user email",
        type: "ask_email",
        textareaLabel: "email",
      },
      {
        label: "Ask for user Phone number",
        type: "ask_phone",
        textareaLabel: "phone",
      },
      {
        label: "Ask user to send a photo",
        type: "ask_photo",
        textareaLabel: "photo",
      },
      {
        label: "Ask user to send a video",
        type: "ask_video",
        textareaLabel: "video",
      },
      {
        label: "Ask user to send an audio",
        type: "ask_audio",
        textareaLabel: "audio",
      },
      {
        label: "Ask user to send an document",
        type: "ask_doc",
        textareaLabel: "document",
      },
      {
        label: "Ask user to send contact csv file",
        type: "ask_contact",
        textareaLabel: "contact",
      },
      {
        label: "Ask user to send a GPS location",
        type: "ask_gps",
        textareaLabel: "gps",
      },
    ],
    textarea: "",
    showTextarea: false,
    dialogName: 'Dialog Type',
    showCol: false
  }),
  methods: {
    showDocItem() {
      this.showCol= true
      this.showDoc = true;
      this.showUrl = true;
      this.showImage = false;
      this.showVid = false;
      this.showVoice = false;
      this.showSsr = false;
      this.showButtons = true;
      this.showTextarea = false;
      this.dialogName = 'Send Documents'
    },
    showImageItem() {
      this.showCol= true
      this.showImage = true;
      this.showText = true;
      this.showUrl = true;
      this.showDocItem = false;
      this.showVid = false;
      this.showVoice = false;
      this.showSsr = false;
      this.showButtons = true;
      this.showTextarea = false;
      this.dialogName = 'Send Photo'
    },
    showVideoItem() {
      this.showCol= true
      this.showVid = true;
      this.showUrl = true;
      this.showImage = false;
      this.showDoc = false;
      this.showVoice = false;
      this.showSsr = false;
      this.showButtons = true;
      this.showTextarea = false;
      this.dialogName = 'Send Video'
    },
    showVoiceItem() {
      this.showCol= true
      this.showVoice = true;
      this.showUrl = true;
      this.showVid = false;
      this.showImage = false;
      this.showDoc = false;
      this.showSsr = false;
      this.showButtons = true;
      this.showTextarea = false;
      this.dialogName = 'Send Audio'
    },
    showSsrItem() {
      this.showCol= true
      this.showSsr = true;
      this.showUrl = true;
      this.showVoice = false;
      this.showVid = false;
      this.showImage = false;
      this.showDoc = false;
      this.showButtons = true;
      this.showTextarea = false;
      this.dialogName = 'Send SSR'
    },
    showTarget(event) {
      this.showCol= true
      var target = event.currentTarget.title;
      console.log(target);
      this.textarea = target;
      this.showTextarea = true;
      this.showSsr = false;
      this.showVoice = false;
      this.showVid = false;
      this.showImage = false;
      this.showDoc = false;
      this.showButtons = true;
      this.dialogName = target
    },
    closeDialog() {
      this.showCol= false
      this.dialog = false;
      this.showTextarea = false;
      this.showSsr = false;
      this.showUrl = false;
      this.showVoice = false;
      this.showVid = false;
      this.showImage = false;
      this.showDoc = false;
      this.showButtons = false;
      this.showTextarea = false;
    },
  },
};
</script>

<style scoped>
.v-list-item--dense, .v-list--dense .v-list-item
{
  min-height: 34px !important;
}
</style>
<template>
  <div>
    <v-snackbar v-model="snackbar" left bottom color="success">
      <span>This Card Has Been Removed</span>
      <v-btn text color="white" @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-card flat>
            <v-card-title>{{ $t("welcomeMsg") }}</v-card-title>
            <v-btn class="ma-2">Reset</v-btn>
            <v-btn>Save</v-btn>
            <nested-list v-model="elements" @remove-item="isActive = true" />
            <raw-displayer
              class="col-4"
              :title="'Vuex Store'"
              :value="elements"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import nestedList from "./nested-list";
import rawDisplayer from "./raw-displayer.vue";
export default {
  name: "HelloWorld",
  components: {
    nestedList,
    rawDisplayer
  },
  data() {
    return {
      snackbar: false
    };
  },
  computed: {
    elements: {
      get() {
        return this.$store.state.elements;
      },
      set(value) {
        this.$store.dispatch("updateElements", value);
      }
    }
  },
  props: {
    msg: String
  }
};
</script>

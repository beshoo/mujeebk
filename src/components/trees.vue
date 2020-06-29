<template>
  <div>
    <v-container>
      <dialogs />
      <v-card v-if="loadingCard" class="text-center" flat>
        <v-card-title class="d-block text-center grey lighten-3">
          <v-progress-circular
            :size="25"
            :width="3"
            color="indigo darken-2"
            indeterminate
          ></v-progress-circular>
          <span class="ml-1">
            {{ $t("loading") }}
          </span>
        </v-card-title>
      </v-card>
      <v-dialog max-width="400" v-model="dialog" persistent>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="emptyFiled" v-show="loading">
            {{ $t("add_main_chat_category") }}
          </v-btn>
        </template>
        <v-card class="pa-4">
          <v-form @submit.prevent="addToTree()" ref="form" v-model="valid">
            <v-text-field
              required
              :rules="addField"
              :label="$t('add_main_chat_category')"
              v-model="title"
            ></v-text-field>
            <v-card-actions>
              <v-btn small color="indigo accent-4" dark @click="addToTree()">{{
                $t("add")
              }}</v-btn>
              <v-btn small @click="dialog = false" :disabled="closeButton">{{
                $t("close")
              }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-row class="text-center">
        <v-col cols="12">
          <v-card flat>
            <nested-list v-model="elements" @remove-item="isActive = true" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import nestedList from "./nested-list";
import trees from "../mixins/httpHandler";
import flatten from "../mixins/helper";
import i18n from "../plugins/i18n";
import dialogs from "./dialogs";
export default {
  components: {
    nestedList,
    dialogs
  },
  data() {
    return {
      snackbar: false,
      dialog: false,
      title: "",
      number_id: "",
      closeButton: false,
      addField: [v => !!v || i18n.tc("filed_required")],
      valid: true,
      loadingCard: false,
      loading: false
    };
  },
  methods: {
    load_tree() {
      this.loadingCard = true;
      this.post(
        { router: "load_tree", number_id: this.$route.params.id },
        false
      ).then(async respone => {
        this.loadingCard = false;
        this.loading = true;
        let tree = JSON.parse(respone.data.tree)
        console.log('runs');
        
        console.log(tree);
        
        await this.flatten(tree, "#f9f9f9");
        this.$store.state.elements = tree;
      });
    },
    addToTree() {
      this.closeButton = true;
      let addData = {
        title: this.title,
        number_id: this.$route.params.id,
        router: "add_to_tree",
        p_id: 0
      };
      this.post(addData, false).then(async respone => {
        let tree = JSON.parse(respone.data.tree);
        await this.flatten(tree, "#f9f9f9");
        this.$store.state.elements = tree;
        this.dialog = false;
        this.closeButton = false;
      });
    },
    emptyFiled() {
      this.title = "";
      this.closeButton = false;
    },
    validate() {
      this.$refs.form.validate();
    }
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
  created() {
    this.load_tree();
    this.post({ router: "session_status" }, true);
  },
  mixins: [trees, flatten]
};
</script>

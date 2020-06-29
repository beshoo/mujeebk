<template>
  <div>
    <v-snackbar v-model="snackbar" top>
      {{ $t("successfuly_updated") }}
      <v-btn color="warning" dark text @click="snackbar = false">
        {{ $t("close") }}
      </v-btn>
    </v-snackbar>
    <v-dialog max-width="400" ref="dialog" v-model="dialog" persistent>
      <v-card flat class="pa-4">
        <v-card-title>{{ $t("this_is_sub_of") }} : {{ title }}</v-card-title>
        <v-form @submit.prevent="addChildToTree()" ref="form" v-model="valid">
          <v-text-field
            required
            :label="$t('add_child_chat')"
            v-model="childNameAdd"
            :rules="addField"
            value="test"
          ></v-text-field>
          <v-card-actions>
            <v-btn
              small
              color="indigo accent-4"
              dark
              @click="addChildToTree()"
              >{{ $t("add") }}</v-btn
            >
            <v-btn small @click="closeAddDialog" color="grey" outlined>{{
              $t("close")
            }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- Edit Dialog -->
    <v-dialog max-width="400" ref="dialog" v-model="editDialog" persistent>
      <v-card flat class="pa-4">
        <v-card-title>
          {{ $t("edit_the_title_of") }} : {{ title }}
        </v-card-title>
        <v-form
          @submit.prevent="editTitle()"
          ref="formEdit"
          v-model="editValid"
        >
          <v-text-field
            required
            :label="$t('edit_child_chat')"
            v-model="childName"
            :rules="addField"
            :value="title"
            autofocus
          ></v-text-field>
          <v-card-actions>
            <v-btn small color="indigo accent-4" dark @click="editTitle()">{{
              $t("update")
            }}</v-btn>
            <v-btn small @click="closeEditDialog" color="grey" outlined>{{
              $t("close")
            }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog max-width="400" v-model="deleteDialog">
      <v-card class="pa-2">
        <v-card-title>
          {{ $t("delete") }} :
          <span class="font-weight-bold">{{ title }}</span>
        </v-card-title>
        <v-card-actions>
          <v-btn
            @click="removeItemFromTree()"
            color="indigo accent-r"
            small
            dark
          >
            {{ $t("delete") }}
          </v-btn>
          <v-btn @click="deleteDialog = false" small color="grey" outlined>
            {{ $t("close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { bus } from "../main";
import httpHandler from "../mixins/httpHandler";
import helper from "../mixins/helper";
import i18n from "../plugins/i18n";
export default {
  data() {
    return {
      childName: "",
      childNameAdd: "",
      dialog: false,
      editDialog: false,
      deleteDialog: false,
      id: "",
      title: "",
      addField: [v => !!v || i18n.tc("filed_required")],
      valid: true,
      editValid: true,
      snackbar: false
    };
  },
  methods: {
    addChildToTree() {
      let addChild = {
        title: this.childNameAdd,
        router: "add_to_tree",
        number_id: this.$route.params.id,
        p_id: this.id
      };
      if (this.$refs.form.validate()) {
        this.post(addChild, false).then(async respone => {
          let tree = JSON.parse(respone.data.tree);
          await this.flatten(tree, "#f9f9f9");
          this.$store.state.elements = tree;
          this.dialog = false;
          this.$refs.form.reset();
          this.valid = false;
          this.snackbar = true;
        });
      } else {
        this.valid = false;
        return true;
      }
    },
    editTitle() {
      let edit = {
        title: this.childName,
        id: this.id,
        router: "update_tree",
        number_id: this.$route.params.id
      };
      if (this.$refs.formEdit.validate()) {
        this.post(edit, false)
          .then(async respone => {
            let tree = JSON.parse(respone.data.tree);
            await this.flatten(tree, "#f9f9f9");
            this.$store.state.elements = tree;
            this.editDialog = false;
            this.snackbar = true;
          })
          .catch(err => console.log(err.message));
      }
    },
    removeItemFromTree() {
      let removeItem = {
        number_id: this.$route.params.id,
        id: this.id,
        router: "delete_from_tree"
      };
      this.post(removeItem, false).then(async respone => {
        let tree = JSON.parse(respone.data.tree);
        await this.flatten(tree, "#f9f9f9");
        this.$store.state.elements = tree;
        this.deleteDialog = false;
        this.snackbar = true;
      });
    },
    closeAddDialog() {
      this.dialog = false;
      this.$refs.form.resetValidation();
    },
    closeEditDialog() {
      this.editDialog = false;
      this.$refs.formEdit.resetValidation();
    }
  },
  created() {
    bus.$on("addDialog", data => {
      this.title = data[1].title;
      this.id = data[1].id;
      this.dialog = data[0];
      this.valid = false;
    });
    bus.$on("editDialog", data => {
      this.editDialog = data[0];
      this.title = data[1].title;
      this.id = data[1].id;
      this.childName = this.title;
    });
    bus.$on("deleteDialog", data => {
      this.deleteDialog = data[0];
      this.title = data[1].title;
      this.id = data[1].id;
    });
  },
  mixins: [helper, httpHandler]
};
</script>

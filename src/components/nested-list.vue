<style scoped>
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #388e3c !important;
}
</style>
<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :value="value"
    :move="checkmove"
    @input="emitter"
    @start="onstart"
    @end="onend"
    @choose="onChoose"
  >
    <v-list
      class="item-group text-right mb-2 pa-3"
      :key="el.id"
      v-for="el in realValue"
      :style="{ backgroundColor: el.color }"
    >
      <v-list-item class="item">
        <v-btn
          icon
          color="green"
          @click.stop="callDeleteDialog($event)"
          :id="el.id"
          :title="el.title"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <!-- This Is Add Dialog -->
        <v-btn
          icon
          @click.stop="callAddDialog($event)"
          :id="el.id"
          :title="el.title"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <!-- This Is Edit Dialog -->
        <v-btn
          icon
          @click.stop="callEditDialog($event)"
          :id="el.id"
          :title="el.title"
        >
          <v-icon>
            mdi-pencil-outline
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <span>{{ el.title }}</span>
      </v-list-item>
      <nested-test class="item-sub" :list="el.children" />
    </v-list>
  </draggable>
</template>

<script>
import { bus } from "../main";
import shadeColor from "../mixins/helper";
import draggable from "vuedraggable";
import { mapActions } from "vuex";
// import i18n from "../plugins/i18n";
import _ from "lodash";
import httpHandler from "../mixins/httpHandler";
export default {
  name: "nested-test",
  data() {
    return {
      is_false: false,
      childName: "",
      editedName: "",
      loading: false,
      valid: true,
      dialog: [],
      reorder: [],
      is_reorder: false
    };
  },
  async created() {
    await this.flatten(this.$store.state.elements, "#f9f9f9");
  },
  async updated() {
    await this.flatten(this.$store.state.elements, "#f9f9f9");
  },
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    ...mapActions(["restore", "addTree"]),
    checkmove(evt) {
      if (typeof evt.relatedContext.element != "undefined") {
        if (evt.draggedContext.element.p_id === evt.relatedContext.element.id) {
          this.is_false = true;
          return false;
        } else if (
          evt.draggedContext.element.p_id !== evt.relatedContext.element.p_id
        ) {
          this.is_false = true;
          return false;
        } else {
          this.is_false = false;
          this.is_reorder = evt.relatedContext.element.p_id;

          return true;
        }
      } else {
        return false;
      }
    },
    onstart() {},
    onend() {
      if (this.is_false == true) {
        this.restore(this.flatten(this.backup_array, "#f9f9f9"));
      }
      if (this.is_reorder) {
        console.log(JSON.stringify(this.$store.state.elements));
        this.find_set(
          this.$store.state.elements,
          this.is_reorder,
          this.$route.params.id
        );
        this.is_reorder = false;
      }
    },
    onChoose() {
      this.backup_array = _.cloneDeep(this.$store.state.elements);
    },
    closeDialog() {
      this.post({ router: "session_status" }, true).then(respone => {
        console.log(respone);
        return true;
      });
    },
    callAddDialog(event) {
      let nodeInfo = {
        id: event.currentTarget.id,
        title: event.currentTarget.title
      };
      bus.$emit("addDialog", [true, nodeInfo]);
    },
    callEditDialog(event) {
      let nodeInfo = {
        id: event.currentTarget.id,
        title: event.currentTarget.title
      };
      bus.$emit("editDialog", [true, nodeInfo]);
    },
    callDeleteDialog(event) {
      let nodeInfo = {
        id: event.currentTarget.id,
        title: event.currentTarget.title
      };
      bus.$emit("deleteDialog", [true, nodeInfo]);
    }
  },
  components: {
    draggable
  },

  computed: {
    elements: {
      get() {
        return this.$store.state.elements;
      }
    },
    dragOptions() {
      return {
        group: "nested",
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    }
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  },
  mixins: [shadeColor, httpHandler]
};
</script>

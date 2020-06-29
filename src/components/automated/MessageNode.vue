<template>
  <div class="message-container">
    <v-text-field
      type="text"
      v-model="text"
      @input="handelChange"
      @blur="handelFocus(false)"
      @focus="handelFocus(true)"
      :placeholder="placeHolder"
      background-color="#FFF"
      filled
      rounded
      class="message-node"
      full-width
    ></v-text-field>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "message-node",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      text: this.value,
      placeHolder: "Bot message",
    };
  },
  methods: {
    handelChange() {
      this.$emit("input", this.text);
    },
    handelFocus(isFocused) {
      this.$emit("focused", isFocused);
    },
  },
  watch: {
    value: function(to, from) {
      this.text = to;
    },
  },
};
</script>
<style lang="scss">
$msg-color-b: #f1f3f5;
$msg-color-f: #666669;
$msg-place-holder: #adadb4;
.message-container {
  margin: 0.5rem;
}
.message-node {
  border-radius: 12px;
  padding: 0;
}
</style>

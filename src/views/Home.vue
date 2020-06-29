<template>
  <div class="home">
    <v-container>
      <button @click="tap" ref="button">Click</button>
      <tap-target
        :show="show"
        :target="tapTargetFocus"
        backgroundColor="#3458b2"
        color="#ffffff"
        contentLocation="nw"
        title="This is the title"
        content="And here is some content to display underneath the title."
        @close="show = false"
      />
      <v-skeleton-loader
        type="card-avatar"
        height="300"
        :loading="loadingScreen()"
      >
        <HelloWorld />
      </v-skeleton-loader>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    loadingScreen() {
      if (this.$store.state.elements.length == 0) {
        this.loading = false;
        return true;
      } else {
        return false;
      }
    },
    tap() {
      this.tapTargetFocus = this.$refs.button;
      setTimeout(() => {
        this.show = true;
      }, 2000);
    }
  },
  data() {
    return {
      elements: this.$store.state.elements,
      show: false,
      tapTargetFocus: null,
      loading: true,
      form: ""
    };
  }
};
</script>

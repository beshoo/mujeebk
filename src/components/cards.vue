<template>
  <div>
    <v-container>
      <v-row height="50">
        <v-col cols="12" xs="12" sm="6" md="8" class="text-center pb-0">
          <v-text-field
            v-model="search"
            name="name"
            :label="$t('search')"
            :placeholder="searchPlacHolder"
            id="id"
            outlined
            append-icon="mdi-magnify"
            rounded
            color="secondary"
            type="search"
            class="cards-search"
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="pb-0">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" dark v-on="on" class="ma-auto">
                <v-icon>
                  mdi-chevron-down
                </v-icon>
                <span>{{ $t("sort_by") }}</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="filter in filters" :key="filter.id">
                <v-list-item-title @click="sortBy('number')">{{
                  filter.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          class="pt-1"
          v-for="card in filterCards"
          :key="card.id"
        >
          <v-skeleton-loader type="card-avatar" height="150" :loading="loading">
            <v-card class="pa-3 cardWhats" elevation="0" color="grey lighten-2">
              <v-row>
                <v-col cols="12" md="2" class="pa-0">
                  <v-card-actions>
                    <v-avatar style="margin-left: 5px">
                      <img :src="card.src" alt="John" />
                    </v-avatar>
                  </v-card-actions>
                </v-col>
                <v-col cols="12" md="8" class="my-auto">
                  <v-card-text class="headline pa-0" style="margin-top: -9px">
                    <span class="font-weight-bold">
                      {{ card.number }}
                    </span>
                  </v-card-text>
                  <v-subheader
                    style="height: 9px;padding-left: 0px;font-weight: bold;font-size: 1.09rem;margin-top: 7px;"
                    >{{ card.plantype }}</v-subheader
                  >
                </v-col>
                <v-col cols="12" md="2">
                  <v-menu offset-y transition="slide-y-transition" bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn text icon v-on="on" color="secondary">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list class="py-0">
                      <v-list-item-title class="pa-2 secondary white--text">{{
                        $t("advanced_settings")
                      }}</v-list-item-title>
                      <v-list-item
                        v-for="advanced in advanceds"
                        :key="advanced.id"
                      >
                        <v-list-item-title>
                          <v-icon left>
                            {{ advanced.icon }}
                          </v-icon>
                          <span>
                            {{ advanced.title }}
                          </span>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12" class="ma-auto">
                  <v-progress-linear
                    :value="card.progressValue"
                    height="35"
                    reactive
                    :color="card.BarColor"
                  >
                    <span class="font-weight-regular" :class="card.fontColor"
                      >{{ card.dayValue }} {{ $t("day_remaining") }}</span
                    >
                  </v-progress-linear>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xs="4" md="4" class="pe-0">
                  <v-card-actions class="d-block text-center pa-0">
                    <v-btn
                      dark
                      color="secondary"
                      class="font-weight-regular"
                      width="100%"
                      small
                    >
                      <v-icon small class="">
                        mdi-update
                      </v-icon>
                      <span class="px-2">
                        {{ $t("upgrade") }}
                      </span>
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="12" xs="4" md="4" class="pe-0">
                  <v-card-actions class="d-block text-center pa-0">
                    <v-btn width="100%" small>
                      {{ $t("settings") }}
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="12" xs="4" md="4">
                  <v-card-actions class="pa-0">
                    <v-btn @click="changeColor($event)" width="100%" small>
                      <v-icon :color="color">
                        {{ stateIcon }}
                      </v-icon>
                      <span class="px-2">
                        {{ $t("start") }}
                      </span>
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import i18n from "../plugins/i18n";
export default {
  data() {
    return {
      dialog: false,
      searchPlacHolder: i18n.tc("search_place_holder"),
      load_tree: "/trees/1",
      loading: true,
      disabled: true,
      stateIcon: "mdi-stop",
      search: "",
      color: "red accent-2",
      cards: [
        {
          number: "0993817408",
          src: "https://cdn.vuetifyjs.com/images/john.jpg",
          plantype: i18n.tc("free_plan"),
          progressValue: 100,
          BarColor: "green",
          fontColor: "",
          dayValue: "30",
        },
        {
          number: "0993825408",
          src: "https://cdn.vuetifyjs.com/images/john.jpg",
          plantype: i18n.tc("premium_plan"),
          progressValue: 70,
          BarColor: "green",
          fontColor: "",
          dayValue: "22",
        },
        {
          number: "0991457697",
          src: "https://cdn.vuetifyjs.com/images/john.jpg",
          plantype: i18n.tc("silver_plan"),
          progressValue: 15,
          BarColor: "green",
          fontColor: "",
          dayValue: "10",
        },
      ],
      advanceds: [
        {
          title: i18n.tc("rescane"),
          icon: "mdi-reload",
        },
        {
          title: i18n.tc("reports"),
          icon: "mdi-alert",
        },
        {
          title: i18n.tc("delete"),
          icon: "mdi-close",
        },
        {
          title: i18n.tc("how_it_work"),
        },
      ],
      filters: [
        {
          name: "Running Sessions",
        },
        {
          name: "Stopped Session",
        },
        {
          name: "Expired Session",
        },
        {
          name: "Expired Subscription",
        },
      ],
    };
  },
  methods: {
    changeColor(event) {
      console.log(event);
      this.color = "green";
      this.stateIcon = "mdi-play";
    },
    sortBy(prop) {
      this.cards.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    changeBarColor() {
      this.cards.map((card) => {
        if (card.progressValue >= 75) {
          card.BarColor = "green";
          card.fontColor = "white--text";
        } else if (card.progressValue > 25 && card.progressValue < 75) {
          card.BarColor = "orange darken-1";
          card.fontColor = "black--text";
        } else if (card.progressValue < 25) {
          card.BarColor = "red  accent-2";
          card.fontColor = "black--text";
        }
      });
    },
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.changeBarColor();
  },
  computed: {
    filterCards() {
      return this.cards.filter((card) => {
        return (
          card.number.match(new RegExp(this.search, "i")) ||
          card.plantype.match(new RegExp(this.search, "i"))
        );
      });
    },
  },
};
</script>
<style scoped>
.rounded {
  border-radius: 3px !important;
}
.border-icon {
  background-color: #272727;
  border-radius: 4px;
  margin-left: -1px;
  border-left: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.set-btn {
  border-right: 0px !important;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.cardWhats {
  background: rgb(246, 246, 246);
  background: -moz-linear-gradient(
    360deg,
    rgba(246, 246, 246, 1) 0%,
    rgba(255, 255, 255, 1) 40%
  );
  background: -webkit-linear-gradient(
    360deg,
    rgba(246, 246, 246, 1) 0%,
    rgba(255, 255, 255, 1) 40%
  );
  background: linear-gradient(
    360deg,
    rgba(246, 246, 246, 1) 0%,
    rgba(255, 255, 255, 1) 40%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f6f6f6",endColorstr="#ffffff",GradientType=1);
  border: 1px solid;
}
.cards-search {
  border-radius: 12px !important;
}
</style>

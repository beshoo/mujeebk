<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="11">
        <div>
          <v-text-field
            :nodes="parentInputs.chain.text"
            outlined
            placeholder="Bot Welcome Message"
            filled
            @keyup="showButtonDialog"
          ></v-text-field>
          <v-card-actions
            class="pa-0 text-right"
            v-model="add_opinion"
            id="parent"
          >
            <v-btn outlined small text color="blue" @click="add($event)">
              <span>
                Add reply option
              </span>
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined small text color="blue" @click="add" v-show="addDi">
              <span>
                Add Dialog
              </span>
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <form
              class="d-inline-block"
              v-for="replay in parentInputs.chain.replies"
              :key="replay.id"
            >
              <v-chip
                v-show="showChipChild"
                close
                color="blue"
                @click:close="remove(index)"
                outlined
                medium
                class="ma-1"
              >
                <input
                  class="text_filed"
                  v-autowidth="{
                    maxWidth: '150px',
                    minWidth: '20px',
                    comfortZone: 0,
                  }"
                  @click="recrisve"
                />
              </v-chip>
            </form>
          </v-card-text>
        </div>
        <answer-box :nodes="parentInputs.chain.replies.map((ele) => {return ele.next.text})" v-if="show" />
      </v-col>
    </v-row>
    <v-btn color="success" @click="forTest">text</v-btn>
  </v-container>
</template>
<script>
export default {
  name: "answer-box",
  props: {
    nodes: String
  },
  data() {
    return {
      show: false,
      close: true,
      showChipChild: false,
      add_opinion: [],
      addDi: false,
      parentInputs: {
        id: "1",
        chain: {
          id: "0",
          text: "",
          replies: [
            {
              id: '',
              tetx: '',
              next: {
                id: '',
                text: 'sss',
                replies: []
              }
            }
          ], 
        },
      }
    };
  },
  methods: {
    uuidv4() {
      return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    recrisve() {
      this.show = true;
    },
    add() {
      this.showChipChild = true;
      this.parentInputs.chain.replies.push({
        id: "2",
        text: "",
        next: {
          text: this.nodes,
          id: this.uuidv4(),
          replies : [

          ]
        }
      });
    },
    remove(index) {
      this.inputs.splice(index, 1); // why is this removing only the last row?
    },
    showButtonDialog() {
      if (this.parentInputs.chain.text == "") {
        this.addDi = false;
      } else {
        this.addDi = true;
      }
    },
    forTest() {
      /*eslint-disable*/
      // var jsonQ = require("jsonq");

      // هلق بدو يسلخنا ايرورو
      // هي داتا
      var arr = this.parentInputs;
      var family = jsonQ(arr);
      //console.log(JSON.stringify(family));
      //to find all the husband
      var reply = family.find("replies", function() {
        return this;
      });
      let path_to_handel;

      reply.each(
        function(index, path, value) {
          for (const prop in value) {
            if (value[prop].id == "2") {
              ///path.push(prop);
              //path.push("replies");
              //this.path_to_handel = path
              value.map((ele) => {
                  ele.next= {
                  text: '',
                  id: this.uuidv4(),
                }
                ele.next.replies = []
              })
              console.log(value);
              
            }
          }
           
            

          return value
        }.bind(this)
      );
              //   this.handeld_value.map((ele) => {
              //   ele.next= {
              //     text: '',
              //     id: '',
              //   }
              //   ele.next.replies = []
              // })
            
      // console.log(this.path_to_handel);
      // var next = {
      //           "id": this.uuidv4(),
      //           "text": {
      //               "en": ""
      //           },
      //           "next": {
      //               "id": this.uuidv4(),
      //               "text": {
      //                   "en": ""
      //               },
      //               "replies": []
      //           },
      //           "selected": true
      //       }
      // family.pushPathValue(this.path_to_handel, next).refresh();
      // this.$store.state.parentInputs  = JSON.parse(family.getJson())
      // console.log(family.getJson());
    },
  },
  watch: {
    showButtonDialog() {
      if (this.parentInputs.chain.text == "") {
        this.addDi = false;
      } else {
        this.addDi = true;
      }
    },
  },
  created() {
    localStorage.setItem("test", JSON.stringify(this.parentInputs));
    // var jsonQ = require("jsonq");
    //   var family = jsonQ(this.parentInputs);
    //   console.log(family);
  },
  updated() {
    localStorage.setItem("test", JSON.stringify(this.parentInputs));
    console.log(JSON.stringify(this.parentInputs));
    
  },
};
</script>
<style lang="scss" scoped>
.text_filed {
  outline: none;
}
</style>

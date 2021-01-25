<template>
  <StackLayout class="bg-white bg-opacity-75 w-full px-2">
    <RadListView
      height="200"
      ref="listView"
      separatorColor="transparent"
      for="(item,index) in chat"
      class="py-1 px-2 w-full h-48"
    >
      <v-template>
        <FlexBoxLayout flexDirection="column" class="w-full">
          <Label
            :alignSelf="item.owner === userId ? 'flex-end' : 'flex-start'"
            textWrap="true"
            class="text-white mb-1 rounded p-1"
            :text="item.message"
            :class="checkMessageOwner(item.owner)"
          ></Label>
        </FlexBoxLayout>
      </v-template>
    </RadListView>

    <FlexBoxLayout>
      <TextField
        class="bg-gray-400 rounded-full w-full text-base px-8"
        hint="Type a message"
        v-model="message"
      >
        <Label
          :text="(fa - camera) | fonticon"
          class="fas"
          @tap="takePicture"
        ></Label>
      </TextField>
      <Button
        @tap="handleTap"
        class="w-24 ml-1 rounded-full bg-blue-700"
      ></Button>
    </FlexBoxLayout>
  </StackLayout>
</template>

<script>
import { isEqual } from "lodash-es";
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";

export default {
  props: ["swap", "userId"],

  data() {
    return {
      message: "",
      chat: [],
      chatInterval: null,
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
  },
  methods: {
    getChat() {
      if (this.swap && this.swap._id && this.userId) {
        this.$axios
          .get(`${this.$API}/swap/chat/${this.swap._id}/${this.userId}`, {
            headers: { Authorization: `bearer ${this.token}` },
          })
          .then((res) => {
            if (res.data.length > 0 && !isEqual(this.chat, res.data)) {
              this.chat = res.data;
              this.$refs.listView.scrollToIndex(20, false);
              this.$refs.listView.refresh();
            }
          })
          .then(() => {
            setTimeout(this.getChat, 2000);
          })
          .catch((error) => console.log("Unable to load chat:", error));
      } else {
        setTimeout(this.getChat, 2000);
      }
    },
    checkMessageOwner(owner) {
      return owner === this.userId ? "bg-blue-400 ml-20" : "bg-green-400 mr-20";
    },
    handleTap() {
      this.axios
        .put(
          `${this.$API}/swap/chat/${this.swap._id}/${this.userId}`,
          { message: this.message },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${this.token}`,
            },
          }
        )
        .then(() => (this.message = ""))
        .catch((error) => console.log("Unable to send Message:", error));
    },
    takePicture() {
      camera.takePicture().then((imageAsset) => {
        let image = new Image();
        image.src = imageAsset;
      });
    },
  },
  mounted() {
    this.getChat();
  },
};
</script>

<style>
.max-w-80per {
  max-width: 5rem;
}
</style>
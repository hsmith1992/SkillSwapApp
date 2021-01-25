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
import { takePicture, requestPermissions } from "nativescript-camera";

export default {
  props: ["swap", "userId"],

  data() {
    return {
      message: "",
      chat: [],
      chatInterval: null,
      cameraImage: null,
      labelText: "",
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
      that = this;

      requestPermissions().then(() => {
        takePicture().then(
          (imageAsset) => {
            this.cameraImage = imageAsset;
            imageAsset.getImageAsync(function (nativeImage) {
              let scale = 1;
              let actualWidth = 0;
              let actualHeight = 0;
              if (imageAsset.android) {
                // get the current density of the screen (dpi) and divide it by the default one to get the scale
                scale =
                  nativeImage.getDensity() /
                  android.util.DisplayMetrics.DENSITY_DEFAULT;
                actualWidth = nativeImage.getWidth();
                actualHeight = nativeImage.getHeight();
              } else {
                scale = nativeImage.scale;
                actualWidth = nativeImage.size.width * scale;
                actualHeight = nativeImage.size.height * scale;
              }
              that.labelText =
                `Displayed Size: ${actualWidth}x${actualHeight} with scale ${scale}\n` +
                `Image Size: ${Math.round(actualWidth / scale)}x${Math.round(
                  actualHeight / scale
                )}`;
              console.log(`${labelText}`);
            });
          },
          (err) => {
            console.log("Error -> " + err.message);
          }
        );
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
<template>
  <StackLayout class="bg-white bg-opacity-75 w-full px-2">
    <RadListView
      separatorColor="transparent"
      ref="listView"
      for="(item,index) in chat"
      class="py-1 px-2 w-full h-40"
    >
      <v-template>
        <FlexBoxLayout flexDirection="column" class="w-full">
          <Label
            :alignSelf="item.owner === userId ? 'flex-end' : 'flex-start'"
            textWrap="true"
            class="text-white mb-1 max-w-80per rounded p-1"
            :text="item.message"
            :class="checkMessageOwner(item.owner)"
          ></Label>
        </FlexBoxLayout>
      </v-template>
    </RadListView>
    <!-- </ScrollView> -->
    <FlexBoxLayout>
      <TextField
        class="bg-gray-400 rounded-full w-full text-base px-8"
        hint="Type a message"
        v-model="message"
      ></TextField>
      <Button
        @tap="handleTap"
        class="w-24 ml-1 rounded-full bg-blue-700"
      ></Button>
    </FlexBoxLayout>
  </StackLayout>
</template>

<script>
import Account from "../../views/user/Account.vue";
export default {
  components: { Account },
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
      fetch(`${this.$API}/swap/chat/${this.swap._id}/${this.userId}`, {
        headers: { Authorization: `bearer ${this.token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          this.chat = data;
          this.$refs.listView.scrollToIndex(5, false, ListViewItemSnapMode.End);
          this.$refs.listView.refresh();
        });
    },
    checkMessageOwner(owner) {
      return owner === this.userId ? "bg-blue-400" : "bg-green-400";
    },
    handleTap() {
      fetch(`${this.$API}/swap/chat/${this.swap._id}/${this.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${this.token}`,
        },
        body: JSON.stringify({
          message: this.message,
        }),
      })
        .then(() => (this.message = ""))
        .catch((error) => console.log("Unable to send Message:", error));
    },
  },
  mounted() {
    this.chatInterval = setInterval(() => this.getChat(), 1000);
  },
  beforeDestroy() {
    clearInterval(this.chatInterval);
  },
};
</script>

<style>
.max-w-80per {
  max-width: 5rem;
}
</style>
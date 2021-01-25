<template>
  <Page actionBarHidden="true">
    <ScrollView>
      <StackLayout>
        <FlexBoxLayout class="px-6 py-2" justifyContent="space-between">
          <StackLayout>
            <Image
              class="w-32 shadow"
              :src="`${$API}/user/profilePicture/${profile._id}`"
            ></Image>
            <Label
              class="text-center w-32 text-2xl text-white"
              :text="profile.firstname"
            ></Label>
          </StackLayout>
          <StackLayout>
            <Image
              v-if="counterpart"
              class="w-32"
              :src="`${$API}/user/profilePicture/${counterpart._id}`"
            ></Image>
            <Label
              class="text-center w-32 text-2xl text-white"
              :text="counterpart.firstname"
            ></Label>
          </StackLayout>
        </FlexBoxLayout>
        <chat :userId="user._id" :swap="swap"></chat>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { getProfile } from "@/utils/core";
import Chat from "@/components/swaps/Chat";

export default {
  components: {
    Chat,
  },
  //props: ["swapId"],
  data() {
    return {
      swapId: "60015a5b264db4315c37feb8", // This is temporary fixed
      getProfile,
      profile: {},
      counterpart: {},
      swap: {},
      refreshKey: 0,
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getCounterpart() {
      let counterpartId =
        this.swap.creator === this.profile._id
          ? this.swap.participant
          : this.swap.creator;
      this.$axios
        .get(`${this.$API}/user/public/${this.user._id}/${counterpartId}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((res) => {
          this.counterpart = res.data;
        })
        .catch((error) => console.log("Unable to load counterpart:", error));
    },
    getSwap() {
      return fetch(`${this.$API}/swap/read/${this.swapId}/${this.user._id}/`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          this.swap = data;
        })
        .catch((error) => console.log("Unable to load swap:", error));
    },
    refresh() {
      this.getSwap();
    },
  },
  mounted() {
    this.getSwap().then(() => this.getCounterpart());
    this.getProfile(this.user, this.token).then(
      (profile) => (this.profile = profile)
    );
  },
};
</script>

<style>
</style>
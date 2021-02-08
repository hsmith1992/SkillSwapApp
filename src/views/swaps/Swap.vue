<template>
  <Page actionBarHidden="true">
    <ScrollView>
      <StackLayout>
        <FlexBoxLayout class="px-6 py-2" justifyContent="space-around">
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
          <Image class="h-20" :src="logo"></Image>
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
        <detail-card class="mt-4" title="Offer">
          <offer
            class="pb-4"
            :swap="swap"
            :profile="profile"
            :counterpart="counterpart"
          ></offer>
        </detail-card>
        <chat class="mt-6" :userId="user._id" :swap="swap"></chat>
      </StackLayout>
      <Button @tap="testNav">Test</Button>
    </ScrollView>
  </Page>
</template>

<script>
import { getProfile } from "@/utils/core";
import Chat from "@/components/swaps/Chat";
import Offer from "@/components/swaps/Offer";
import DetailCard from "@/components/base/DetailCard.vue";
import Swaps from "@/views/swaps/Swap";

export default {
  components: {
    Chat,
    Offer,
    DetailCard,
    Swaps,
  },
  //props: ["swapId"],
  data() {
    return {
      logo: "~/assets/images/LogoNoText.png",
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
    testNav() {
      this.navigateTo(Swaps);
    },
    getCounterpart() {
      let counterpartId =
        this.swap.creator === this.profile._id
          ? this.swap.participant
          : this.swap.creator;
      this.$axios
        .get(`/user/public/${this.user._id}/${counterpartId}`, {
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
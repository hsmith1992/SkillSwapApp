<template>
  <Page actionBarHidden="true">
    <GridLayout v-if="loading" rows="*,auto,auto,*" columns="*">
      <ActivityIndicator
        height="200"
        width="200"
        row="1"
        column="1"
        :busy="loading"
      ></ActivityIndicator>
      <Label
        row="2"
        column="1"
        class="text-2xl text-center p-4"
        text="Loading Swap"
      ></Label>
    </GridLayout>
    <ScrollView v-else>
      <StackLayout>
        <Button @tap="navigateToSwaps" text="Back to Swaps"></Button>
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
    </ScrollView>
  </Page>
</template>

<script>
import { getProfile } from "@/utils/core";
import Chat from "@/components/swaps/Chat";
import Offer from "@/components/swaps/Offer";
import DetailCard from "@/components/base/DetailCard.vue";
import Swaps from "@/views/swaps/Swaps";

export default {
  components: {
    Chat,
    Offer,
    DetailCard,
    Swaps,
  },
  props: ["swapId"],
  data() {
    return {
      logo: "~/assets/images/LogoNoText.png",
      getProfile,
      profile: {},
      counterpart: {},
      swap: {},
      refreshKey: 0,
      loading: true,
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
    navigateToSwaps() {
      this.$navigateTo(Swaps, { frame: "swapTabFrame" });
    },
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
          return data;
        })
        .catch((error) => console.log("Unable to load swap:", error));
    },
    loaded() {
      console.log("loading callsed");
      if (
        this.profile &&
        this.profile._id &&
        this.counterpart &&
        this.counterpart._id &&
        this.swap
      ) {
        return (this.loading = false);
      } else {
        console.log("Gets to timeout");
        setTimeout(this.loaded, 1000);
      }
    },
    refresh() {
      this.getSwap();
    },
  },
  mounted() {
    this.getSwap()
      .then(() => this.getCounterpart())
      .then(() => this.loaded());
    this.getProfile(this.user, this.token).then(
      (profile) => (this.profile = profile)
    );
  },
};
</script>

<style>
</style>
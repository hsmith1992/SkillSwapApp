<template>
  <Page actionBarHidden="true">
    <BottomNavigation>
      <TabStrip>
        <TabStripItem>
          <Image src.decode="font://&#xf015;" class="fas text-xl"></Image>
          <Label text="Home"></Label>
        </TabStripItem>
        <TabStripItem>
          <Image src.decode="font://&#xf079;" class="fas text-xl"></Image>
          <Label text="Swaps"></Label>
        </TabStripItem>
        <TabStripItem>
          <Image src.decode="font://&#xf406;" class="fas text-xl"></Image>
          <Label text="Account"></Label>
        </TabStripItem>
        <TabStripItem>
          <Image src.decode="font://&#xf067;" class="fas text-xl"></Image>
          <Label text="Add"></Label>
        </TabStripItem>
      </TabStrip>

      <TabContentItem>
        <Frame id="homeTabFrame"> </Frame>
      </TabContentItem>

      <TabContentItem>
        <Frame id="swapTabFrame"> </Frame>
      </TabContentItem>

      <TabContentItem>
        <Frame id="accountTabFrame"> <account /> </Frame>
      </TabContentItem>
    </BottomNavigation>
  </Page>
</template>

<script>
import axios from "axios";
import Landing from "@/views/Landing";
import Account from "@/views/user/Account";

export default {
  components: {
    Account,
  },
  computed: {
    token() {
      return this.$state.auth.token;
    },
  },
  methods: {
    clearToken() {
      this.$store.commit("clearToken");
      this.$navigateTo(Landing);
    },
    redirectAccount() {
      this.$navigateTo(Account);
    },
  },
};
</script>

<style>
</style>
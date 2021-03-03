<template>
  <Page actionBarHidden="true">
    <BottomNavigation selectedIndex="2">
      <TabStrip class="nav text-light shadow">
        <TabStripItem class="nav-tab">
          <Image src.decode="font://&#xf015;" class="fas text-xl"></Image>
          <Label text="Home"></Label>
        </TabStripItem>
        <TabStripItem class="nav-tab">
          <Image src.decode="font://&#xf079;" class="fas text-xl"></Image>
          <Label text="Swaps"></Label>
        </TabStripItem>
        <TabStripItem class="nav-tab">
          <Image src.decode="font://&#xf406;" class="fas text-xl"></Image>
          <Label text="Account"></Label>
        </TabStripItem>
        <TabStripItem class="nav-tab">
          <Image src.decode="font://&#xf067;" class="fas text-xl"></Image>
          <Label text="Add"></Label>
        </TabStripItem>
      </TabStrip>

      <TabContentItem>
        <Frame id="homeTabFrame">
          <Page><Button @tap="clearToken" text="Sign Out"></Button></Page>
        </Frame>
      </TabContentItem>

      <TabContentItem>
        <Frame id="swapTabFrame"> <swaps /></Frame>
      </TabContentItem>

      <TabContentItem>
        <Frame id="accountTabFrame"> <account /> </Frame>
      </TabContentItem>
      <TabContentItem>
        <Frame id="addTabFrame"> <account /> </Frame>
      </TabContentItem>
    </BottomNavigation>
  </Page>
</template>

<script>
import Landing from "@/views/Landing";
import Account from "@/views/user/Account";
import Swaps from "@/views/swaps/Swaps";

export default {
  components: {
    Account,
    Swaps,
  },
  data() {
    return {
      selectedView: 1,
    };
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
  },
};
</script>

<style>
</style>
<template>
  <StackLayout>
    <Label :text="title"></Label>
    <Label v-if="swaps.length < 1" text="No Swaps"></Label>
    <RadListView
      v-else
      height="200"
      ref="swapList"
      separatorColor="transparent"
      for="(swap,index) in swaps"
      class="py-1 px-2 w-full h-48"
    >
      <v-template>
        <FlexboxLayout @tap="handleTap(swap._id)">
          <Label :text="swap.title"></Label>
          <Label :text="swap.timestamp"></Label>
        </FlexboxLayout>
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script>
import Swap from "@/views/swaps/Swap.vue";

export default {
  components: { Swap },
  props: ["swaps", "title"],
  methods: {
    handleTap(swapId) {
      console.log("swapId");
      this.$navigateTo(Swap, {
        frame: "swapTabFrame",
        props: { swapId },
        transition: {
          name: "slideLeft",
          duration: 300,
          curve: "easeIn",
        },
      });
    },
  },
  mounted() {
    console.log(this.swaps);
  },
};
</script>

<style>
</style>
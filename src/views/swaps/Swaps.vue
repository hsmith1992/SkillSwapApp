<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <swap-list title="Negotiating" :swaps="negotiating"></swap-list>
      <swap-list title="Agreed" :swaps="agreed"></swap-list>
      <swap-list title="Complete" :swaps="completed"></swap-list>
    </StackLayout>
  </Page>
</template>

<script>
import SwapList from "@/components/swaps/SwapList";

export default {
  components: { SwapList },
  data() {
    return {
      swaps: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    token() {
      return this.$store.state.auth.token;
    },
    completed() {
      return this.swaps.filter((swap) => swap.status.value === 2);
    },
    negotiating() {
      return this.swaps.filter((swap) => swap.status.value === 0);
    },
    agreed() {
      return this.swaps.filter((swap) => swap.status.value === 1);
    },
  },
  methods: {
    getSwaps() {
      this.$axios
        .get(`${this.$API}/swaps/${this.user._id}`, {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.swaps = res.data;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getSwaps();
  },
};
</script>

<style>
</style>
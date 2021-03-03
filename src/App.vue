<template>
  <Page></Page>
</template>

<script>
import Landing from "@/views/Landing.vue";
import Home from "@/views/Home";
export default {
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
  },
  mounted() {
    this.$store.commit("loadFromStorage");
    this.token ? this.$navigateTo(Home) : this.$navigateTo(Landing);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap");
</style>
<template>
  <detail-card title="Details">
    <StackLayout class="mx-4">
      <Label text="About Me"></Label>
      <Label class="text-sm" :text="about"></Label>
      <Label text="Address"></Label>
      <Label class="text-sm" :text="readableAddress" textWrap="true"></Label>
    </StackLayout>
  </detail-card>
</template>

<script>
import DetailCard from "@/components/base/DetailCard.vue";

export default {
  components: { DetailCard },
  props: ["profile"],
  computed: {
    readableAddress() {
      if (this.profile && this.profile.address) {
        let { houseNo, street, town, area, postcode } = this.profile.address;
        return `${houseNo}, ${street}, ${town}, ${area}, ${postcode}`;
      } else {
        return;
      }
    },
    about() {
      return this.profile && this.profile.about ? this.profile.about : "";
    },
  },
};
</script>

<style>
</style>
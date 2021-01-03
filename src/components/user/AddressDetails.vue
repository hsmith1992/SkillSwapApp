<template>
  <detail-card title="Details">
    <StackLayout>
      <Label
        class="text-sm ml-4"
        :text="readableAddress"
        textWrap="true"
      ></Label>
    </StackLayout>
  </detail-card>
</template>

<script>
import DetailCard from "../DetailCard.vue";

export default {
  components: { DetailCard },
  props: ["address"],
  computed: {
    readableAddress() {
      if (this.address) {
        let { houseNo, street, town, area, postcode } = this.address;
        return `${houseNo}, ${street}, ${town}, ${area}, ${postcode}`;
      } else {
        return;
      }
      return a;
    },
  },
};
</script>

<style>
</style>
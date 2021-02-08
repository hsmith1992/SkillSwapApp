<template>
  <StackLayout>
    <GridLayout class="text-lg text-default" columns="*,*" rows="auto">
      <StackLayout class="border-r px-2" column="0" row="0">
        <GridLayout
          columns="2*,*,*"
          rows="auto"
          v-for="(item, key) in userItems"
          :key="key"
        >
          <Label column="0" :row="key" :text="item.name"></Label>
          <Label column="1" :row="key" :text="item.quantity"></Label>
          <Label column="2" :row="key" :text="item.unit"></Label>
        </GridLayout>
      </StackLayout>
      <StackLayout class="border-l px-2" column="1" row="0">
        <GridLayout
          columns="2*,*,*"
          rows="auto"
          v-for="(item, key) in counterpartItems"
          :key="key"
        >
          <Label column="0" :row="key" :text="item.name"></Label>
          <Label column="1" :row="key" :text="item.quantity"></Label>
          <Label column="2" :row="key" :text="item.unit"></Label>
        </GridLayout>
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  props: ["swap", "profile", "counterpart"],
  data() {
    return {};
  },
  computed: {
    userItems() {
      if (this.swap && this.swap.swapOffer) {
        return this.swap.swapOffer.filter(
          (item) => item.owner === this.profile._id
        );
      } else {
        return;
      }
    },
    counterpartItems() {
      if (this.swap && this.swap.swapOffer) {
        return this.swap.swapOffer.filter(
          (item) => item.owner === this.counterpart._id
        );
      } else {
        return;
      }
    },
  },
};
</script>

<style>
</style>
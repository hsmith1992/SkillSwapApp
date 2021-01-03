<template>
  <StackLayout
    class="text-default bg-white bg-opacity-75 shadow-inner px-6 text-xl"
  >
    <FlexboxLayout class="py-2 mb-4" justifyContent="space-between">
      <Label
        class="text-2xl border-b-2 w-full border-black"
        text="Interests"
      ></Label>
      <Label
        class="font-bold text-2xl"
        @tap="showInterestsModal"
        text="+"
      ></Label>
    </FlexboxLayout>
    <FlexboxLayout class="mb-4" flexWrap="wrap">
      <Label
        class="bg-white p-1 m-1 shadow text-sm rounded border-black border"
        v-for="(interest, key) in interests"
        :key="key"
        :text="interest"
      ></Label>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
export default {
  props: ["interests"],
  methods: {
    showInterestsModal() {},
  },
};
</script>

<style>
</style>
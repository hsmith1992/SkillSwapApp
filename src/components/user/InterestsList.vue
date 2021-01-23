<template>
  <StackLayout class="text-default card shadow-inner px-6 text-xl">
    <FlexboxLayout
      class="py-2 mb-4 w-full border-b-2 border-black"
      justifyContent="space-between"
      alignItems="center"
    >
      <Label class="text-2xl" text="My Interests"></Label>
      <Label
        v-if="!editInterests"
        class="font-bold text-lg fas"
        @tap="editInterests = true"
        :text="'fa-edit' | fonticon"
      ></Label>
      <Label
        v-if="editInterests"
        class="font-bold text-lg"
        @tap="editInterests = false"
        text="X"
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
  data() {
    return {
      editInterests: false,
    }
  },
  methods: {
    showInterestsModal() {},
  },
};
</script>

<style>
</style>
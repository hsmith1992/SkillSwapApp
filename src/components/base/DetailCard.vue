<template>
  <StackLayout class="text-default card shadow-inner px-2 text-xl">
    <Label
      class="text-2xl mx-4 border-b-2 border-black py-2 mb-4"
      :text="title"
    ></Label>

    <slot></slot>
  </StackLayout>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style>
</style>
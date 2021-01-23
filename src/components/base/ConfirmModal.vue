<template>
  <StackLayout
    class="bg-white px-10 w-3/4 text-black"
    shownModally="onShownModally"
  >
    <Label
      class="mt-10 text-lg text-center"
      :text="text"
      textWrap="true"
    ></Label>
    <FlexboxLayout class="mb-10">
      <Button
        text="Yes"
        @tap="
          confirm = true;
          $modal.close(confirm);
        "
      />
      <Button text="No" @tap="$modal.close(confirm)" />
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      confirm: false,
    };
  },
};
</script>

<style>
</style>e
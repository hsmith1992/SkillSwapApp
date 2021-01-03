<template>
  <StackLayout class="bg-white px-10 text-black" shownModally="onShownModally">
    <Label class="mt-10" text="This modal is working"></Label>
    <Button text="Close Modal" @tap="$modal.close()" />
    <Label text="This modal is working"></Label>
    <Label text="This modal is working"></Label>
    <Label text="This modal is working"></Label>
    <Label text="This modal is working"></Label>
  </StackLayout>
</template>

<script>
export default {};
</script>

<style>
</style>
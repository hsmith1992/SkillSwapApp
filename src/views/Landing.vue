<template>
  <Page>
    <GridLayout columns="*" rows="*">
      <Label col="0" row="1" class="message" text="Test" />
      <Image col="0" row="0" :src="src" stretch="aspectFit"></Image>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      src: "~/assets/images/Logo.png",
    };
  },
};
</script>

<style>
</style>
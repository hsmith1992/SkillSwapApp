<template>
  <BottomNavigation>
    <TabStrip>
      <TabStripItem>
        <Image src="font://&#xf015;" class="fas text-xl"></Image>
        <Label text="Home"></Label>
      </TabStripItem>
      <TabStripItem>
        <Image
          :src="'font://' + ('fa-retweet' | fonticon)"
          class="fas text-xl"
        ></Image>
        <Label text="Swaps"></Label>
      </TabStripItem>
      <TabStripItem>
        <Image
          :src="'font://' + ('fa-user' | fonticon)"
          class="far text-xl"
        ></Image>
        <Label text="Account"></Label>
      </TabStripItem>
      <TabStripItem>
        <Image
          :src="'font://' + ('fa-plus' | fonticon)"
          class="fas text-xl"
        ></Image>
        <Label text="Add"></Label>
      </TabStripItem>
    </TabStrip>
  </BottomNavigation>
</template>

<script>
export default {};
</script>

<style>
</style>
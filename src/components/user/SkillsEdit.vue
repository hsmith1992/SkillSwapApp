<template>
  <StackLayout
    class="bg-white px-10 py-10 w-3/4 text-black h-72"
    shownModally="onShownModally"
  >
    <SearchBar
      v-if="!showLevel"
      class="mt-10"
      v-model="searchQuery"
      hint="Find a skill.."
      @textChange="onTextChange"
      @submit="onSubmit"
    ></SearchBar>
    <ScrollView
      orientation="vertical"
      v-if="!showLevel"
      class="my-4 w-full h-64"
    >
      <StackLayout class="w-full">
        <Label
          class="text-lg"
          v-for="(result, key) in searchResults"
          :text="result.name"
          :key="key"
          @tap="onResultClick(result.name)"
        ></Label
      ></StackLayout>
    </ScrollView>

    <Label
      v-if="showLevel"
      class="text-lg mt-10 px-2"
      text="Select Level"
    ></Label>
    <StackLayout v-if="showLevel" class="h-48 my-4 px-2 w-full">
      <Label
        class="text-lg"
        v-for="(level, key) in levels"
        :text="level.name"
        :key="key"
        :class="{ 'bg-gray-200': level.value === skillLevel }"
        @tap="onLevelClick(level.value)"
      ></Label>
    </StackLayout>
    <Button v-if="showSubmit" text="Submit" @tap="onSubmit" />
    <Button text="Cancel" @tap="$modal.close()" />
  </StackLayout>
</template>

<script>
import { getSkills, addSkill } from "@/utils/core";
import Fuse from "fuse.js";

export default {
  data() {
    return {
      getSkills,
      addSkill,
      searchQuery: "",
      searchResults: [],
      skillsList: [],
      newSkill: null,
      skillLevel: null,
      showLevel: false,
      showSubmit: false,
      levels: [
        { name: "Novice", value: 1 },
        { name: "Intermediate", value: 2 },
        { name: "Advanced", value: 3 },
        { name: "Expert", value: 4 },
      ],
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    onTextChange() {
      if (this.skillsList) {
        this.searchResults = [];
        fetch(
          `https://api.datamuse.com/words?ml=${encodeURIComponent(
            this.searchQuery
          )}`
        )
          .then((res) => res.json())
          .then((data) => data.map((item) => item.word))
          .then((words) => {
            this.searchResults.push(
              ...this.skillsList.filter((skill) =>
                words.includes(skill.name.toLowerCase())
              )
            );
          })
          .then(() => {
            this.searchResults.push(
              ...this.skillsList.filter((skill) =>
                skill.name.includes(this.searchQuery.toLowerCase())
              )
            );
          })
          .catch((err) => console.log("Unable to find skills:", err));
      }
    },
    onSubmit() {
      let skillId = this.skillsList.find((s) => s.name === this.newSkill)._id;
      this.addSkill(
        this.user._id,
        this.token,
        skillId,
        this.skillLevel
      ).then(() => this.$modal.close());
    },
    onResultClick(skill) {
      this.newSkill = skill;
      this.showLevel = true;
    },
    onLevelClick(level) {
      this.skillLevel = level;
      this.showSubmit = true;
    },
  },
  mounted() {
    this.getSkills()
      .then((skills) => (this.skillsList = skills))
      .then(() => this.onTextChange());
  },
};
</script>

<style>
</style>
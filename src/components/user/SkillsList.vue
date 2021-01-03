<template>
  <StackLayout
    class="text-default bg-white bg-opacity-75 shadow-inner px-6 text-xl"
  >
    <FlexboxLayout
      class="py-2 mb-4 w-full border-b-2 border-black"
      justifyContent="space-between"
    >
      <Label class="text-2xl" text="Skills"></Label>
      <Label class="font-bold text-2xl" @tap="showSkillsModal" text="+"></Label>
    </FlexboxLayout>

    <Label class="h-full" v-if="!skills" text="Add Skills"></Label>
    <FlexboxLayout v-else flexWrap="wrap" class="w-full">
      <skill-gauge
        class="w-1/3 mb-1"
        v-for="(skill, key) in skills"
        :key="key"
        :skill="skill"
      ></skill-gauge>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import SkillsEdit from "@/components/user/SkillsEdit.vue";
import SkillGauge from "@/components/user/SkillGauge2.vue";
import { readSkill } from "@/utils/core";

export default {
  props: ["profile"],
  components: { SkillsEdit, SkillGauge },
  data() {
    return {};
  },
  computed: {
    skills() {
      //
      console.log("Skills", this.profile.skills);
      if (this.profile && this.profile.skills) {
        this.profile.skills.map((skill) => {
          let detail = this.readSkill(skill.skillId);
          return {
            name: detail.name,
            completed: skill.completed,
            level: skill.level,
          };
        });
      } else {
        return;
      }
    },
  },
  methods: {
    showSkillsModal() {
      this.$showModal(SkillsEdit);
    },
  },
};
</script>

<style>
</style>
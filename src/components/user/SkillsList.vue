<template>
  <StackLayout class="text-default card shadow-inner px-6 text-xl">
    <FlexboxLayout
      class="py-2 mb-4 w-full border-b-2 border-black"
      justifyContent="space-between"
      alignItems="center"
    >
      <Label class="text-2xl" text="My Skills"></Label>
      <Label
        v-if="!editSkills"
        class="font-bold text-lg fas"
        @tap="editSkills = true"
        :text="'fa-edit' | fonticon"
      ></Label>
      <Label
        v-if="editSkills"
        class="font-bold text-lg fa fas"
        @tap="editSkills = false"
        :text="'fa-cross' | fonticon"
      ></Label>
    </FlexboxLayout>

    <FlexboxLayout
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      class="w-1/3 mb-1"
      v-if="!skills"
      @tap="showSkillsModal"
    >
      <Label class="text-3xl w-full text-center font-bold" text="+"></Label>
      <Label class="text-lg w-full text-center" text="Add Skill"></Label>
    </FlexboxLayout>
    <FlexboxLayout v-else justifyContent="center" class="w-full">
      <FlexboxLayout :key="refreshKey" flexWrap="wrap">
        <skill-gauge
          class="w-1/3 mb-1"
          v-for="(skill, key) in skills"
          :key="key"
          :refresh="refresh"
          :skill="skill"
          :edit="editSkills"
        ></skill-gauge>
        <FlexboxLayout
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          class="w-1/3 mb-1"
          v-if="editSkills"
          @tap="showSkillsModal"
        >
          <Label class="text-3xl w-full text-center font-bold" text="+"></Label>
          <Label class="text-lg w-full text-center" text="Add Skill"></Label>
        </FlexboxLayout>
      </FlexboxLayout>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
import SkillsEdit from "@/components/user/SkillsEdit.vue";
import SkillGauge from "@/components/user/SkillGauge2.vue";
import { API } from "@/config";

export default {
  props: ["profile", "refresh"],
  components: { SkillsEdit, SkillGauge },
  data() {
    return {
      API: API,
      skillsList: [],
      editSkills: false,
      refreshKey: 0,
    };
  },
  computed: {
    skills() {
      this.refreshKey++;
      if (this.profile && this.profile.skills && this.skillsList.length > 0) {
        return this.profile.skills.map((s) => {
          return {
            _id: s.skill._id,
            name: s.skill.name,
            completed: s.completed,
            level: s.level,
          };
        });
      } else {
        return;
      }
    },
  },
  methods: {
    showSkillsModal() {
      this.$showModal(SkillsEdit)
        .then(() => this.refresh())
        .then(() => (this.editSkills = false));
    },
    fetchSkills() {
      fetch(`${this.API}/skills`)
        .then((res) => res.json())
        .then((data) => (this.skillsList = data))
        .catch((error) => `Unable to load skills: ${error}`);
    },
  },
  mounted() {
    this.fetchSkills();
  },
};
</script>

<style>
</style>
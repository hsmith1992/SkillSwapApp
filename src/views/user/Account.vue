<template>
  <Page actionBarHidden="true">
    <ScrollView>
      <StackLayout>
        <FlexboxLayout v-if="profile" alignItems="center" class="px-4 py-2">
          <Image
            class="h-40"
            :src="`${API}/user/profilePicture/${user._id}`"
            strech="none"
          ></Image>
          <FlexBoxLayout class="ml-4" flexDirection="column">
            <Label
              class="text-3xl text-white"
              :text="`${profile.firstname} ${profile.secondname}`"
            ></Label>
            <Label class="text-xl text-white" :text="location"></Label>
            <FlexboxLayout class="pt-2" alignItems="center">
              <StarRating :value="rating" size="75" />
              <Label
                class="ml-4 text-lg text-white"
                :text="rating"
                textWrap="true"
              />
            </FlexboxLayout>
          </FlexBoxLayout>
        </FlexboxLayout>
        <FlexboxLayout
          class="px-20 text-default"
          justifyContent="space-between"
        >
          <StackLayout>
            <Label
              horizontalAlignment="center"
              class="text-lg"
              text="Swaps"
            ></Label>
            <Label
              horizontalAlignment="center"
              :text="'fa-retweet' | fonticon"
              class="fas text-2xl"
            />
            <Label
              horizontalAlignment="center"
              class="text-xl"
              text="5"
            ></Label>
          </StackLayout>
          <StackLayout>
            <Label
              class="text-lg"
              horizontalAlignment="center"
              text="Views"
            ></Label>
            <Label
              horizontalAlignment="center"
              class="fas text-2xl"
              :text="'fa-eye' | fonticon"
            />
            <Label
              class="text-lg"
              horizontalAlignment="center"
              text="500"
            ></Label>
          </StackLayout>
          <StackLayout>
            <Label
              class="text-lg"
              horizontalAlignment="center"
              text="Followers"
            ></Label>
            <Label
              horizontalAlignment="center"
              class="fas text-2xl"
              :text="'fa-user-friends' | fonticon"
            />
            <Label
              class="text-lg"
              horizontalAlignment="center"
              text="24"
            ></Label>
          </StackLayout>
        </FlexboxLayout>
        <skills-list
          class="mt-2"
          :refresh="refreshProfile"
          :profile="profile"
        ></skills-list>
        <interests-list
          class="mt-2"
          :interests="profile.interests"
        ></interests-list>
        <details class="mt-2 mb-12" :profile="profile"></details>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { API } from "@/config";
import axios from "axios";
import SkillsList from "@/components/user/SkillsList.vue";
import InterestsList from "@/components/user/InterestsList.vue";
import Details from "@/components/user/Details.vue";
import { getProfile } from "@/utils/core";

export default {
  components: { SkillsList, InterestsList, Details },
  data() {
    return {
      API: API,
      rating: 4.2,
      profile: {},
      getProfile,
      loading: {
        profile: true,
      },
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
    user() {
      return this.$store.state.auth.user;
    },
    location() {
      if (this.profile && this.profile.address) {
        return `${this.capitalizeFirstLetter(
          this.profile.address.town
        )}, ${this.capitalizeFirstLetter(this.profile.address.area)}`;
      } else {
        return;
      }
    },
  },
  methods: {
    refreshProfile() {
      this.getProfile(this.user, this.profile).then((profile) => {
        this.profile = profile;
      });
    },
  },
  mounted() {
    this.getProfile(this.user, this.token).then((profile) => {
      this.profile = profile;
    });
  },
};
</script>

<style>
</style>
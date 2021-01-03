<template>
  <Page actionBarHidden="true">
    <ScrollView>
      <StackLayout>
        <FlexboxLayout v-if="profile" alignItems="center" class="px-4 py-4">
          <Image
            class="h-40"
            :src="`${API}/user/profilePicture/${user._id}`"
            strech="none"
          ></Image>
          <FlexBoxLayout class="ml-4" flexDirection="column">
            <Label
              class="text-3xl font-bold text-white"
              :text="`${profile.firstname} ${profile.secondname}`"
            ></Label>
            <Label class="text-xl text-white" text="Earlsfield, London"></Label>
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
        <FlexboxLayout class="px-20 text-black" justifyContent="space-between">
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
        <skills-list class="mt-8" :profile="profile"></skills-list>
        <interests-list
          class="mt-8"
          :interests="profile.interests"
        ></interests-list>
        <address-details
          class="mt-8"
          :address="profile.address"
        ></address-details>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { API } from "@/config";
import axios from "axios";
import SkillsList from "@/components/user/SkillsList.vue";
import InterestsList from "../../components/user/InterestsList.vue";
import AddressDetails from "../../components/user/AddressDetails.vue";

export default {
  components: { SkillsList, InterestsList, AddressDetails },
  data() {
    return {
      API: API,
      rating: 4.2,
      profile: {},
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
  },
  methods: {
    getProfile() {
      this.loading.profile = true;
      axios
        .get(`${API}/user/${this.user._id}`, {
          headers: { Authorization: `bearer ${this.token}` },
        })
        .then((res) => {
          this.profile = res.data;
        })
        .catch((error) => {
          console.log(`Unable to load profile: ${error}`);
        });
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>

<style>
</style>
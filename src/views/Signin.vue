<template>
  <Page>
    <GridLayout columns="*" rows="250,60,60,60,60,30,30">
      <Image class="landing-logo my-12" col="0" row="0" :src="Logo"></Image>
      <TextField
        class="input-signup"
        hint="Email..."
        v-model="email"
        col="0"
        row="1"
        autocapitalizationType="none"
      ></TextField>
      <TextField
        class="input-signup"
        secure="True"
        hint="Password..."
        col="0"
        row="2"
        v-model="password"
      ></TextField>
      <Button
        class="button-signup bg-orange-500 w-48"
        text="Sign In"
        col="0"
        row="3"
        @tap="handleSignin"
      ></Button>
      <Label
        class="text-center align-center text-lg"
        col="0"
        row="4"
        text="Create an Account?"
      ></Label>

      <Label
        class="text-center align-center text-lg underline text-blue-800"
        col="0"
        row="5"
        text="Sign up"
        @tap="redirectSignup"
      ></Label>
    </GridLayout>
  </Page>
</template>

<script>
import { API } from "@/config";
import Signup from "@/views/Landing";
import store from "@/store";
import Home from "@/views/Home";

export default {
  data() {
    return {
      Logo: "~/assets/images/Logo.png",
      email: "",
      password: "",
      loading: false,
      error: "",
      api: API,
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
  },
  methods: {
    handleSignin() {
      store
        .dispatch("signin", {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          if (data.error) {
            this.error = data.error;
            this.loading = false;
          } else {
            this.$navigateTo(Home);
          }
        });
    },
    redirectSignup() {
      this.$navigateTo(Signup);
    },
  },
};
</script>

<style>
</style>
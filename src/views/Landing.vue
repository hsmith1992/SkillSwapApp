<template>
  <Page>
    <GridLayout columns="*" rows="250,60,60,60,60,60,30,30,30">
      <Image class="landing-logo my-12" col="0" row="0" :src="Logo"></Image>
      <TextField
        class="input-signup"
        hint="Firstname..."
        v-model="firstname"
        col="0"
        row="1"
      ></TextField>
      <TextField
        class="input-signup"
        hint="Lastname..."
        v-model="secondname"
        col="0"
        row="2"
      ></TextField>
      <TextField
        class="input-signup"
        hint="Email..."
        v-model="email"
        col="0"
        row="3"
      ></TextField>
      <TextField
        class="input-signup"
        secure="True"
        hint="Password..."
        col="0"
        row="4"
        v-model="password"
      ></TextField>
      <Button
        class="button-signup bg-orange-500 w-48"
        text="Sign Up"
        col="0"
        row="5"
        @tap="handleSignup"
      ></Button>
      <Label
        class="text-center align-center text-lg"
        col="0"
        row="6"
        text="Already a member?"
      ></Label>

      <Label
        class="text-center align-center text-lg underline text-blue-800"
        col="0"
        row="7"
        text="Sign In"
        @tap="redirectSignIn"
      ></Label>
    </GridLayout>
  </Page>
</template>

<script>
import Signin from "@/views/Signin";
import { signup } from "@/utils/auth";
import Home from "@/views/Home";
//import store from "@/store";

export default {
  data() {
    return {
      Logo: "~/assets/images/Logo.png",
      email: "",
      password: "",
      firstname: "",
      secondname: "",
      password: "",
      error: "",
    };
  },
  computed: {
    token() {
      return this.$store.state.auth.token;
    },
  },
  methods: {
    redirectSignIn() {
      this.$navigateTo(Signin);
    },
    handleSignup() {
      signup({
        firstname: this.firstname,
        secondname: this.secondname,
        email: this.email,
        password: this.password,
      }).then((data) => {
        if (data.error) {
          this.error = data.error;
        } else {
          this.firstname = "";
          this.email = "";
          this.password = "";
          this.error = "";
        }
      });
    },
  },
  mounted() {
    this.$store.commit("loadFromStorage");
    if (this.token) {
      this.$navigateTo(Home);
    }
  },
};
</script>

<style>
.landing-logo {
  margin: 20px 0px;
}

.input-signup {
  width: 80%;
}

.button-signup {
  color: #ffffff;
}
</style>
<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <h1 class="text-2xl font-bold sm:text-3xl">Login</h1>
    </div>

    <form @submit="api_login" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div>
        <div class="relative">
          <input
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter username"
            name="username"
            id="username"
            v-model="username"
            autocomplete="username"
          />
        </div>
      </div>

      <div>
        <div class="relative">
          <input
            type="password"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            name="password"
            id="password"
            autocomplete="current-password"
            v-model="password"
          />
        </div>
      </div>
      <Alert
        v-if="error"
        msg="Your password is in correct or this account is doesn't exist."
      />
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          No account?
          <a class="underline" href="/signup">Sign up</a>
        </p>

        <button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
import Alert from "@/components/Alert.vue";
export default {
  name: "LoginPage",
  data: () => {
    return {
      username: "",
      password: "",
      error: false,
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    async api_login(e) {
      e.preventDefault();
      try {
        const resposne = await axios.post("http://localhost:3001/login", {
          username: this.username,
          password: this.password,
        });
        const globalData = await axios.get("http://localhost:3001/globalData");
        this.$store.commit("setUser", globalData.data);
        this.$router.push({ path: '/', replace: true })
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
  },
  components: { Alert },
};
</script>

<template>
<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-lg text-center">
    <h1 class="text-2xl font-bold sm:text-3xl">Get started today!</h1>

    <p class="mt-4 text-gray-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
      eaque error neque ipsa culpa autem, at itaque nostrum!
    </p>
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
    <Alert v-if="error" msg="Your password is in correct or this account is doesn't exist."/>
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
import { mapMutations, mapGetters } from "vuex";
import axios from 'axios';
import Alert from './Alert.vue';
    export default{
    name: "LoginPage",
    data: () => {
        return {
            username: '',
            password: '',
            error: false
        };
    },
    methods: {
        ...mapMutations(["setUser", "setToken"]),
        async api_login(e) {
            e.preventDefault();
            try {
                const resposne = await fetch('http://localhost:3001/login', {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                })
                const msg = await resposne.json();
                console.log(msg);
                const { user, token } = msg
                this.$router.push("/");
                this.setUser(user);
                this.setToken(token);
            }
            catch (err) {
                this.error = true;
                alert(err)
                console.log(err)
            }
        }
    },
    components: { Alert }
}
</script>
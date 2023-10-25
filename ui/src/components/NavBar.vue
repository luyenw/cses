<template>
  <header class="bg-white">
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b"
    >
      <router-link to="/">
        <a class="block text-teal-600">
          <span class="sr-only">Home</span>
          <img
            class="w-8"
            src="https://upload.wikimedia.org/wikipedia/vi/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg"
          />
        </a>
      </router-link>
      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" class="hidden md:block">
          <ul class="flex items-center gap-6 text-l">
            <li>
              <router-link to="/">
                <a class="text-black-700 transition hover:text-black-700/75">
                  Problem Set
                </a>
              </router-link>
            </li>

            <li>
              <router-link to="/">
                <a class="text-black-700 transition hover:text-black-700/75">
                  Contest
                </a>
              </router-link>
            </li>

            <li>
              <router-link to="/lms">
                <a class="text-black-700 transition hover:text-black-700/75">
                  LMS
                </a>
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-4">
          <div v-if="!user" class="sm:flex sm:gap-4">
            <router-link to="/login">
              <a
                class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                href="/"
              >
                Login
              </a>
            </router-link>

            <router-link to="/signup">
              <a
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
              >
                Register
              </a>
            </router-link>
          </div>
          <div v-else class="sm:flex sm:gap-4 items-center">
            <nav-bar-dropdown :data="user"></nav-bar-dropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import axios from "axios";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { mapGetters, useStore } from "vuex";
import NavBarDropdown from "./NavBarDropdown.vue";
export default {
  name: "NavBar",
  setup() {
    const store = useStore();
    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3001/globalData");
        console.log(response.status);
        if (response.data.msg?.name == "JsonWebTokenError") {
          store.commit("setUser", null);
        } else store.commit("setUser", response.data);
      } catch (err) {
        console.log(err + "tainavbar");
      }
      initFlowbite();
    });
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    toggle_show_replies() {
      this.show = !this.show;
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  components: { NavBarDropdown },
};
</script>

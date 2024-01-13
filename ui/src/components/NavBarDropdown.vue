<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="relative inline-block text-left z-50">
      <img
        id="dropdown-button"
        class="w-8 h-8 rounded-full ring-2 ring-sky-300 hover:cursor-pointer"
        :src="data.imgUrl"
        alt="Bordered avatar"
      />
      <div
        id="dropdown-menu"
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      >
        <div
          class="py-2 p-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-button"
        >
          <router-link :to="'/users/' + data.id">
            <a
              class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              {{ data?.name }}
            </a>
          </router-link>
          <router-link to="/">
            <a
              @click="signout"
              class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
            >
              Signout
            </a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
export default {
  name: "NavBarDropdown",
  setup() {
    let isDropdownOpen = false;
    onMounted(async () => {
      const dropdownButton = document.getElementById("dropdown-button");
      const dropdownMenu = document.getElementById("dropdown-menu");
      if (dropdownMenu) {
        dropdownMenu.classList.add("hidden");

        function toggleDropdown() {
          isDropdownOpen = !isDropdownOpen;
          if (isDropdownOpen) {
            dropdownMenu.classList.remove("hidden");
          } else {
            dropdownMenu.classList.add("hidden");
          }
        }
        // toggleDropdown();
        dropdownButton.addEventListener("click", toggleDropdown);
        window.addEventListener("click", (event) => {
          if (
            !dropdownButton.contains(event.target) &&
            !dropdownMenu.contains(event.target)
          ) {
            dropdownMenu.classList.add("hidden");
            isDropdownOpen = false;
          }
        });
      }
    });
    const store = useStore();
    const router = useRouter();
    return {
      signout: () => {
        store.commit("setUser", null);
        const apiUrl = process.env.VUE_APP_API_URL;
        document.cookie =
          "access_token=; expires=" + new Date() + `; domain=${apiUrl};Path=/`;
        router.push("/login");
      },
    };
  },
  props: {
    hidden: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

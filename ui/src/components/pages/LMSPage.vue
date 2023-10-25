<template>
  <div class="flex flex-row-reverse px-4 py-2">
    <button
      id="createButton"
      class="bg-white hover:bg-gray-100 text-sm font-semibold py-1 px-4 border border-gray-300 rounded shadow-sm transition hover:shadow-md"
    >
      Join or create a team
    </button>
  </div>
  <div class="grid lg:grid-cols-4 gap-4 px-4 md:grid-cols-1">
    <div v-for="item in courses">
      <ClassCard :data="item" />
    </div>
  </div>
  <!-- popup -->
  <div
    id="class_modal"
    class="relative w-1/2 hidden rounded border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
    role="alert"
  >
    <p class="font-medium sm:text-lg">Create your team</p>
    <form @submit="api_login" class="mb-0 max-w-md space-y-4">
      <div>
        <div class="relative">
          <input
            class="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Team name"
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
            class="w-full border rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Let people know that what this team is about"
            name="password"
            id="password"
            autocomplete="current-password"
            v-model="password"
          />
        </div>
      </div>
      <div class="flex items-center justify-between">
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
import { onMounted, ref } from "vue";
import ClassCard from "../ClassCard.vue";
import axios from "axios";
export default {
  name: "LMSPage",
  setup() {
    let isModalOpen = false;
    const courses = ref([]);
    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3005/class");
        courses.value = await response.data;
      } catch (err) {
        console.log(err);
      }
      const createButton = document.getElementById("createButton");
      const classModal = document.getElementById("class_modal");
      createButton.addEventListener("click", () => {
        if (!isModalOpen) {
          classModal.classList.remove("hidden");
          isModalOpen = true;
        }
      });
      window.addEventListener("click", (event) => {
        if (
          !classModal.contains(event.target) &&
          !createButton.contains(event.target)
        ) {
          classModal.classList.add("hidden");
          isModalOpen = false;
        }
      });
    });
    return {
      courses,
    };
  },
  methods: {
    async create_new_class(e) {
      e.preventDefault();
    },
  },
  components: { ClassCard },
};
</script>

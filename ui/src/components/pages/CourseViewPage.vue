<template>
  <div class="flex flex-row px-4 py-2">
    <router-link to="/lms">
      <button class="flex items-center text-base hover:underline font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <p class="px-4">Back</p>
      </button>
    </router-link>
  </div>
  <div class="px-4 text-5xl text-gray-900">
    {{ data.title }}
  </div>
  <div class="p-4">
    <span class="border-2 border-sky-700 rounded p-1"
      >Class key: {{ data.class_code }}</span
    >
  </div>
  <Tab :itemsList="itemsList" :active="0">
    <template v-slot:tabPanel-1
      ><TabSlotCourseData :id="Number(id)"
    /></template>
    <template v-slot:tabPanel-2><ResultPage :id="Number(id)" /></template>
  </Tab>
</template>
<script>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import axios from "axios";
import TabSlotCourseData from "@/components/pages/course/TabSlotCourseData";
import Tab from "../Tab.vue";
export default {
  name: "CourseViewPage",
  setup() {
    const itemsList = ["Course data", "Materials"];
    const route = useRoute();
    const id = route.params.id;
    const data = ref({});
    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:3005/class/${id}`);
        data.value = await response.data;
      } catch (err) {
        console.log(err);
      }
    });
    return {
      id,
      data,
      itemsList,
    };
  },
  components: { RouterLink, Tab, TabSlotCourseData },
};
</script>

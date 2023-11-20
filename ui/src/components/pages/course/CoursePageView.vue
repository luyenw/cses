<template>
  <div class="flex flex-row h-[calc(100vh-74px)]">
    <aside id="sidebar-multi-level-sidebar" class="top-0 left-0 z-40 w-64">
      <div class="px-3 py-4 bg-gray-50">
        <router-link to="/lms">
          <button
            class="flex items-center text-base hover:underline font-medium"
          >
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
        <ul class="space-y-2 font-medium">
          <li @click="active_index = 0">
            <a
              class="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path
                  d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                />
                <path
                  d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                />
              </svg>
              <span class="ml-3">Content</span>
            </a>
          </li>
          <li @click="active_index = 1">
            <button
              type="button"
              class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path
                  d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"
                />
              </svg>
              <span class="flex-1 ml-3 text-left whitespace-nowrap"
                >Materials</span
              >
            </button>
          </li>
          <li @click="active_index = 2">
            <a
              class="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <svg
                class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path
                  d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
                />
                <path
                  d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
                />
              </svg>
              <span class="ml-3">Pages</span>
            </a>
          </li>
          <li @click="active_index = 3">
            <a
              href="#"
              class="flex items-center p-2 text-gray-900 rounded-lg :bg-gray-100 -700 group"
            >
              <svg
                class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path
                  d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
                />
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Course Data</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <div class="p-4 w-full overflow-scroll">
      <p class="text-gray-500 text-5xl font-thin">{{ data.title }}</p>
        <p>{{ data.body }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Tab from "@/components/Tab.vue";
import CourseContent from "@/components/pages/course/CourseContent.vue";
import CourseData from "@/components/pages/course/CourseData.vue";
import CourseMaterials from "@/components/pages/course/CourseMaterials.vue";
import CoursePageView from "@/components/pages/course/CoursePageView.vue";
import CoursePages from "@/components/pages/course/CoursePages.vue";
export default {
  name: "CoursePageView",
  setup() {
    const itemsList = ["Content", "Materials", "Course data"];
    const route = useRoute();
    const id = route.params.id;
    const page_id = route.params.page_id;
    const data = ref({});
    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/class/${id}/page/${page_id}`
        );
        data.value = response.data;
      } catch (err) {}
    });
    return {
      id,
      data,
      itemsList,
    };
  },
  data() {
    return {
      active_index: 2,
    };
  },
  components: {
    RouterLink,
    Tab,
    CourseContent,
    CourseMaterials,
    CoursePages,
    CourseData,
    CoursePageView,
  },
};
</script>

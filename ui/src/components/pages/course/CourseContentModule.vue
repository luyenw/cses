<template>
  <div
    class="flex flex-row align-center bg-gray-100 border p-4 cursor-pointer font-semibold"
  >
    <div class="w-5 mr-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
    </div>
    <div class="w-full flex flex-row" @click="toggleOpen">
      <div class="w-5" v-html="toggleIcon"></div>
      <div class="w-full px-4">
        {{ data.position + ". " + data.name }}
      </div>
    </div>
    <div class="w-5 rounded-full hover:bg-gray-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
  </div>
  <CourseContentPage v-if="isOpen" v-for="page in items" :data="page" />
</template>
<script>
import CourseContentPage from "./CourseContentPage.vue";
import axios from "axios";
export default {
  name: "CourseContentModule",
  data() {
    return {
      isOpen: false,
      items: [],
    };
  },
  computed: {
    toggleIcon() {
      return this.isOpen
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>
`
        : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
`;
    },
  },
  methods: {
    async toggleOpen() {
      this.isOpen = !this.isOpen;
      if (this.items.length == 0) {
        try {
          console.log(`http://localhost:3005/class/${this.course_id}/modules/${this.id}/items`)
          const response = await axios.get(
            `http://localhost:3005/class/${this.course_id}/modules/${this.id}/items`
          );
          this.items = response.data;
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
  props: {
    data: {
      type: Object,
    },
    id: {
      type: Number,
    },
    course_id: {
      type: Number,
    }
  },
  components: { CourseContentPage },
};
</script>
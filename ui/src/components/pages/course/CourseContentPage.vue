<template>
  <div
    class="flex flex-row align-center border py-4 px-8 font-semibold"
  >
    <div>
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
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    </div>
    <router-link :to="`${course_id}/page/${data.id}`" class="px-4 hover:underline hover:cursor-pointer">
      {{ data.title }}
    </router-link>
  </div>
</template>
<script>
import { RouterLink, useRoute } from 'vue-router';

export default {
    setup(){
      const route = useRoute();
      const course_id = route.params.id
      return {
        course_id
      }
    },
    props: {
        data: {
            type: Object,
            required: true,
        }
    },
    components: { RouterLink }
};
</script>
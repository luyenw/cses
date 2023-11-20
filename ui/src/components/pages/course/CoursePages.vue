<template>
  {{ data }}
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "CoursePages",
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const data = ref([]);
    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/class/${id}/pages`
        );
        data.value = response.data;
      } catch (err) {
        console.log(err);
      }
    });
    return {
      data,
    };
  },
};
</script>

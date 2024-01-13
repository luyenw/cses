<template>
  <div class="p-4">
    <div class="sm:w-full lg:w-2/3 md:w-2/3">
      <ProblemTable :data="problems"></ProblemTable>
    </div>
  </div>
</template>
<script>
import ProblemTable from "@/components/ProblemTable.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  name: "ProblemList",
  setup() {
    const problems = ref([]);
    onMounted(async () => {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(`${apiUrl}:3001/`);
        problems.value = response.data;
      } catch (err) {
        console.log(err);
      }
    });
    return { problems };
  },
  components: { ProblemTable },
};
</script>

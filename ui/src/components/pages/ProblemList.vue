<template>
  <div class="p-4">
    <ProblemTable :data="problems"></ProblemTable>
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
        const response = await axios.get("http://localhost:3001/");
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

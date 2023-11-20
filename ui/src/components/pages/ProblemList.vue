<template>
  <div class="p-4">
    <Table :problems="problems"></Table>
  </div>
</template>
<script>
import Table from "@/components/Table.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  name: "ProblemList",
  setup() {
    const problems = ref(null);
    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3001");
        problems.value = await response.data;
      } catch (err) {
        console.log(err);
      }
    });
    return { problems };
  },
  components: { Table },
};
</script>

<template>
  <div class="p-4">
  <Table :data="tasks"></Table>
</div>
</template>
<script>
import Table from "@/components/Table.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
const setup = () => {
  const tasks = ref(null);
  onMounted(async () => {
    try {
      const response = await axios.get("http://localhost:3001");
      tasks.value = await response.data;
    } catch (err) {
      console.log(err);
    }
  });
  return { tasks };
};
export default {
  name: "ProblemList",
  setup,
  components: { Table },
};
</script>

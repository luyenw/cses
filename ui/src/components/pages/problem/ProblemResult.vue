<template>
  <div v-if="!isLoggedIn">Login to see your submissions.</div>
  <div v-else class="p-4">
    <ProblemResultTable :data="submissions" />
  </div>
</template>
<script>
import constant from "@/enum/constant";
import { onMounted, ref } from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import Badge from "@/components/Badge.vue";
import ProblemResultTable from "./ProblemResultTable.vue";
export default {
  name: "ProblemResult",
  setup(props) {
    const submissions = ref([]);
    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/submit/${props.id}`
        );
        submissions.value = response.data.sort((a, b)=>{
          if(a.createdAt < b.createdAt) return 1;
          return -1
        });
        console.log(response.data);
      } catch (err) {}
    });
    return { submissions, constant };
  },
  props: {
    id: Number,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  components: { Badge, ProblemResultTable, ProblemResultTable },
};
</script>

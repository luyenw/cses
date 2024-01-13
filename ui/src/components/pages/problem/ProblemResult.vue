<template>
  <div v-if="!isLoggedIn">Login to see your submissions.</div>
  <div v-else class="p-4 lg:w-2/3 md:w-full sm:w-full">
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
        const apiUrl = process.env.VUE_APP_API_URL;
        var endpoint = `${apiUrl}:3001/problems/${props.id}/submit/user`;
        if (props.contest_id != 0)
          endpoint = `${apiUrl}:3001/contests/${props.contest_id}/problems/${props.id}/submit/user`;

        const response = await axios.get(endpoint);
        submissions.value = response.data.sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          return -1;
        });
      } catch (err) {
        console.log(err);
      }
    });
    return { submissions, constant };
  },
  props: {
    id: Number,
    contest_id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  components: { Badge, ProblemResultTable, ProblemResultTable },
};
</script>

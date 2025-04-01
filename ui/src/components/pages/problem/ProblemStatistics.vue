<template>
  <div class="p-4 lg:w-2/3 md:w-full sm:w-full">
    <ProblemStatisticsTable :data="data" />
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import ProblemStatisticsTable from "./ProblemStatisticsTable.vue";
import ProblemResultPieChart from "./ProblemResultPieChart.vue";
export default {
  name: "ProblemStatistics",
  setup(props) {
    const data = ref();
    onMounted(async () => {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        var endpoint = `${apiUrl}:3001/problems/${props.id}/submit`;
        if (props.contest_id != 0)
          endpoint = `${apiUrl}:3001/contests/${props.contest_id}/problems/${props.id}/submit`;

        const token = localStorage.getItem('access_token');
        const response = await axios.get(endpoint, {
            headers: {
            Authorization: `Bearer ${token}`
            }
          });
        data.value = response.data;
      } catch (err) {
        console.log(err);
      }
    });
    return {
      data,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    contest_id: {
      type: Number,
      required: true,
    },
  },
  components: { ProblemStatisticsTable, ProblemResultPieChart },
};
</script>

<template>
  <div class="p-4">
    <ProblemStatisticsTable :data="data"/>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import ProblemStatisticsTable from "./ProblemStatisticsTable.vue";

export default {
    name: "ProblemStatistics",
    setup(props) {
        const data = ref();
        onMounted(async () => {
            try {
                const response = await axios.get(`http://localhost:3001/submit/${props.id}/all`);
                data.value = response.data;
            }
            catch (err) {
                console.log(err);
            }
        });
        return {
            data
        };
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
    components: { ProblemStatisticsTable }
};
</script>

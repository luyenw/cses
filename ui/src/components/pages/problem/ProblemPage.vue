<template>
  <Tab :itemsList="itemsList" :active="0">
    <template v-slot:tabPanel-1
      ><ProblemDetail :contest_id="0" :id="Number(id)"
    /></template>
    <template v-slot:tabPanel-2
      ><ResultPage :contest_id="0" :id="Number(id)"
    /></template>
    <template v-slot:tabPanel-3
      ><ProblemStatistics :contest_id="0" :id="Number(id)" />
    </template>
    <template v-slot:tabPanel-4
      ><ProblemDiscuss :contest_id="0" :id="Number(id)" />
    </template>
  </Tab>
</template>
<script>
import { useRoute } from "vue-router";
import Tab from "@/components/Tab.vue";
import ResultPage from "./ProblemResult.vue";
import ProblemDetail from "./ProblemDetail.vue";
import ProblemDiscuss from "./ProblemDiscuss.vue";
import ProblemStatistics from "./ProblemStatistics.vue";
const setup = () => {
  const itemsList = ["Problem", "Result", "Statistics", "Discuss"];
  const route = useRoute();
  const id = route.params.id;
  return { id, itemsList };
};
export default {
  name: "ProblemPage",
  setup,
  components: {
    Tab,
    ResultPage,
    ProblemDiscuss,
    ProblemDetail,
    ProblemDiscuss,
    ProblemStatistics,
  },
};
</script>

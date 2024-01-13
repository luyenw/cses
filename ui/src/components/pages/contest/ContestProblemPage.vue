<template>
  <Tab :itemsList="itemsList" :active="0">
    <template v-slot:tabPanel-1
      ><ProblemDetail :contest_id="contest_id" :id="Number(id)"
    /></template>
    <template v-slot:tabPanel-2><ResultPage :contest_id="contest_id" :id="Number(id)" /></template>
    <template v-slot:tabPanel-3
      ><ProblemStatistics :contest_id="contest_id" :id="Number(id)" />
    </template>
    <template v-slot:tabPanel-4><ContestLiveLeaderboard/></template>
  </Tab>
</template>
<script>
import { useRoute } from "vue-router";
import Tab from "@/components/Tab.vue";
import ResultPage from "@/components/pages/problem/ProblemResult.vue";
import ProblemDetail from "@/components/pages/problem/ProblemDetail.vue";
import ProblemDiscuss from "@/components/pages/problem/ProblemDiscuss.vue";
import ProblemStatistics from "@/components/pages/problem/ProblemStatistics.vue";
import ContestLiveLeaderboard from "./ContestLiveLeaderboard.vue";
const setup = () => {
  const itemsList = ["Problem", "Result", "Statistics", "Live Leaderboard"];
  const route = useRoute();
  const id = route.params.problem_id;
  const contest_id = route.params.contest_id
  return { id, itemsList, contest_id };
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
    ContestLiveLeaderboard
},
};
</script>

<template>
    <div class="px-4 w-full">
        <div class="py-4 text-4xl">{{ contest.name }}</div>
        <hr>
        <div class="py-4 w-2/3">
            <ContestProblemTable :data="problems"/>
        </div>
    </div>
</template>
<script>
import ProblemTable from "@/components/ProblemTable.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ContestProblemTable from "./ContestProblemTable.vue";

export default {
    name: "ContestProlemList",
    setup() {
        const problems = ref([]);
        const route = useRoute();
        const id = route.params.id;
        const contest = ref({})
        onMounted(async () => {
            try {
                const apiUrl = process.env.VUE_APP_API_URL;
                const response = await axios.get(`${apiUrl}:3001/contests/${id}/problems`);
                problems.value = response.data;
                
                const response_1 = await axios.get(`${apiUrl}:3001/contests/${id}`)
                contest.value = response_1.data
            }
            catch (err) {
                console.log("contestProblemList"+err);
            }
        });
        return {
            problems,
            contest
        };
    },
    components: { ProblemTable, ContestProblemTable }
};
</script>

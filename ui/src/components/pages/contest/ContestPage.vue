<template>
    <div class="p-4 w-2/3">
        <ContestListTable :data="contests"/>
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import ContestListTable from "./ContestListTable.vue";

export default {
    name: "ContestPage",
    setup() {
        const contests = ref();
        onMounted(async () => {
            try {
                const apiUrl = process.env.VUE_APP_API_URL
                const response = await axios.get(`${apiUrl}:3001/contests/`);
                contests.value = response.data;
            }
            catch (err) {
                console.log("contestpage"+err);
            }
        });
        return {
            contests
        }
    },
    components: { ContestListTable }
};
</script>

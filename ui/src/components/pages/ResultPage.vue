<template>
    <div v-if="!isLoggedIn">
    Login to see your submissions.
    </div>
    <div v-else class="px-4">
        <SubmissionTable :data="submissions"/>
    </div>
</template>
<script>
    import { onMounted, ref } from 'vue';
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import SubmissionTable from '../SubmissionTable.vue';
    const setup=(props)=>{
        const submissions = ref([])
        onMounted(async ()=>{
            try{
                const response = await axios.get(`http://localhost:3001/submit/${props.id}`)
                var results= await response.data
                results.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
                submissions.value = results
                console.log(submissions.value)
            }catch(err){
                alert(err)
            }
        })
        return {submissions}
    }
    export default{
    name: "ResultPage",
    setup,
    props: {
        id: Number
    },
    computed: {
        ...mapGetters(["isLoggedIn", "user"]),
    },
    components: { SubmissionTable }
}
</script>
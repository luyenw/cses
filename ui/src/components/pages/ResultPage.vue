<template>
    <div v-if="!isLoggedIn">
    Login to see your submissions.
    </div>
    <div v-else>
        <SubmissionTable/>
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
                const response = await fetch(`http://localhost:3001/submit/${props.id}`, {method: 'GET', credentials: ''})
                submissions.value = await response.json()
            }catch(err){
                alert(err)
            }
        })
    }
    export default{
    name: "ResultPage",
    setup,
    props: {
        id: Number
    },
    computed: {
        ...mapGetters(["isLoggedIn", "user"])
    },
    components: { SubmissionTable }
}
</script>
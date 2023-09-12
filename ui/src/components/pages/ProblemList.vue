<template>
    <Table :data="tasks"></Table>
</template>
<script>
    import Table from '@/components/Table.vue';
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    const setup = ()=>{
        const tasks = ref(null)
        onMounted( async ()=>{
            const response = await axios.get('http://localhost:3001')
            tasks.value = await response.data
        })
        return {tasks}
    } 
    export default {
        name: "ProblemList",
        setup,
        components: {Table}
    }
</script>
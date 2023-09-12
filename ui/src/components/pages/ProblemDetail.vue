<template>
        <Tab :itemsList="itemsList" :active=0>
            <template v-slot:tabPanel-1><Problem :id="id"/></template>
            <template v-slot:tabPanel-2><ResultPage :id="id"/></template>
            <template v-slot:tabPanel-3> Content 3 </template>
            <template v-slot:tabPanel-4> Content 4 </template>
        </Tab>
</template>
<script>
    import { useRoute } from 'vue-router';
    import Tab from '@/components/Tab.vue';
    import Problem from '@/components/Problem.vue';
import ResultPage from './ResultPage.vue';
    const setup = ()=>{
        const itemsList = ['Problem', 'Result', 'Statistics', 'Discuss']
        const route = useRoute();
        const id=route.params.id
        return {id, itemsList}
    }
    export default{
        name: "ProblemDetail",
        setup,
        components: { Tab, Problem, ResultPage }
    }   
</script>
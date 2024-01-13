<template>
    <div v-for="comment in data">
        <ProblemDiscussCommentBase :data="comment"/>
        <!-- <DiscussCommentBase :data="comment"/> -->
    </div>
</template>
<script>
    import ProblemDiscussCommentBase from './ProblemDiscussCommentBase.vue';
    import DiscussCommentBase from '@/components/DiscussCommentBase.vue';
    const setup=(props)=>{
        
    }
    export default{
        name: "ProblemDiscussCommentSection",
        setup,
        methods: {
        },
        props: {
            data: {
                type: Array
            }
        },
    components: { ProblemDiscussCommentBase, DiscussCommentBase }
}
</script>
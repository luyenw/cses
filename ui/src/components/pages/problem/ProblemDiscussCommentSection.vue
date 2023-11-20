<template>
    <div v-for="comment in data">
        <DiscussCommentBase :data="comment"/>
    </div>
</template>
<script>
    import ProblemDiscussCommentBase from './ProblemDiscussCommentBase.vue';
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
    components: { ProblemDiscussCommentBase }
}
</script>
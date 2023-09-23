<template>
    <div v-for="comment in data">
        <DiscussCommentBase :data="comment"/>
    </div>
</template>
<script>
    import DiscussCommentBase from './DiscussCommentBase.vue';
    const setup=(props)=>{
        
    }
    export default{
        name: "DiscussCommentSection",
        setup,
        methods: {
        },
        props: {
            data: {
                type: Array
            }
        },
    components: { DiscussCommentBase }
}
</script>
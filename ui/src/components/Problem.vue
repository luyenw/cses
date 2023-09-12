<template>
    <div class="flex h-96">
        <div class="w-1/2 h-full overflow-y-auto px-4">
            <h1 class="text-4xl font-mono text-gray-900 md:text-5xl lg:text-6xl">{{ task.title }}</h1>
            <p class="text-sm font-mono text-gray-900">{{ task.difficulty }}</p>
            <span style="white-space: pre-line; overflow: hidden;" class="font-mono">{{ task.content }}</span>
        </div>
        <div class="flex-row w-1/2">
        <VAceEditor
            class="h-full"
            lang="cpp"
            theme="eclipse" />
        </div>
    </div>
</template>
<script>
    import { onMounted, ref } from 'vue'
    import { VAceEditor } from 'vue3-ace-editor';
    import axios from 'axios'
    const setup = (props)=>{
        const task = ref({})
        onMounted(async()=>{
            const response = await axios.get(`http://localhost:3001/task/${props.id}`)
            task.value = await response.data
        })
        return {task} 
    }
    export default{
        name: "Problem",
        setup,
        components: {VAceEditor},
        props: {
            id: Number
        },
        data() {
            return {
            }
        }
    }
</script>
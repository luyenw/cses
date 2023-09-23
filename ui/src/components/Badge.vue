<template>
  <span
    class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700"
  >
    {{ label }}
  </span>
</template>
<script>
    export default{
        name:"Badge",
        props:{
            label:{
                type: String,
                required: true
            }
        }
    }
</script>

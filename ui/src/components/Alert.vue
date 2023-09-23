<template>
    <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
        <p class="text-sm text-red-700">
        {{ msg }}
        </p>
    </div>
</template>
<script>
    export default{
        name: "Alert",
        props: {
            msg: {
                type: String,
                required: true
            }
        }
    }
</script>
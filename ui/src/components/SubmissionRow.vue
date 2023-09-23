<template>
        <td class="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {{ new Date(data.createdAt).toLocaleString('vi') }}
        </td>
        <td class="text-center whitespace-nowrap px-4 py-2 text-gray-700">{{ data.lang }}</td>
        <td class="text-center whitespace-nowrap px-4 py-2 text-gray-700">{{ 0.1 }}</td>
        <td class="text-center whitespace-nowrap px-4 py-2 text-gray-700">
          <Badge :label="data.status.toUpperCase()"/>
        </td>
        <td class="whitespace-nowrap px-4 py-2">
          <a
            href="#"
            class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            View
          </a>
        </td>
</template>
<script>
import Badge from './Badge.vue';

    export default{
    name: "SubmissionRow",
    props: {
        data: {
            required: true
        }
    },
    components: { Badge }
}
</script>
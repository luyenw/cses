<template>
<div class="md:w-2/3 sm:w-full overflow-hidden rounded-lg border border-gray-200 shadow-md">
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr class="flex">
        <th scope="col" class="px-6 py-4 font-medium text-gray-900 w-1/6">Status</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900 w-3/6">Title</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900 w-2/6">Difficulty</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      <tr v-for="task in data" class="flex odd:bg-white even:bg-gray-50">
        <td class="px-6 py-4 font-medium text-gray-700 w-1/6"></td>
        <td class="px-6 py-4 text-gray-700 w-3/6">
            <RouterLink :to="{path: `/task/${task.id}`}">{{ task.title }}</RouterLink>
        </td>
        <td class="px-6 py-4 w-2/6">{{ task.difficulty }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import { RouterLink } from 'vue-router';

export default{
    name: "Table",
    props: ['data'],
    setup(props) {
        console.log(props.data);
    },
    components: { RouterLink }
}
</script>
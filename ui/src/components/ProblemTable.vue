<template>
  <div
    class="w-full overflow-hidden rounded-lg border border-gray-200"
  >
    <table class="table-auto w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr class="flex">
        <th field="status" scope="col" class="px-6 py-2 font-weight text-gray-900 w-1/6">
          <button @click="onSort">Status</button>
        </th>
        <th field="title" scope="col" class="px-6 py-2 font-weight text-gray-900 w-3/6">
          <button @click="onSort">Title</button>
        </th>
        <th field="difficulty" scope="col" class="px-6 py-2 font-weight text-gray-900 w-2/6">
          <button @click="onSort">Difficulty</button>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      <tr v-for="problem in data" class="flex odd:bg-white even:bg-gray-50">
        <td class="px-6 py-2 font-weight text-gray-700 w-1/6"></td>
        <td class="px-6 py-2 text-gray-700 w-3/6">
            <router-link :to="{path: `/problems/${problem.id}`}">{{ problem.title }}</router-link>
        </td>
        <td class="px-6 py-2 w-2/6">{{ problem.difficulty }}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";

export default {
  name: "ProblemTable",
  setup(props) {
    var sortOrder = -1
    const onSort = (e)=>{
      e.preventDefault()
      sortOrder *= -1
      const sortBy = e.target.parentNode.getAttribute('field')
      props.data.sort((a, b)=>{
        if(a[sortBy] <= b[sortBy]){
          return -1*sortOrder
        }
        return 1*sortOrder
      })
    }
    return {
      onSort,
    };
  },
  props:{
    data: {
      type: Array
    },
  },
  components: { RouterLink },
};
</script>

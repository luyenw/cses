<template>
  <div
    class="md:w-2/3 sm:w-full overflow-hidden rounded-lg border border-gray-200 shadow-md"
  >
    <!-- <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
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
  </table> -->
    <table class="table table-bordered table-hover">
      <table-header :sort-order="params.sortOrder" :sort-by="params.sortBy"  @sort="onSort">
        <th-column column="status">Status</th-column>
        <th-column column="title">Title</th-column>
        <th-column>Difficulty</th-column>
      </table-header>
      <tbody>
        <tr v-for="item in displayData" :key="item.title">
          <td>{{ item.status }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.difficulty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import { TableHeader, TableHeaderColumn as ThColumn } from "vue-table-sorter";
import "vue-table-sorter/dist/vue-table-sorter.css";
import { ref } from "vue";
// import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "Table",
  props: ["problems"],
  setup(props) {
    var displayData = []
    displayData = props.problems
    return {
      params: {
        sortOrder: "desc",
        sortBy: "name",
      },
      displayData,
    };
  },
  methods: {
    onSort: (params)=>{
      console.log(params)
    }
  },
  components: { RouterLink, TableHeader, ThColumn },
};
</script>

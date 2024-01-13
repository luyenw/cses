<template>
  <div
    class="overflow-hidden rounded-lg border border-gray-200"
  >
    <table
      class="w-full table-auto border-collapse bg-white text-center text-sm text-gray-500"
    >
      <thead class="ltr:text-center bg-gray-50">
        <tr
        >
          <th
            field="id"
            scope="col"
            class="px-6 py-2 font-weight text-gray-900"
          >
            <button @click="onSort">ID</button>
          </th>
          <th
            field="lang"
            scope="col"
            class="px-6 py-2 font-weight text-gray-900"
          >
            <button @click="onSort">Lang</button>
          </th>
          <th scope="col" class="px-6 py-2 font-weight text-gray-900">
            Execution time
          </th>
          <th
            field="status"
            scope="col"
            class="px-6 py-2 font-weight text-gray-900"
          >
            <button @click="onSort">Status</button>
          </th>
          <th
            field="lang"
            scope="col"
            class="px-6 py-2 font-weight text-gray-900"
          >
            <button @click="onSort">Passed</button>
          </th>
          <th
            field="createdAt"
            scope="col"
            class="px-6 py-2 font-weight text-gray-900"
          >
            <button @click="onSort">Time</button>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr v-for="line in data" class="odd:bg-white even:bg-gray-50">
          <td class="text-center">
            <router-link :to="'/submit/' + line.id+'/view'">
              <span class="text-blue-500 underline hover:text-blue-700">{{
                line.id.substring(0, 8)
              }}</span>
            </router-link>
          </td>
          <td
            class="text-center whitespace-nowrap px-4 py-2 text-gray-700"
          >
            {{ line.lang }}
          </td>
          <td
            class="text-center whitespace-nowrap px-4 py-2 text-gray-700"
          >
            {{ 0.1 }}
          </td>
          <td
            class="text-center whitespace-nowrap px-4 py-2 text-gray-700"
          >
            <span :class="'text-' + constant.status_color[line.status]">{{
              constant.status[line.status]
            }}</span>
          </td>
          <td
            class="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900"
          >
            {{ line.passed }}
          </td>
          <td
            class="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900"
          >
            {{ new Date(line.createdAt).toLocaleString("vi") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import constant from "@/enum/constant";
import { ref } from "vue";
export default {
  name: "ProblemResultTable",
  setup(props) {
    var sortOrder = -1;
    const onSort = (e) => {
      e.preventDefault();
      sortOrder *= -1;
      const sortBy = e.target.parentNode.getAttribute("field");
      props.data.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1 * sortOrder;
        }
        if(a[sortBy] == b[sortBy]) return 0
        return 1 * sortOrder;
      });
    };
    return {
      constant,
      onSort,
    };
  },
  props: {
    data: {
      type: Array,
    },
  },
};
</script>

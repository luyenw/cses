<template>
    <div
    class="lg:w-2/3 md:w-full sm:w-full overflow-hidden rounded-lg border border-gray-200"
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
            class="px-6 py-4 font-medium text-gray-900"
          >
            <button @click="onSort">ID</button>
          </th>
          <th
            field="lang"
            scope="col"
            class="px-6 py-4 font-medium text-gray-900"
          >
            <button @click="onSort">Lang</button>
          </th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">
            Execution time
          </th>
          <th
            field="status"
            scope="col"
            class="px-6 py-4 font-medium text-gray-900"
          >
            <button @click="onSort">Status</button>
          </th>
          <th
            field="lang"
            scope="col"
            class="px-6 py-4 font-medium text-gray-900"
          >
            <button @click="onSort">Passed</button>
          </th>
          <th
            field="createdAt"
            scope="col"
            class="px-6 py-4 font-medium text-gray-900"
          >
            <button @click="onSort">Time</button>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr v-for="line in data" class="odd:bg-white even:bg-gray-50">
          <td class="text-center">
            <router-link :to="'/submit/view/' + line.id">
              <span class="text-blue-500 underline hover:text-blue-700">{{
                line.id.substring(0, 16)
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
import { ref } from "vue";
import constant from "@/enum/constant";
export default {
  name: "ProblemStatisticsTable",
  setup(props) {
    const data = ref();
    data.value = props.data;
    return {
      data,
      constant
    };
  },
  props: {
    data: {
      type: Array,
      require: true,
    },
  },
};
</script>

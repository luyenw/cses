<template>
  <div
    class="overflow-hidden rounded-lg border border-gray-200"
  >
    <table
      class="w-full table-auto border-collapse bg-white text-center text-sm text-gray-500"
    >
      <thead class="ltr:text-center bg-gray-50">
        <tr>
          <th
            field="name"
            scope="col"
            class="px-6 py-2 font-weight text-gray-900"
          >
            <button @click="onSort">Name</button>
          </th>
          <th
            field="start"
            scope="col"
            class="px-6 py-2 font-weight text-gray-900"
          >
            <button @click="onSort">Start</button>
          </th>
          <th
            field="length"
            scope="col"
            class="px-6 py-2 font-weight text-gray-900"
          >
            <button @click="onSort">Length</button>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <tr v-for="line in data" class="odd:bg-white even:bg-gray-50">
          <td class="text-center">
            <router-link :to="'/contests/' + line.id">
              <span class="text-blue-500 underline hover:text-blue-700">{{
                line.name
              }}</span>
            </router-link>
          </td>
          <td class="text-center whitespace-nowrap px-4 py-2 text-gray-700">
            {{ new Date(line.start).toLocaleString("vi") }}
          </td>
          <td class="text-center whitespace-nowrap px-4 py-2 text-gray-700">
            {{ line.length }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import constant from "@/enum/constant";
export default {
  name: "ContestListTable",
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
        if (a[sortBy] == b[sortBy]) return 0;
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

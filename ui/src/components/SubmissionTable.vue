<template>
  <div class="overflow-x-auto">
    <table class="max-w-1/2 divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left">
        <tr>
          <th
            class="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900"
          >
            Time
          </th>
          <th
            class="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900"
          >
            Lang
          </th>
          <th
            class="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900"
          >
            Execution time
          </th>
          <th
            class="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900"
          >
            Status
          </th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody v-for="line in data" class="divide-y divide-gray-200">
        <tr>
          <SubmissionRow :data="line" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import SubmissionRow from "./SubmissionRow.vue";

export default {
  name: "SubmissionTable",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  components: { SubmissionRow },
};
</script>

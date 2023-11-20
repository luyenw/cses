<template>
  <table class="w-full">
    <tbody>
      <DropdownRow
        v-for="row in data"
        :key="`dropdown-row-${row.id}`"
        :row="row"
        :level="0"
      />
    </tbody>
  </table>
</template>

<script>
import DropdownRow from './DropdownRow.vue';
export default {
    name: "TableDropdown",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  components: {
    DropdownRow,
  },
};
</script>

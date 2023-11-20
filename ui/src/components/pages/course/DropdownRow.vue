<template>
  <div @click="toggleRow" class="border cursor-pointer flex flex-row" :class="'ml-'+level*7">
    <div class="p-2 flex jutify-center text-center align-center">
        <div class="w-5 h-5" v-html="toggleIcon"></div>
    </div>
    <div class="p-2 border-l">{{ row.id }}</div>
  </div>
  <template v-if="hasChildren && isOpen">
    <DropdownRow
      v-for="childRow in row.childrens"
      :key="`dropdown-row-${childRow.id}`"
      :row="childRow"
      :level="level + 1"
    />
  </template>
</template>

<script>
export default {
  name: "DropdownRow",
  props: {
    row: {
      type: Object,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    hasChildren() {
      return this.row.childrens.length > 0;
    },
    toggleIcon() {
      return !this.hasChildren ? `` : this.isOpen ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
</svg>
` : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
</svg>
`;
    },
  },
  methods: {
    toggleRow() {
      if (!this.hasChildren) return;
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

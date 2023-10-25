<template>
  <div class="px-4">
    <div class="hidden sm:block">
      <nav class="flex" aria-label="Tabs">
        <a
          v-for="(item, idx) in itemsList"
          href="#"
          @click="active = idx"
          class="px-8 text-lg font-medium"
          :class="
            idx == active
              ? 'shrink-0 border-b-2 border-sky-500 px-4 py-2 text-sm font-medium text-sky-600'
              : 'shrink-0 border-b-2 border-transparent px-4 py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
          "
        >
          {{ item }}
        </a>
      </nav>
    </div>
  </div>
  <template v-for="(tab, index) in itemsList">
    <div
      :key="index"
      v-if="index == active"
      class="flex-grow bg-white rounded-lg"
    >
      <slot :name="`tabPanel-${index + 1}`" />
    </div>
  </template>
</template>
<script>
export default {
  name: "Tab",
  props: {
    itemsList: { type: Array, required: true },
    active: { type: Number },
  },
};
</script>

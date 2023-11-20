<template>
  <div class="py-4 flex flex-row-reverse">
    <button
      type="button"
      class="add-module-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none"
    >
      New module
    </button>
  </div>
  <div
    class="add-module-panel hidden bg-gray-900 bg-opacity-50 flex justify-center items-center absolute top-0 left-0 w-screen h-screen z-50"
  >
    <div
      class="add-module-modal w-1/2 h-2/3 bg-white rounded-sm border shadow-sm"
    >
      <form class="flex flex-col justify-between h-full" @submit="add_module">
        <div class="modal-header p-2 flex flex-row justify-between">
          <div class="text-lg">Add a module</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <hr />
        <div class="modal-body p-2 flex-1">
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="module_name"
            placeholder="Module name"
          />
        </div>
        <hr />
        <div class="modal-footer bg-gray-200 p-2 flex flex-row-reverse">
          <button
            type="submit"
            class="add-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none"
          >
            New module
          </button>
          <button
            type="button"
            class="cancel-btn mr-2 text-white bg-white text-gray-900 border hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  <hr />
  <div class="mt-4">
    <CourseContentModule
      v-for="(item, index) in getCourseModules"
      :course_id="id"
      :data="item"
      :id="item.id"
    />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import TableDropdown from "./TableDropdown.vue";
import axios from "axios";
import CourseContentModule from "./CourseContentModule.vue";
import { useStore, mapGetters } from "vuex";

export default {
  name: "CourseContent",
  setup(props) {
    const store = useStore()
    const data = ref([]);

    var modalOpen = false;
    onMounted(async () => {
      const btn = document.getElementsByClassName("add-module-btn")[0];
      const modal = document.getElementsByClassName("add-module-modal")[0];
      const panel = document.getElementsByClassName("add-module-panel")[0];
      const cancel_btn = document.getElementsByClassName("cancel-btn")[0];
      const add_btn = document.getElementsByClassName("add-btn")[0];

      btn.addEventListener("click", () => {
        modalOpen = !modalOpen;
        if (modalOpen) {
          panel.classList.remove("hidden");
        } else {
          panel.classList.add("hidden");
        }
      });

      window.addEventListener("click", (event) => {
        if (
          (!modal.contains(event.target) && !btn.contains(event.target)) ||
          cancel_btn.contains(event.target) || add_btn.contains(event.target)
        ) {
          modalOpen = false;
          panel.classList.add("hidden");
        }
      });

      const response = await axios.get(
        `http://localhost:3005/class/${props.id}`
      );
      data.value = response.data.modules;
      data.value.sort((a, b) => a.position - b.position);
      store.commit('setCourseModules', data.value)
    });
    return {
      store
    };
  },
  props: {
    id: Number,
  },
  data() {
    return {
      module_name: "",
    };
  },
  computed: {
    ...mapGetters(['getCourseModules']),
    toggleIcon() {
      return this.isOpen
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
</svg>
`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
</svg>
`;
    },
  },
  methods: {
    async add_module(event) {
      event.preventDefault();
      try {
        console.log(`http://localhost:3005/class/${this.id}/modules`)
        const response = await axios.post(
          `http://localhost:3005/class/${this.id}/modules`,
          {
            course_id: this.id,
            name: this.module_name,
          }
        );
        this.store.commit('setCourseModules', response.data)
        console.log(this.getCourseModules)
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }

    },
  },
  components: { TableDropdown, CourseContentModule },
};
</script>

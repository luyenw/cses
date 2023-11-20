<template>
  <div class="flex flex-row justify-between border-b-2">
    <button
      @click="add_student"
      class="flex items-center text-base hover:underline font-medium"
    >
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
          d="M12 6v12m6-6H6"
        />
      </svg>
      <p>Add</p>
    </button>
  </div>
  owners ({{ owners.length }})
  <div v-for="item in owners">
    {{ item.name }}
  </div>
  members ({{ members.length }})
  <div v-for="item in members">
    {{ item.name }}
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Table from "@/components/Table.vue";
export default {
  name: "CourseData",
  setup(props) {
    const owners = ref([]);
    const members = ref([]);
    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/class/${props.id}/ps`
        );
        const ps = await response.data;
        ps.forEach((element) => {
          if (element.role == 0) owners.value.push(element);
          else members.value.push(element);
        });
      } catch (err) {
        console.log(err);
      }
    });
    const add_student = async () => {
      try {
        const username = prompt("sss");
        const response = await axios.post(
          `http://localhost:3005/class/${props.id}/ps`,
          { username: username }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    return {
      owners,
      members,
      add_student,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    Table,
  },
};
</script>

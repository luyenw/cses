<template>
    <div v-if="!isLoggedIn">Login to see your submissions.</div>
    <div v-else class="px-4">
      <div class="overflow-x-auto">
        <table class="max-w-1/2 divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="ltr:text-left">
            <tr>
              <th
                class="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900"
              >
                ID
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
              <th
                class="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900"
              >
                Time
              </th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody v-for="line in submissions" class="divide-y divide-gray-200">
            <tr>
              <td>
                <router-link :to="'/submit/view/' + line.id">
                <span class="text-blue-500 underline hover:text-blue-700">{{ line.id }}</span>
                </router-link>
              </td>
              <td class="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                {{ line.lang }}
              </td>
              <td class="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                {{ 0.1 }}
              </td>
              <td class="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                <span :class="'text-'+constant.status_color[line.status]">{{ constant.status[line.status] }}</span>
              </td>
              <td
                class="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900"
              >
                {{ new Date(line.createdAt).toLocaleString("vi") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import constant from "@/enum/constant";
  import { onMounted, ref } from "vue";
  import { mapGetters } from "vuex";
  import axios from "axios";
  import Badge from "@/components/Badge.vue";
  const setup = (props) => {
    const submissions = ref([]);
    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/submit/${props.id}`
        );
        var results = await response.data;
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        submissions.value = results;
        console.log(submissions.value);
      } catch (err) {}
    });
    return { submissions, constant };
  };
  export default {
    name: "ProblemResult",
    setup,
    props: {
      id: Number,
    },
    computed: {
      ...mapGetters(["isLoggedIn", "user"]),
    },
    components: { Badge },
  };
  </script>
  
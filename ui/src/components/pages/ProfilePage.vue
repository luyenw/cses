<template>
  <section class="bg-blueGray-50">
    <div class="w-full px-4 mx-auto">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
      >
        <div class="">
          <div class="flex flex-wrap justify-center">
            <div class="w-full px-4 flex justify-center">
              <div class="relative">                
                <img class="w-32 h-32 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" :src="user.imgUrl" alt="Bordered avatar">
              </div>
            </div>
          </div>
          <div class="text-center mt-12">
            <h3
              class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
            >
                {{ user.name }}
            </h3>
            <div
              class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
            >
              <i
                class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
              ></i>
              Los Angeles, California
            </div>
            <div class="mb-2 text-blueGray-600 mt-10">
              <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              Solution Manager - Creative Tim Officer
            </div>
            <div class="mb-2 text-blueGray-600">
              <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              University of Computer Science
            </div>
          </div>
          <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure. An artist of considerable
                  range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "ProfilePage",
  setup() {
    const user = ref({});
    const route = useRoute();
    const id = route.params.id;
    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${id}`);
        user.value = await response.data;
        console.log(user.value);
      } catch (err) {}
    });
    return { user };
  },
};
</script>

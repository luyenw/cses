<template>
  <div
    class="hidden end-0 z-10 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
  >
    <div class="p-2">
      <router-link :to="'/user/'+data.id">
        <a
          class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          role="menuitem"
        >
          {{ data?.name }}
        </a>
      </router-link>
      <router-link to="/">
        <a
          @click="signout"
          class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
          role="menuitem"
        >
          Signout
        </a>
      </router-link>
    </div>
  </div>
</template>
<script>
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";
const setup = () => {
  const store = useStore();
  const router = useRouter()
  return {
    signout: () => {
      store.commit("setUser", null);
      document.cookie =  "access_token=; expires="+new Date + "; domain=localhost;Path=/";
      router.push('/login')
    },
  };
};
export default {
  name: "NavBarDropdown",
  setup,
  props: {
    hidden:{
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true,
    },
  },
  methods:{
    
  }
};
</script>

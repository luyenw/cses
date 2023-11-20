<template>
  <div class="h-screen">
    <NavBar />
    <router-view></router-view>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "MainPage",
  components: { NavBar },
};
</script>

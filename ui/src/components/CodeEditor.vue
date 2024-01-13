<template>
  
</template>
<script>
import loader from "@monaco-editor/loader";
import { onBeforeUnmount, onMounted } from "vue";
import { mapGetters } from "vuex";
const setup = () => {
  onMounted(async () => {
    
  });

  return {};
};

export default {
  name: "CodeEditor",
  setup,
  data() {
    return {
    };
  },
  computed:{
      ...mapGetters(["user"]),
  },
  methods: {
    submit: (e) => {
      e.preventDefault();
      const editor = monaco.editor.getModels()[0];
      const source_code = editor.getValue();
      const lang = document.getElementById("languageSelect").value
      // const problem_id = 
    }
  },
};
</script>

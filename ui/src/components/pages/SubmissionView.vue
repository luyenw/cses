<template>
  <div class="p-4">
    <h2 class="font-bold bg-white text-black-900">
      <span class="flex items-center">Test results</span>
    </h2>
    <div>
      <div v-for="(item, i) in data.results" :key="i">
        test {{ i }}:
        <span :class="'text-'+constant.color[item.verdict]">
            {{constant.verdict[item.verdict]}}
        </span>
      </div>
    </div>
    <h2 class="font-bold bg-white text-black-900">
      <span class="flex items-center">Code </span>
    </h2>
    <div>
      <div id="editor" class="w-1/2 h-64"></div>
    </div>
    <h2 class="font-bold bg-white text-black-900">
      <span class="flex items-center">Test details</span>
    </h2>
    <div>
      <div v-for="(item, i) in data.results" :key="i" :id="item.testcase_id">
        <div>test {{ i }}</div>
        Input:
        {{ item.testcase.input }}
        Correct output:
        {{ item.testcase.output }}
        User output:
        {{ item.user_output }}
      </div>
    </div>
  </div>
</template>
<script>
import constant from "@/enum/constant";
import axios from "axios";
import loader from "@monaco-editor/loader";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "SubmissionView",
  setup() {
    const source_code = ref("");

    const route = useRoute();
    const submission_id = route.params.id;
    const data = ref([]);
    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/submit/view/${submission_id}`
        );
        console.log(response.data);
        data.value = response.data;
        source_code.value = response.data.source_code;
      } catch (err) {}
      loader.init().then((monaco) => {
        const editorOptions = {
          language: "cpp",
          minimap: { enabled: false },
          theme: "vs-light",
          readOnly: true,
          value: source_code.value,
        };
        const editor = monaco.editor.create(
          document.getElementById("editor"),
          editorOptions
        );
      });
    });

    onBeforeUnmount(() => {
      loader.init().then((monaco) => {
        monaco.editor.getModels().forEach((model) => model.dispose());
      });
    });
    return {
      data,
      constant,
    };
  },
};
</script>

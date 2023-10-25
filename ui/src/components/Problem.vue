<template>
  <div class="flex">
    <div class="w-max-2xl overflow-y-auto px-4">
      <h1 class="text-4xl text-gray-900 md:text-5xl lg:text-6xl">
        {{ task.title }}
      </h1>
      <Badge :label="task.difficulty" />
      <br />
      <span style="white-space: pre-line; overflow: hidden" class="">{{
        task.content
      }}</span>
    </div>
  </div>
  <div class="px-4">
    <h1 class="text-2xl text-gray-900">Submit</h1>
    <form @submit="submit">
      <label>Language</label>
      <select
        id="languageSelect"
        class="mt-1.5 px-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        <option value="cpp">Cpp</option>
        <option value="python">Python</option>
      </select>
      <div id="editor" class="w-1/2 h-64"></div>
      <button
        type="submit"
        class="cursor-pointer my-2 inline-block rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white"
        :disabled="user ? false : true"
      >
        {{ user ? "Submit" : "Login required for submit" }}
      </button>
    </form>
  </div>
</template>
<script>
import loader from "@monaco-editor/loader";
import axios from "axios";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { mapGetters } from "vuex";
import Badge from "./Badge.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const setup = (props) => {
  const task = ref({});
  onMounted(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/task/${props.id}`
      );
      task.value = await response.data;
    } catch (err) {
      console.log(err);
    }
    loader.init().then((monaco) => {
      const editorOptions = {
        language: "cpp",
        minimap: { enabled: false },
        theme: "vs-dark",
      };
      const editor = monaco.editor.create(
        document.getElementById("editor"),
        editorOptions
      );

      const languageSelect = document.getElementById("languageSelect");
      languageSelect.addEventListener("change", function () {
        const selectedLanguage = languageSelect.value;
        monaco.editor.setModelLanguage(editor.getModel(), selectedLanguage);
      });
      if (localStorage.getItem(props.id)) {
        editor.getModel().setValue(localStorage.getItem(props.id));
      }
      editor.getModel().onDidChangeContent(() => {
        localStorage.setItem(props.id, editor.getModel().getValue());
      });
    });
  });
  onBeforeUnmount(() => {
    loader.init().then((monaco) => {
      monaco.editor.getModels().forEach((model) => model.dispose());
    });
  });
  return { task };
};
export default {
  name: "Problem",
  setup,
  components: { Badge },
  props: {
    id: Number,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      try {
        var source_code = monaco.editor.getModels()[0].getValue();
        if (source_code.trim() == "") {
          toast.error("Source code should not be empty\nSubmit failed!", {
            autoClose: 5000,
          });
          return;
        }
        const body = {
          task_id: Number(this.id),
          user_id: Number(this.user.id),
          lang: document.getElementById("languageSelect").value,
          source_code: source_code,
        };
        const response = await axios.post(
          "http://localhost:3001/submit/",
          body
        );
        toast.success("Submit sucessfully!", {
          autoClose: 3000,
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    handleValueUpdate: (value) => {
      alert(value);
    },
  },
};
</script>

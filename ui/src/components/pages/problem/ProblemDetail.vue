<template>
  <div class="flex p-4">
    <div class="w-2/3">
      <div class="flex">
        <div class="w-max-2xl overflow-y-auto">
          <h1 class="text-4xl text-gray-900 md:text-5xl lg:text-6xl">
            {{ problem.title }}
          </h1>
          <Badge :label="problem.difficulty" />
          <br />
          <div class="text-sm">Time limit: {{ problem.time_limit }}</div>
          <div class="text-sm">Memory limit: {{ problem.memory_limit }} KB</div>
          <span style="white-space: pre-line; overflow: hidden" class="">{{
            problem.content
          }}</span>
        </div>
      </div>
      <div class="">
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
          <div id="editor" class="full h-64"></div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none"
            :disabled="user ? false : true"
          >
            {{ user ? "Submit" : "Login required for submit" }}
          </button>
        </form>
      </div>
    </div>
    <div class="w-1/3 p-4">
      <ProblemResultPieChart :data="chartData" />
    </div>
  </div>
</template>
<script>
import loader from "@monaco-editor/loader";
import axios from "axios";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { mapGetters } from "vuex";
import Badge from "@/components/Badge.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ProblemResultPieChart from "./ProblemResultPieChart.vue";
export default {
  name: "Problem",
  setup(props) {
    const problem = ref({});
    onMounted(async () => {
      try {
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}:3001/problems/${props.id}`
        );
        problem.value = await response.data;
      } catch (err) {
        console.log(err);
      }
      loader.init().then((monaco) => {
        const editorOptions = {
          language: "cpp",
          minimap: { enabled: false },
          theme: "vs-light",
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
    return { problem };
  },
  components: { Badge, ProblemResultPieChart },
  props: {
    id: Number,
    contest_id: Number
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
          problem_id: Number(this.id),
          contest_id: this.$props.contest_id,
          user_id: Number(this.user.id),
          lang: document.getElementById("languageSelect").value,
          source_code: source_code,
        };
        const apiUrl = process.env.VUE_APP_API_URL;
        const token = localStorage.getItem('access_token');
        const response = await axios.post(
          `${apiUrl}:3001/submit`, 
          body,
          {
            headers: {
            Authorization: `Bearer ${token}`
            }
          }
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
  data(){
    return{
      chartData: null
    }
  },
  mounted() {
    const apiUrl = process.env.VUE_APP_API_URL;
    if(this.$props.contest_id == 0){
        axios
          .get(`${apiUrl}:3001/problems/${this.$props.id}/submit`)
          .then((res) => {
            this.chartData = res.data;
            console.log('chart data', this.chartData);
          });
    }else{
      axios
          .get(`${apiUrl}:3001/contests/${this.$props.contest_id}/problems/${this.$props.id}/submit`)
          .then((res) => {
            this.chartData = res.data;
            console.log('chart data', this.chartData);
          });
    }
  }
};
</script>

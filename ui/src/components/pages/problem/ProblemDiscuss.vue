<template>
  <section class="max-w-2xl pt-4 pl-4 antialiased">
    <div v-if="user">
      <form @submit="post_comment" class="">
        <div
          class="py-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200"
        >
          <label for="comment" class="sr-only">Your comment</label>
          <textarea
            v-model="input_comment"
            id="comment"
            rows="6"
            class="px-0 w-full text-sm text-black border-0 focus:ring-0 focus:outline-none placeholder-gray-500"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <div class="flex flex-row-reverse">
          <button
            type="submit"
            class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none"
          >
            Post comment
          </button>
        </div>
      </form>
    </div>
    <div v-else></div>
    <ProblemDiscussCommentSection :data="comment_data" />
  </section>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useStore } from "vuex"; 
import ProblemDiscussCommentSection from "./ProblemDiscussCommentSection.vue";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const apiUrl = process.env.VUE_APP_API_URL;
    const endpoint = `${apiUrl}:3002/graphql`;
    const headers = {
      "content-type": "application/json",
    };
    const input_comment = ref('');
    // watch(inputComment, (newValue) => {
    //   console.log('Comment changed:', newValue);
    // });
    const graphqlQuery = {
      query: `query{ getComments(topic_id: ${props.id}){ id author{name, imgUrl} body createdAt}}`,
    };
    console.log(graphqlQuery);
    const comment_data = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.post(endpoint, graphqlQuery, headers);
        console.log(response);
        comment_data.value = response.data.data.getComments;
        console.log(comment_data.value);
      } catch (err) {
        console.error(err);
      }
    });
    const store = useStore();
    const user = store.getters.user;

    const post_comment = async (e) => {
      e.preventDefault();
      const endpoint = `${apiUrl}:3002/graphql`;
      const headers = {
        "content-type": "application/json",
      };
      const graphqlQuery = {
        query: `mutation{ createMessage(input: {topic_id: ${props.id}, author_id: ${user.id}, body: "${input_comment.value}", parent_id: "0"}){id author{name, imgUrl} body createdAt}}`,
      };
      console.log(graphqlQuery);
      try {
        const response = await axios.post(endpoint, graphqlQuery, headers);
        comment_data.value.unshift(response.data.data.createMessage);
      } catch (err) {
        console.error("problemdiscuss", err);
      }
    };

    return {
      comment_data,
      apiUrl,
      post_comment,
      user,
      input_comment
    };
  },
  // computed: {
  //   ...mapGetters(["user"]),
  // },
  components: { ProblemDiscussCommentSection },
};
</script>

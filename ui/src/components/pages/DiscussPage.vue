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
            class="mt-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </div>
      </form>
    </div>
    <div v-else></div>
    <DiscussCommentSection :data="comment_data" />
  </section>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { mapGetters } from "vuex";
import DiscussCommentSection from "../DiscussCommentSection.vue";
const setup = (props) => {
  const endpoint = "http://localhost:3002/graphql";
  const headers = {
    "content-type": "application/json",
  };
  const graphqlQuery = {
    query: `query{ getComments(topic_id: ${props.id}){ id author{name, imgUrl} body createdAt}}`,
  };
  const comment_data = ref([]);
  onMounted(async () => {
    try {
      const response = await axios.post(endpoint, graphqlQuery, headers);
      comment_data.value = await response.data.data.getComments;
    } catch (err) {
      console.log(err);
    }
  });
  return {
    comment_data,
  };
};
export default {
  name: "DiscussPage",
  setup,
  methods: {
    async post_comment(e) {
      e.preventDefault();
      const endpoint = "http://localhost:3002/graphql";
      const headers = {
        "content-type": "application/json",
      };
      const graphqlQuery = {
        query: `mutation{ createMessage(input: {topic_id: ${this.id}, author_id: ${this.user.id}, body: \"${this.input_comment}\" , parent_id: "0"}){id author{name, imgUrl} body createdAt}}`,
      };
      console.log(graphqlQuery.query);
      try {
        const response = await axios.post(endpoint, graphqlQuery, headers);
        this.comment_data.unshift(response.data.data.createMessage);
      } catch (err) {
        console.log(err);
      }
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  components: { DiscussCommentSection },
};
</script>

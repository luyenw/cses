<template>
  <div class="max-w-2xl" :comment_id="data.id">
    <article class="text-base bg-white rounded-lg">
      <div class="flex items-center justify-between">
        <p
          class="inline-flex items-center mr-3 text-sm text-black font-semibold"
        >
          <img
            class="mr-2 w-6 h-6 rounded-full"
            :src="data.author.imgUrl"
            alt="Michael Gough"
          />{{ data.author.name }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ timeAgo.format(new Date(data.createdAt * 1)) }}
        </p>
      </div>
      <p class="text-black py-2">{{ data.body }}</p>
      <div class="mb-4 flex items-center space-x-4">
        <button
          v-if="replies.length > 0"
          @click="toggle_show_replies"
          type="button"
          class="flex items-center text-sm hover:underline dark:text-gray-400 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chat"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
            />
          </svg>
          <p class="px-2">{{ showReplies ? "Hide" : "Show" }} Replies</p>
        </button>

        <button v-if="user"
          type="button"
          @click="toggle_reply"
          class="flex items-center text-sm hover:underline dark:text-gray-400 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-reply"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"
            />
          </svg>
          <p class="px-2">Reply</p>
        </button>
      </div>
    </article>

    <div v-if="reply" class="border-l-4">
      <div class="ml-8">
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
    </div>
    <div v-if="showReplies" class="border-l-4">
      <div class="ml-8 mb-4" v-for="reply in replies">
        <DiscussCommentBase :data="reply" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { onMounted, ref } from "vue";
import { mapGetters } from "vuex";
const setup = (props) => {
  const replies = ref([]);
  TimeAgo.addDefaultLocale(en);
  onMounted(async () => {
    const endpoint = "http://localhost:3002/graphql";
    const headers = {
      "content-type": "application/json",
    };
    const graphqlQuery = {
      query: `query{ commentReplies(comment_id: \"${props.data.id}\"){author{name, imgUrl} id body createdAt}}`,
    };
    const response = await axios.post(endpoint, graphqlQuery, headers);
    replies.value = await response.data.data.commentReplies;
  });
  return { replies };
};
export default {
  name: "DiscussCommentBase",
  setup,
  data() {
    return {
      showReplies: false,
      reply: false,
      timeAgo: new TimeAgo("en-US"),
    };
  },
  methods: {
    toggle_show_replies() {
      this.showReplies = !this.showReplies;
    },
    toggle_reply() {
      this.reply = !this.reply;
    },
  },
  computed:{
    ...mapGetters(['user'])
  },
  props: {
    data: {
      required: true,
    },
  },
};
</script>

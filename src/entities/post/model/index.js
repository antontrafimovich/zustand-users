import { getPosts } from "../../../shared";

const createPostsSlice = (set) => {
  return {
    users: { status: "pending", payload: null },
    getPosts: async (query) => {
      let result;

      try {
        const posts = await getPosts(query);
        result = {
          status: "success",
          payload: posts,
        };
      } catch (err) {
        result = {
          status: "error",
          payload: err,
        };
      }

      set({ users: result });
    },
  };
};

export { createPostsSlice };

import { create } from "zustand";

import { createPostsSlice, createUsersSlice } from "../../../entities";

export const useMainPageStore = create((...a) => ({
  ...createUsersSlice(...a),
  ...createPostsSlice(...a),
}));

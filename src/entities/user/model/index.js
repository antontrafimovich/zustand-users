import { getUsers } from "../../../shared";

const createUsersSlice = (set) => {
  return {
    users: { status: "pending", payload: null },
    getUsers: async () => {
      let result;

      try {
        const users = await getUsers();
        result = {
          status: "success",
          payload: users,
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

export { createUsersSlice };

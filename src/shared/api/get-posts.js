import { delay } from "../lib";

const getFilterQuery = (params) => {
  return Object.keys(params).reduce((result, param, index) => {
    const prefix = index === 0 ? "?" : "&";
    return result + prefix + `${param}=${params[param]}`;
  }, "");
};

const getPosts = async ({ where }) => {
  const query = getFilterQuery(where);

  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts${query}`
  );
  const resultJSON = await result.json();

  const delayed = resultJSON;

  return delayed;
};

export { getPosts };

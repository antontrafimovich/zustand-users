import { delay } from "../lib";

const getUsers = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  const resultJSON = await result.json();

  const delayed = await delay(resultJSON);

  return delayed;
};

export { getUsers };

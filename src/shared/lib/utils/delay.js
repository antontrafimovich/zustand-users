export const delay = async (payload, time = 5000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, time);
  });
};

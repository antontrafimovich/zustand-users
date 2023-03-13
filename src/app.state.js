import { create } from "zustand";

import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

const hashStorage = {
  getItem: (key) => {
    const searchParams = new URLSearchParams(document.location.hash.slice(1));
    const storedValue = searchParams.get(key);
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue) => {
    const searchParams = new URLSearchParams(document.location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    document.location.hash = searchParams.toString();
  },
  removeItem: (key) => {
    const searchParams = new URLSearchParams(document.location.hash.slice(1));
    searchParams.delete(key);
    document.location.hash = searchParams.toString();
  },
};

const inmemoryStorage = createJSONStorage(() => {
  const storage = {};

  return {
    getItem: (key) => {
      const storedValue = storage[key];
      return JSON.parse(storedValue);
    },
    setItem: (key, newValue) => {
      storage[key] = newValue;
    },
    removeItem: (key) => {
      delete storage[key];
    },
  };
});

export const useBoundStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
    }),
    {
      name: "food-storage", // unique name
      storage: inmemoryStorage,
    }
  )
);

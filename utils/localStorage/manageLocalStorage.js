"use client";

export const setItemInLocalStorage = (key, value) => {
  if (typeof window !== "undefined") localStorage.setItem(key, value);
};

export const getItemInLocalStorage = (key) => {
  if (typeof window !== "undefined") return localStorage.getItem(key);
};

export const clearLocaleStorage = () => {
  if (typeof window !== "undefined") localStorage.clear();
};

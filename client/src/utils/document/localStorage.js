const getLocalStorageValue = (key) => {
  if (typeof key !== "string") throw new Error("incorrect key");
  return JSON.parse(localStorage.getItem(key));
};

const setLocalStorageValue = (key, value) => {
  localStorage.setItem(key, value);
};

export { getLocalStorageValue, setLocalStorageValue };

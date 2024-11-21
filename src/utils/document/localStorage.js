const getLocalStorageValue = (key) => {
  if (typeof key !== "string") throw new Error("incorrect key");

  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

const setLocalStorageValue = (key, value) => {
  localStorage.setItem(key, value);
};

export { getLocalStorageValue, setLocalStorageValue };

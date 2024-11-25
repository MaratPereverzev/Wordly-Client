const getLocalStorageValue = (key: string): string | null => {
  const data = localStorage.getItem(key);

  if (data !== null) return JSON.parse(data);
  else return data;
};

const setLocalStorageValue = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export { getLocalStorageValue, setLocalStorageValue };

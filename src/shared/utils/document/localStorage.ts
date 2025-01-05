const getLocalStorageValue = (key: string): string | null => {
  const data = localStorage.getItem(key);

  try {
    if (data === null) throw data;
    return JSON.parse(data);
  } catch {
    return data;
  }
};

const setLocalStorageValue = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export { getLocalStorageValue, setLocalStorageValue };

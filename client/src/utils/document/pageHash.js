const getPageHash = () => {
  return window.location.hash.replace("#", "") !== ""
    ? window.location.hash.replace("#", "")
    : "home";
};

const setPageHash = (hash, toLocalStorage) => {
  window.location.hash = hash;
  if (toLocalStorage === true) localStorage.setItem("page", hash);
};

export { getPageHash, setPageHash };

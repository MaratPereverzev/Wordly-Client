const getPageHash = () => {
  return window.location.pathname.replace("/", "") !== ""
    ? window.location.pathname.replace("/", "")
    : "home";
};

const setPageHash = (pathname, toLocalStorage) => {
  window.history.pushState(null, null, pathname);
  if (toLocalStorage === true) localStorage.setItem("page", pathname);
};

export { getPageHash, setPageHash };

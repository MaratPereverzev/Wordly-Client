const getPageHash = () => {
  return window.location.pathname !== "/" ? window.location.pathname : "/home";
};

const setPageHash = (pathname, toLocalStorage) => {
  window.history.pushState(null, null, pathname);
  if (toLocalStorage === true) localStorage.setItem("page", pathname);
};

export { getPageHash, setPageHash };

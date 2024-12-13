const getPageHash = () => {
  return window.location.pathname !== "/" ? window.location.pathname : "/home";
};

const setPageHash = (pathname: string, toLocalStorage: boolean) => {
  window.history.pushState(null, "", pathname);
  if (toLocalStorage === true) localStorage.setItem("page", pathname);
};

export { getPageHash, setPageHash };

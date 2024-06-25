const getPageHash = () => {
  return window.location.hash.replace("#", "") !== ""
    ? window.location.hash.replace("#", "")
    : "home";
};

const setPageHash = (hash) => {
  return (window.location.hash = hash);
};

export { getPageHash, setPageHash };

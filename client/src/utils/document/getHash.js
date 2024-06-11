const getPageHash = () => {
  return window.location.hash.replace("#", "");
};

const setPageHash = (hash) => {
  return (window.location.hash = hash);
};

export { getPageHash, setPageHash };

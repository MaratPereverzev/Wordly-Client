const areAlwaysEqual = () => true;

const isObject = (obj) => typeof obj === "object" && obj !== null;

const areEqual = (prev, next) => {
  const keys1 = Object.keys(prev);
  const keys2 = Object.keys(next);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = prev[key];
    const val2 = next[key];
    const areObjects = isObject(val1) && isObject(val2);

    if ((areObjects && !areEqual(val1, val2)) || (!areObjects && val1 !== val2))
      return false;
  }
  return true;
};

export { areAlwaysEqual, areEqual, isObject };

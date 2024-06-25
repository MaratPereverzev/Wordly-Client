import { useState, useCallback } from "react";

const useRender = () => {
  const [, setRender] = useState(true);

  return useCallback(() => {
    setRender((prev) => !prev);
  }, []);
};

export { useRender };

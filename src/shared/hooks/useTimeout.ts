import { useEffect, useRef, useCallback } from "react";

export const useTimeout = (
  callback: (data?: { [index: string]: any }) => void,
  delay: number
) => {
  const callbackRef = useRef(callback);
  const callbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const timeoutDispatch = useCallback(
    (data: any) => {
      callbackTimeoutRef.current = setTimeout(() => {
        callbackRef.current(data);
      }, delay);
    },
    [delay]
  );

  const timeoutClear = useCallback(() => {
    callbackTimeoutRef.current && clearTimeout(callbackTimeoutRef.current);
  }, []);

  const timeoutReset = useCallback(
    (data?: any) => {
      timeoutClear();
      timeoutDispatch(data);
    },
    [timeoutClear, timeoutDispatch]
  );

  return { timeoutDispatch, timeoutClear, timeoutReset };
};

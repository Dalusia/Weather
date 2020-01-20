import React, { useEffect, useRef } from "react";

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback: React.MutableRefObject<() => void> = useRef(() => {});

  // Remember the latest callback, NB: function MUST return undefined
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

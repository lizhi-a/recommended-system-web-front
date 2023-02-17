import { useRef, useEffect } from 'react';

const useInterval = (callback: () => void, delay: number, exec = true) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (exec) {
        if (savedCallback.current) {
          savedCallback.current();
        }
      }
    }
    if (delay !== null) {
      tick();
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => {};
  }, [delay, exec]);
};

export default useInterval;

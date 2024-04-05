import { useLayoutEffect, useRef, useState } from 'react';

export const useIsOverflow = <T extends HTMLElement = HTMLElement>(): [React.RefObject<T>, boolean] => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const ref = useRef<T>(null);
  const scrollWidth = ref.current?.scrollWidth;

  useLayoutEffect(() => {
    const { current } = ref;
    if (current) {
      const hasOverflow = current.scrollWidth > current.clientWidth;
      setIsOverflow(hasOverflow);
    }
  }, [scrollWidth]);

  return [ref, isOverflow];
};

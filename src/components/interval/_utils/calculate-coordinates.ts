import { MutableRefObject } from 'react';
export const calculateCoordinates = (
  el: HTMLElement,
  paramVar: MutableRefObject<{
    left: number;
    length: number;
  }>,
) => {
  if (!el || !paramVar.current) {
    return;
  }
  const { left, right } = el.getBoundingClientRect();
  const length = right - left;
  return { left, length };
};


import { IntervalsType } from '../../interval/_types';
import { MutableRefObject } from 'react';
export const calculateMobileBadgePosition = (
  startPosition: IntervalsType,
  endPosition: IntervalsType,
  startChosedRefParamsRef,
  endChosedRefParamsRef: MutableRefObject<{
    left: number;
    length: number;
  }>,
  firstIntervalParamsRef: MutableRefObject<{
    left: number;
    length: number;
  }>,
  firstPseudoIntervalLength: number,
) => {
  if (
    endPosition ||
    (startPosition &&
      !endPosition &&
      endChosedRefParamsRef &&
      endChosedRefParamsRef.current.left)
  ) {
    return (
      (endChosedRefParamsRef.current.left -
        startChosedRefParamsRef.current.left) /
        2 +
      startChosedRefParamsRef.current.left -
      firstIntervalParamsRef.current.left +
      firstPseudoIntervalLength
    );
  }

  if (
    startPosition ||
    (!startPosition && startChosedRefParamsRef.current.left)
  ) {
    return (
      startChosedRefParamsRef.current.left -
      firstIntervalParamsRef.current.left +
      firstPseudoIntervalLength
    );
  }
};

import { IntervalsType } from '../../_types';

export const getBadgePreposition = (
  startPosition: IntervalsType,
  endPosition: IntervalsType,
  interval: IntervalsType,
) => {
  if (startPosition && startPosition.value === interval.value) {
    return 'c ';
  }
  if (endPosition && endPosition.value === interval.value) {
    return 'по ';
  }
};

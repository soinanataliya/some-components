import { IntervalsType } from '../../interval/_types';

export const getInterval = (
  intervalIndex: number,
  position,
  isEndPosition: boolean,
  intervalConfig,
): IntervalsType => {
  const index = intervalConfig.indexOf(position);

  if (isEndPosition) {
    if (intervalIndex <= index) {
      return intervalConfig[index + 1];
    }

    const { length } = intervalConfig;
    return intervalConfig[intervalIndex >= length ? length - 1 : intervalIndex];
  }

  if (intervalIndex >= index) {
    return intervalConfig[index - 1];
  }
  return intervalConfig[intervalIndex < 1 ? 0 : intervalIndex];
};

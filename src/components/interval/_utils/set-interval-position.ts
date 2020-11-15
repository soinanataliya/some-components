import { IntervalsType } from '../_types';

type FunctionType = {
  interval: IntervalsType | null;
  isStart: boolean;
  onChangeArg: {
    [key: string]: IntervalsType;
  };
  toChangeIntervals?: boolean;
};

type IntervalPositionType = FunctionType;


export const setIntervalPosition = ({
  interval,
  startPosition,
  endPosition,
}): IntervalPositionType => {
  const currValue = interval.value;
  const startChosed = startPosition !== null;
  const endChosed = endPosition !== null;
  const startPositionValue = startPosition && startPosition.value;
  const endPositionValue = endPosition && endPosition.value;

  if (!startChosed && !endChosed) {
    // если начало и конец еще не выбраны
    return {
      interval,
      isStart: true,
      onChangeArg: { start: interval, end: endPosition },
    };
  }

  if (startChosed && !endChosed) {
    // начало выбрано, конец нет
    if (currValue === startPositionValue) {
      return {
        interval: null,
        isStart: true,
        onChangeArg: { start: null, end: endPosition },
      };
    }
    if (currValue > startPositionValue) {
      return {
        interval,
        isStart: false,
        onChangeArg: { start: startPosition, end: interval },
      };
    }
    return {
      interval,
      isStart: true,
      onChangeArg: { start: interval, end: endPosition },
    };
  }

  if (!startChosed && endChosed) {
    // конец выбран, начало не выбрано
    if (currValue === endPositionValue) {
      return {
        interval: null,
        isStart: false,
        toChangeIntervals: true,
        onChangeArg: { start: null, end: endPosition },
      };
    }

    if (currValue > startPositionValue) {
      return {
        interval,
        isStart: false,
        onChangeArg: { start: startPosition, end: interval },
      };
    }
    return {
      interval,
      isStart: true,
      onChangeArg: { start: interval, end: endPosition },
    };
  }

  if (startChosed && endChosed) {
    // выбраны оба

    if (currValue === startPositionValue) {
      // убрать начальный интервал если он совпадает
      return {
        interval,
        isStart: false,
        toChangeIntervals: true,
        onChangeArg: { start: endPosition, end: null },
      };
    }
    if (currValue === endPositionValue) {
      // убрать конечный интервал если он совпадает
      return {
        interval: null,
        isStart: false,
        onChangeArg: { start: startPosition, end: null },
      };
    }

    if (currValue > endPositionValue) {
      return {
        interval,
        isStart: false,
        onChangeArg: { start: startPosition, end: interval },
      };
    }
    return {
      interval,
      isStart: true,
      onChangeArg: { start: interval, end: endPosition },
    };
  }
};


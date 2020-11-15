/* eslint-disable react/prop-types */
import React, {
  useMemo,
  MouseEvent,
  MutableRefObject,
  forwardRef,
  useCallback,
  RefObject,
} from 'react';
import classnames from 'classnames/bind';
import { IntervalsType } from '../../_types';
import { ArrowBadge } from '../arrow-badge';
import { getBadgePreposition } from './_utils';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  intervalConfigLength: number;
  interval: IntervalsType;
  index: number;
  startPosition: IntervalsType;
  endPosition: IntervalsType;
  setPosition: (interval: IntervalsType, el?: EventTarget) => void;
  onMouseDown: (
    event: MouseEvent<HTMLDivElement>,
    interval: IntervalsType,
  ) => void;
};

type RefType = {
  intervalRef: MutableRefObject<HTMLDivElement>;
  startChosedRef: MutableRefObject<HTMLDivElement>;
  endChosedRef: MutableRefObject<HTMLDivElement>;
};

const CLASS_NAME = 'Step';

export const Step = forwardRef<RefType, PropsType>(
  (
    {
      intervalConfigLength,
      interval,
      index,
      startPosition,
      endPosition,
      setPosition,
      onMouseDown,
    },
    ref: RefObject<RefType>,
  ) => {
    const isFirstChosen =
      interval.value === (startPosition && startPosition.value);
    const isLastChosen = interval.value === (endPosition && endPosition.value);
    const isChosen = useMemo(() => isFirstChosen || isLastChosen, [
      isFirstChosen,
      isLastChosen,
    ]);
    const isStepInRange = useMemo(
      () =>
        startPosition &&
        endPosition &&
        interval.value >= startPosition.value &&
        interval.value < endPosition.value,
      [interval, startPosition, endPosition],
    );
    const isDivisionInRange = useMemo(
      () =>
        startPosition &&
        endPosition &&
        interval.value > startPosition.value &&
        interval.value < endPosition.value,
      [interval, startPosition, endPosition],
    );

    const text: string = useMemo(
      () =>
        getBadgePreposition(startPosition, endPosition, interval) +
        interval.title,
      [startPosition, endPosition, interval],
    );

    const setDatePosition = useCallback(
      (event: MouseEvent<HTMLDivElement>) =>
        setPosition(interval, event.target),
      [setPosition, interval],
    );

    const handleMouseDown = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => onMouseDown(event, interval),
      [interval, onMouseDown],
    );

    const isIntervalRef = useMemo(
      () => (index === 0 ? ref.current.intervalRef : null),
      [index, ref],
    );
    const intervalChosedRef = useMemo(
      () =>
        (isFirstChosen ? ref.current.startChosedRef : null) ||
        (isLastChosen ? ref.current.endChosedRef : null),
      [isFirstChosen, isLastChosen, ref],
    );

    return (
      <div
        ref={isIntervalRef}
        className={cn(`${CLASS_NAME}`)}
        onClick={setDatePosition}
        role="button"
        tabIndex={0}
      >
        <div
          ref={intervalChosedRef}
          className={cn(`${CLASS_NAME}__step`, {
            [`${CLASS_NAME}__step--last`]: index === intervalConfigLength - 1,
            [`${CLASS_NAME}__step--in-range`]: isStepInRange,
          })}
        >
          {interval.isSeen && (
            <div className={cn(`${CLASS_NAME}__time`)}>
              {interval.title}
            </div>
          )}
        </div>
        <div
          className={cn(`${CLASS_NAME}__division`, {
            [`${CLASS_NAME}__division--choosed`]: isChosen,
            [`${CLASS_NAME}__division--in-range`]: isDivisionInRange,
          })}
          onMouseDown={handleMouseDown}
          role="button"
          tabIndex={0}
        >
          {isChosen && (
            <div className={cn(`${CLASS_NAME}__badge`)}>
              <ArrowBadge text={text} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

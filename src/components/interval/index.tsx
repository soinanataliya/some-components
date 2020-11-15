import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  MouseEvent as SyntheticMouseEvent,
  MutableRefObject,
  useCallback,
} from 'react';
import classnames from 'classnames/bind';

import { TABLET_WIDTH } from '../../constants';
import { calculateMobileBadgePosition } from './_utils/calculate-mobile-badge-position';
import { getInterval } from './_utils/get-interval';
import { calculateCoordinates } from './_utils/calculate-coordinates';
import { getWindowSizeType } from './_utils/get-window-size-type';
import {
  FIRST_PSEUDO_INTERVAL_LENGTH,
} from './_constants';
import { setIntervalPosition } from './_utils/set-interval-position'
import styles from './index.module.scss';
import { Step } from './_components/step';
import { IntervalsType } from './_types';
import { ArrowBadge } from './_components/arrow-badge';

const cn = classnames.bind(styles);


type PropsType = {
  intervalConfig: Array<IntervalsType>;
  input?: {
    value: {
      startPosition: IntervalsType;
      endPosition: IntervalsType;
    };
    onChange: (interval: {
      startPosition: IntervalsType;
      endPosition: IntervalsType;
    }) => void;
  };
};

const CLASS_NAME = 'Interval-component';


export const Interval = ({
  intervalConfig,
  input,
}: PropsType) => {
  const { onChange } = input || {};
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [mobileBadgePosition, setMobileBadgePosition] = useState(0);

  const firstIntervalRef = useRef<HTMLDivElement>(null);
  const startChosedRef = useRef<HTMLDivElement>(null);
  const endChosedRef = useRef<HTMLDivElement>(null);
  const transitRef = useRef<{
    intervalRef: MutableRefObject<HTMLDivElement>;
    startChosedRef: MutableRefObject<HTMLDivElement>;
    endChosedRef: MutableRefObject<HTMLDivElement>;
  }>({
    intervalRef: firstIntervalRef,
    startChosedRef,
    endChosedRef,
  });

  const firstIntervalParamsRef = useRef({
    left: 0,
    length: 0,
  });

  const startChosedRefParamsRef = useRef({
    left: 0,
    length: 0,
  });

  const endChosedRefParamsRef = useRef({
    left: 0,
    length: 0,
  });

  const MOBILE_POINT = 480;
  const TABLET_POINT = 1024;

  const setCoordinates = useCallback(
    (
      el: HTMLElement,
      paramVar: MutableRefObject<{
        left: number;
        length: number;
      }>,
    ) => {
      const params = calculateCoordinates(el, paramVar);
      if (params) {
        const { left, length } = params;
        paramVar.current = { ...paramVar.current, left, length }; // eslint-disable-line no-param-reassign
      }
    },
    [],
  );

  const [width, updateDimensions] = useState(window.innerWidth);

  const windowSizeType = useMemo(
    () => getWindowSizeType(width, MOBILE_POINT, TABLET_POINT),
    [width],
  );

  useEffect(() => {
    setCoordinates(firstIntervalRef.current, firstIntervalParamsRef);
    if (windowSizeType !== 'desktop') {
      setCoordinates(startChosedRef.current, startChosedRefParamsRef);
      setCoordinates(endChosedRef.current, endChosedRefParamsRef);
    }
  }, [setCoordinates, windowSizeType]);

  const intervalConfigLength = useMemo(() => intervalConfig.length, [
    intervalConfig,
  ]);

  const getMobileBadgePosition = useCallback(() => {
    return calculateMobileBadgePosition(
      startPosition,
      endPosition,
      startChosedRefParamsRef,
      endChosedRefParamsRef,
      firstIntervalParamsRef,
      FIRST_PSEUDO_INTERVAL_LENGTH,
    );
  }, [
    startPosition,
    endPosition,
    startChosedRefParamsRef,
    endChosedRefParamsRef,
    firstIntervalParamsRef,
  ]);

  useEffect(() => {
    const resizeHandler = () => {
      updateDimensions(window.innerWidth);
      setCoordinates(firstIntervalRef.current, firstIntervalParamsRef);
      if (windowSizeType !== 'desktop') {
        setCoordinates(startChosedRef.current, startChosedRefParamsRef);
        setCoordinates(endChosedRef.current, endChosedRefParamsRef);
        setMobileBadgePosition(getMobileBadgePosition());
      }
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [setCoordinates, getMobileBadgePosition, windowSizeType]);

  const setPosition = (interval: IntervalsType, el?: HTMLElement) => {
    const result = setIntervalPosition({
      interval,
      startPosition,
      endPosition,
    });
    const { isStart, toChangeIntervals } = result;
    if (toChangeIntervals) {
      setStartPosition(endPosition);
      setEndPosition(null);
      if (windowSizeType !== 'desktop') {
        setCoordinates(startChosedRef.current || el, startChosedRefParamsRef);
        setCoordinates(endChosedRef.current || el, endChosedRefParamsRef);
        setMobileBadgePosition(
          calculateMobileBadgePosition(
            endPosition,
            null,
            endChosedRefParamsRef,
            null,
            firstIntervalParamsRef,
            FIRST_PSEUDO_INTERVAL_LENGTH,
          ),
        );
      }
    } else {
      const positionMethod = isStart ? setStartPosition : setEndPosition;
      positionMethod(result.interval);
      if (windowSizeType !== 'desktop') {
        setCoordinates(startChosedRef.current || el, startChosedRefParamsRef);
        setCoordinates(endChosedRef.current || el, endChosedRefParamsRef);
        setMobileBadgePosition(getMobileBadgePosition());
      }
    }

    onChange && onChange({
      startPosition: result.onChangeArg.start,
      endPosition: result.onChangeArg.end,
    });
  };

  const handleMouseDown = (
    mouseDownEvent: SyntheticMouseEvent<HTMLDivElement>,
    interval: IntervalsType,
  ) => {
    mouseDownEvent.stopPropagation();
    const isEndPosition = endPosition && interval.value === endPosition.value;
    const shiftX =
      mouseDownEvent.clientX -
      (mouseDownEvent.target as HTMLElement).getBoundingClientRect().left;

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const lengthToStep = mouseMoveEvent.pageX - shiftX;
      const intervalIndex = Math.round(
        (lengthToStep - firstIntervalParamsRef.current.left) /
          firstIntervalParamsRef.current.length,
      );

      if (isEndPosition) {
        const newInterval = getInterval(
          intervalIndex,
          startPosition,
          true,
          intervalConfig,
        );
        setEndPosition(newInterval);
        onChange && onChange({ startPosition, endPosition: newInterval });
        if (windowSizeType !== 'desktop') {
          setCoordinates(startChosedRef.current, startChosedRefParamsRef);
          setCoordinates(endChosedRef.current, endChosedRefParamsRef);
          setMobileBadgePosition(getMobileBadgePosition());
        }
        return;
      }

      const newInterval = getInterval(
        intervalIndex,
        endPosition,
        false,
        intervalConfig,
      );
      setStartPosition(newInterval);
      onChange && onChange({ startPosition: newInterval, endPosition });
      if (windowSizeType !== 'desktop') {
        setCoordinates(startChosedRef.current, startChosedRefParamsRef);
        setCoordinates(endChosedRef.current, endChosedRefParamsRef);
        setMobileBadgePosition(getMobileBadgePosition());
      }
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener(
      'mouseup',
      () => {
        document.body.removeEventListener('mousemove', onMouseMove);
      },
      { once: true },
    );
  };

  return (
    <>
      <div className={cn(CLASS_NAME)}>
        <div className={cn(`${CLASS_NAME}__start`)} />
        {intervalConfig.map((interval, index) => (
          <Step
            key={interval.title}
            ref={transitRef}
            endPosition={endPosition}
            index={index}
            interval={interval}
            intervalConfigLength={intervalConfigLength}
            onMouseDown={handleMouseDown}
            setPosition={setPosition}
            startPosition={startPosition}
          />
        ))}
        {width <= TABLET_WIDTH && startPosition && (
          <div className={cn(`${CLASS_NAME}__badge`)}>
            <ArrowBadge
              style={{ left: mobileBadgePosition }}
              text={`с ${startPosition.title} по  ${(endPosition &&
                endPosition.title) ||
                ''}`}
            />
          </div>
        )}
      </div>
    </>
  );
};

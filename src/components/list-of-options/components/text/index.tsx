import React, { Props, memo } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  text: string;
  size: FontSizeType;
  color: FontColorType;
  isBold?: boolean;
  isCentered?: boolean;
  isUpperCase?: boolean;
  classname?: string;
} & Props<any>;

export type FontSizeType = 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
export type FontColorType =
  | 'Orange'
  | 'DarkPurple'
  | 'Purple'
  | 'Green'
  | 'SuperDuperLightPurple'
  | 'Red'
  | 'LightRed'
  | 'LightYellow'
  | 'LightBlue'
  | 'Black'
  | 'White'
  | 'RichGrey'
  | 'Grey'
  | 'LightGrey';

export const Text = memo(
  ({
    text,
    size,
    color,
    isBold,
    isCentered,
    isUpperCase,
    classname,
  }: PropsType) => (
    <span
      className={cn('text', {
        [`size-${size}`]: Boolean(size),
        [`color-${color}`]: Boolean(color),
        isBold,
        isCentered,
        isUpperCase,
        [classname]: Boolean(classname),
      })}
    >
      {text}
    </span>
  ),
);

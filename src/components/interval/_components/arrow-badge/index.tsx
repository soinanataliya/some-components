import React, { CSSProperties } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  text: string;
  style?: CSSProperties;
};

const CLASS_NAME = 'Arrow-badge';

export const ArrowBadge = ({ text, style }: PropsType) => {
  return (
    <>
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div className={cn(`${CLASS_NAME}`)} style={style}>
        <div className={cn(`${CLASS_NAME}__badge`)}>
          {text}
        </div>
        <div className={cn(`${CLASS_NAME}__arrow`)} />
      </div>
    </>
  );
};

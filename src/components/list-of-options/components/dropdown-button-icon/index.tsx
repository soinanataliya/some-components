import React, { memo } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

export const DropdownButtonIcon = memo(
  () => (
    <div
      className={cn('DropdownButtonIcon')}
    >
      <svg
        fill="none"
        height="6"
        viewBox="0 0 10 6"
        width="10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 1.00002L5.00002 5L1.00004 1.00002"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.15483"
        />
      </svg>
    </div>
  ),
);

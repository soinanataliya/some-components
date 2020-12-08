import React, { Props, memo, useCallback, ChangeEvent } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

interface IProps extends Props<any> {
  checked?: boolean;
  onChange?: (optionChangeEvent: CheckboxChangeEventType) => void;
  color?: string;
  disabled?: boolean;
  id: string;
  name: string;
}

export type CheckboxChangeEventType = {
  event: ChangeEvent<HTMLInputElement>;
  value: boolean;
  name?: string;
};


export const Checkbox = memo(
  ({  checked, onChange, disabled, color, id, name }: IProps) => {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { checked: changeChecked } = event.currentTarget;

        if (!disabled) {
          onChange({ event, value: changeChecked, name });
        }
      },
      [disabled, name, onChange],
    );

    return (
      <label className={cn('checkboxContainer')}>
        <input
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          type="checkbox"
          id={id}
          name={name}
        />
        <span
          className={cn('checkboxIcon', {
            [`color-${color}`]: Boolean(color),
          })}
        >
          <svg
            fill="none"
            height="10"
            viewBox="0 0 14 10"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.75722 3.99473C1.43179 3.66929 0.90415 3.66929 0.578713 3.99473C0.253276 4.32017 0.253276 4.8478 0.578713 5.17324L1.75722 3.99473ZM5.33464 8.75065L4.74538 9.33991C4.90733 9.50186 5.12881 9.59002 5.35776 9.58366C5.58671 9.57731 5.80295 9.477 5.95567 9.30631L5.33464 8.75065ZM13.039 1.38965C13.3459 1.04666 13.3166 0.519834 12.9736 0.21295C12.6306 -0.0939339 12.1038 -0.0646659 11.7969 0.278322L13.039 1.38965ZM0.578713 5.17324L4.74538 9.33991L5.92389 8.1614L1.75722 3.99473L0.578713 5.17324ZM5.95567 9.30631L13.039 1.38965L11.7969 0.278322L4.7136 8.19499L5.95567 9.30631Z"
              fill="white"
            />
          </svg>
        </span>
      </label>
    );
  },
);

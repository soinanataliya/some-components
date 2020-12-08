import { ChangeEvent, RefObject, KeyboardEvent, SyntheticEvent } from 'react';

export type CheckboxChangeEventType = {
  event: ChangeEvent<HTMLInputElement>;
  value: boolean;
  name?: string;
};

export type CheckboxClickEventType = {
  event: SyntheticEvent<HTMLElement>;
};

export type CheckboxKeyPressEventType = {
  event: KeyboardEvent<HTMLInputElement>;
};

export type CheckboxProps = {
  checked?: boolean;
  checkboxRef?: RefObject<HTMLInputElement>;
  color?: string;
  disabled?: boolean;
  id: string;
  indeterminate?: boolean;
  name: string;
  onClick?: (optionChangeEvent: CheckboxClickEventType) => void;
  onChange?: (optionChangeEvent: CheckboxChangeEventType) => void;
  onKeyPress?: (optionKeyPressEvent: CheckboxKeyPressEventType) => void;
  toggle?: boolean;
};

export type CheckboxState = {
  isActive: boolean;
};

import React, {
  memo,
  useMemo,
  useCallback,
  useState,
  SyntheticEvent,
} from 'react';
import classnames from 'classnames/bind';
import { uniqueId } from 'lodash-es';
import { Checkbox } from '../checkbox';
import { Text } from '../text';
import { DropdownButtonIcon } from '../dropdown-button-icon';
import { ListItemType } from '../../mock';
import styles from './index.module.scss';

const cn = classnames.bind(styles);
const CLASS_NAME = 'Nested-list-item';

type PropsType = {
  listItem: ListItemType;
  depth?: number;
  onPermissionValueChange: (
    event: SyntheticEvent<HTMLInputElement>,
    checked: boolean,
    listItem: ListItemType,
  ) => void;
};

export const NestedList = memo(
  ({
    listItem,
    depth = 0,
    onPermissionValueChange,
  }: PropsType) => {
    const { childrenItems, name: title, id } = listItem;
    const [isItemOpen, setChildrenVisibility] = useState(true);
    const isChecked = useMemo(() => Boolean(listItem.checked), [
      listItem.checked,
    ]);
    const hasNestedList: boolean = useMemo(
      () => childrenItems && Boolean(childrenItems.length),
      [childrenItems],
    );
    const isNestedListVisible: boolean = useMemo(
      () => isItemOpen && hasNestedList,
      [hasNestedList, isItemOpen],
    );
    const newDepth: number = useMemo(() => depth + 1, [depth]);

    const spacers = useMemo(() => {
      const spacersArray: Array<JSX.Element> = [];
      let counter: number = depth;
      while (Boolean(counter)) {
        spacersArray.push(
          <span
            key={uniqueId('spacer_')}
            className={cn(`${CLASS_NAME}__spacer`)}
          />,
        );
        counter -= 1;
      }

      return spacersArray;
    }, [depth]);

    const handleItemClick = useCallback(
      () => setChildrenVisibility(!isItemOpen),
      [isItemOpen],
    );

    const handleCheckboxWrapperClick = useCallback(
      (event: SyntheticEvent<HTMLElement>) => event.stopPropagation(),
      [],
    );

    const handlePermissionValueChange = useCallback(
      ({ event, value }) => {
        onPermissionValueChange(event, value, listItem);
      },
      [listItem, onPermissionValueChange],
    );

    return (
      <div className={cn(CLASS_NAME)}>
        <button
          className={cn(`${CLASS_NAME}__show-content-button`)}
          onClick={handleItemClick}
          type="button"
        >
          {spacers}
          <span
            className={cn(`${CLASS_NAME}__checkbox-wrapper`)}
            onClick={handleCheckboxWrapperClick}
            role="button"
            tabIndex={0}
          >
            <Checkbox
              checked={isChecked}
              id={`${id}`}
              name={`${id}`}
              onChange={handlePermissionValueChange}
            />
          </span>
          <Text color="Black" size="h4" text={title} />
          {hasNestedList &&
            (isItemOpen ? (
              <div className={cn(`${CLASS_NAME}__arrow-wrapper`)}>
                <DropdownButtonIcon />
              </div>
            ) : (
              <div className={cn(`${CLASS_NAME}__arrow-wrapper`)}>
                <DropdownButtonIcon />
              </div>
            ))}
        </button>
        {isNestedListVisible &&
          childrenItems.map((item: ListItemType) => (
            <NestedList
              key={item.id}
              depth={newDepth}
              listItem={item}
              onPermissionValueChange={onPermissionValueChange}
            />
          ))}
      </div>
    );
  },
);

import React, { memo, SyntheticEvent, useState } from 'react';
import { NestedList } from './components/nested-list';
import { ListItemType } from './mock';
import { formListItem, addParentsChecks } from './utils';

type PropsType = {
  option: ListItemType;
};

export const ListOfOptions = memo(({ option }: PropsType) => {
  const [listItem, setListItem] = useState<ListItemType>(() =>
    formListItem(option),
  );

  const handlePermissionValueChange = (
    event: SyntheticEvent<HTMLInputElement>,
    checked: boolean,
    newListItem: ListItemType,
  ) => {
    event.stopPropagation();
    // eslint-disable-next-line no-param-reassign
    newListItem.checked = checked;
    addParentsChecks(listItem, newListItem, checked);

    setListItem({ ...listItem });
  };

  return (
    <NestedList
      listItem={listItem}
      onPermissionValueChange={handlePermissionValueChange}
    />
  );
});

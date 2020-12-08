
import { ResponseType, ListItemType } from './mock';

// функция мутирует массив list
export const formListItem = (list: ResponseType): ListItemType => {
  const updateChildren = () => {
    const newList = { ...list, checked: false } as ListItemType;

    if (newList.childrenItems && newList.childrenItems.length) {
      const newChildren = newList.childrenItems.map(child =>
        formListItem(child),
      );

      return { ...newList, childrenItems: newChildren };
    }

    return newList;
  };

  const updateParents = (
    item: ListItemType,
    parent: ListItemType | null = null,
  ) => {
    if (item.childrenItems && item.childrenItems.length) {
      const newChildrenItems = item.childrenItems.map((child: ListItemType) =>
        updateParents(child, item),
      );

      // eslint-disable-next-line no-param-reassign
      item.childrenItems = newChildrenItems;
    }

    // eslint-disable-next-line no-param-reassign
    item.parent = parent;

    return item;
  };

  const newItem = updateChildren();

  return updateParents(newItem);
};

const setCheckedToParent = (item: ListItemType, checked: boolean) => {
  if (!item.parent) {
    return;
  }

  if (checked) {
    // eslint-disable-next-line no-param-reassign
    item.parent.checked = true;

    return;
  }

  if (!item.parent.childrenItems.some((child: ListItemType) => child.checked)) {
    // eslint-disable-next-line no-param-reassign
    item.parent.checked = false;
  }
};

export const addParentsChecks = (
  listItem: ListItemType,
  currListItem: ListItemType,
  checked: boolean,
) => {
  if (currListItem.id === listItem.id) {
    return;
  }

  setCheckedToParent(currListItem, checked);
};

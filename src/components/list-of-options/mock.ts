export const listItem = 
  {
    id: 1,
    name: 'Москва и Московская область',
    childrenItems: [
      {
        id: 2,
        name: 'Москва',
        childrenItems: [
          {
            id: 3,
            name: 'ЦАО',
            childrenItems: null,
          },
          {
            id: 4,
            name: 'CАО',
            childrenItems: null,
          },
          {
            id: 5,
            name: 'ЗАО',
            childrenItems: null,
          },
        ],
      },
      {
        id: 6,
        name: 'Московская область',
        childrenItems: null,
      },
    ],
  };

export type ResponseType = {
  id: number;
  name: string;
  childrenItems: Array<ResponseType> | null;
};

export type ListItemType = ResponseType & {
  checked?: boolean;
  parent?: ListItemType | null;
  childrenItems?: Array<ListItemType> | null;
};

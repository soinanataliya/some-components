
export type ColumnType = {
  children?: Array<ChildType>;
  text: string;
  columnContent?: number;
  parentId?: number;
};
export type ChildType = {
  text: string;
  columnContent?: number;
  parentId?: number;
};

export type TableSalesVisibilityType = { [key: number]: Array<number> | null };

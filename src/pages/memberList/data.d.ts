export interface TableListItem {
  id:string;
  name:string;
  sex:string,
  ethic:string,
  class?:string,
  policitalStatus:string,
  phone:string,
  birth:string,
  joinTime:date,
  positiveTime?:date,
  department:number,
  isBCmember?:boolean,
  activities:Activity[]
}

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

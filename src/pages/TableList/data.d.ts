export type TableListItem = {
  name: string;
  theme:string;
  id:number;
  activityType:number;
  method:number;
  time:number;
  startTime:string,
  endTime:string,
  leader:string,
  status:number,
  updatedTime:string
};

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

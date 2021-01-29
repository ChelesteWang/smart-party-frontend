export interface BasicGood {
  id: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
}

export interface BasicProgress {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}

export interface BasicProfileDataType {
  basicGoods: BasicGood[];
  basicProgress: BasicProgress[];
}
export interface Activity{
  index:number,
  name:string,
  role:string,
  type:string,
  startTime:string,
  endTime:string,
  cost: string,
  score: number,
  memo:string
}
//党员个人资料数据类型
export interface Profile {
  id:number;
  name:string;
  sex:string,
  ethic:string,
  class?:string,
  policitalStatus:string,
  phone:string,
  birth:string,
  joinTime:string,
  positiveTime?:string,
  department:string,
  isBCmember?:boolean,
  activities:Activity[]
}

export interface ProfileDataType {
  Detail:Profile
}
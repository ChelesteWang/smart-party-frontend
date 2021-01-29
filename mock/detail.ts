import { Request, Response } from 'express';

const getDetails = (req: Request, res: Response) => {
  //ethic ：民族
  //policitalStatus：政治面貌
  //positiveTime：转正时间
  //isBCmember：是否是支部委员
  res.json([
    {
      id: '000000001',
      name:'王大锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000002',
      name:'王二锤',
      sex:'男',
      ethic:'苗族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000003',
      name:'王三锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000004',
      name:'王四锤',
      sex:'男',
      ethic:'土家族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000005',
      name:'王大锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000006',
      name:'王大锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000007',
      name:'王大锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000008',
      name:'王大锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000009',
      name:'王大锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000010',
      name:'王大锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
      id: '000000011',
      name:'王大锤',
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-03-11',
      joinTime:'2020-01-01',
      positiveTime:'2021-01-01',
      department:'电子信息教职工支部',
      isBCmember:true,
      activities:[]
    },
    {
        name:'王大锤',
        sex:'男',
        ethic:'汉族',
        class:'1班',
        policitalStatus:'中共党员',
        phone:'1310000xxxx',
        birth:'1996-03-11',
        joinTime:'2020-01-01',
        positiveTime:'2021-01-01',
        department:'电子信息教职工支部',
        isBCmember:true,
        activities:[]
    },
  ]);
};

const getOneDetails = (req: Request, res: Response) => {
    res.json(
      {
        status: 'ok',
        code: 200,
        data:{
            id: '000000001',
            name:'王大锤',
            sex:'男',
            ethic:'汉族',
            class:'1班',
            policitalStatus:'中共党员',
            phone:'1310000xxxx',
            birth:'1996-03-11',
            joinTime:'2020-01-01',
            positiveTime:'2021-01-01',
            department:'电子信息教职工支部',
            isBCmember:true,
            activities:[
                {
                    index:1,
                    name:'支教',
                    role:'负责人',
                    type:'党组织生活',
                    startTime:'2017-10-01 14:00',
                    endTime:'2017-10-02 14:00',
                    cost: '24',
                    score: 90,
                    memo:'无'
                  },
                  {
                    index:2,
                    name:'支教',
                    role:'负责人',
                    type:'党组织生活',
                    startTime:'2017-10-01 14:00',
                    endTime:'2017-10-02 14:00',
                    cost: '24',
                    score: 90,
                    memo:'无'
                  },
                  {
                    index:3,
                    name:'支教',
                    role:'负责人',
                    type:'党组织生活',
                    startTime:'2017-10-01 14:00',
                    endTime:'2017-10-02 14:00',
                    cost: '24',
                    score: 90,
                    memo:'无'
                  },
                  {
                    index:4,
                    name:'支教',
                    role:'负责人',
                    type:'党组织生活',
                    startTime:'2017-10-01 14:00',
                    endTime:'2017-10-02 14:00',
                    cost: '24',
                    score: 90,
                    memo:'无'
                  },
                  {
                    index:5,
                    name:'支教',
                    role:'负责人',
                    type:'党组织生活',
                    startTime:'2017-10-01 14:00',
                    endTime:'2017-10-02 14:00',
                    cost: '24',
                    score: 90,
                    memo:'无'
                  },
            ]
        }
      },
    );
  };

export default {
  'GET /api/details': getDetails,
  'GET /api/details/1':getOneDetails,
};

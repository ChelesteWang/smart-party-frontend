// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from '@/pages/memberList/data';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      name: `王${index}锤`,
      id: `0000000${index}`,
      department: Math.floor(Math.random() * 10) % 4,
      sex:'男',
      ethic:'汉族',
      class:'1班',
      policitalStatus:'中共党员',
      phone:'1310000xxxx',
      birth:'1996-01',
      joinTime: '2020-01-01',
      positiveTime: '2021-01-01',
      isBCmember:true,
      activities:[{
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
      }]
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as TableListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const sorter = JSON.parse(params.sorter as any);
  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}



export default {
  'GET /api/member': getRule,
  'POST /api/member': postRule,
};

export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                name: '事件处理',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                name: '添加党员',
                icon: 'table',
                path: 'basic-form',
                component: './basic-form',
              },
              {
                name: '添加党组织',
                icon: 'table',
                path: 'partyBranch',
                component: './partyBranch',
              },
              {
                name: '添加事件',
                icon: 'table',
                path: 'advanced-form',
                component: './advanced-form',
              },
              {
                name: '党员详情页',
                icon: 'table',
                path: '/basic',
                component: './basic',
              },
              {
                name: '组织构成',
                icon: 'table',
                path: 'tree',
                component: './tree',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];

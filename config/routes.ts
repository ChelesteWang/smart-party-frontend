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
                redirect: '/detail',
              },
              {
                name: '欢迎页',
                icon: 'barChart',
                path: '/detail',
                component: './detail',
              },
              {
                name: '支部详情',
                icon: 'SolutionOutlined',
                path: '/branchlist',
                component: './branchlist',
              },
              {
                name: '党务管理',
                icon: 'userAdd',
                path: 'partymanage',
                authority: ['admin'],
                routes: [{
                  path: '/',
                  redirect: '/partymember',
                }, {
                  name: '添加党员',
                  path: 'partymember',
                  component: './basic-form',
                }, {
                  name: '添加党组织',
                  path: 'partyBranch',
                  component: './partybranch',
                },]
              },
              {
                name: '活动申报',
                icon: 'form',
                path: 'advanced-form',
                component: './advanced-form',
              },
              // {
              //   name: '党员详情页',
              //   icon: 'solution',
              //   path: '/basic',
              //   component: './basic',
              // },
              // {
              //   name: '党员详情页',
              //   icon: 'solution',
              //   path: '/memberlist',
              //   component: './memberList',
              // },
              {
                name: '活动审批',
                icon: 'audit',
                path: '/list',
                component: './TableList',
              },
              {
                // name: '党员详情页',
                path: '/basic',
                component: './basic',
              },
              {
                // name: '党员列表页',
                path: '/memberlist',
                component: './memberlist',
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

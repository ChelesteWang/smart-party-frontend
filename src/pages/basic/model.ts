import { Effect, Reducer } from 'umi';

import { Profile } from './data.d';
// import { queryBasicProfile } from './service';
import { queryProfile } from './service';
export interface StateType {
  Detail:Profile;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'profileAndbasic',
  state: {
    Detail:{
        id: 1,
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
    },
  },
  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryProfile);
      if (response.code === 200){
        // console.log('response',response.data)
        yield put({
          type: 'show',
          payload: {
            Detail:response.data
          },
        });
      }
      
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;

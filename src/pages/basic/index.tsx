import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { BasicProfileDataType } from './data.d';
import styles from './style.less';

const progressColumns = [
  
  {
    title: '活动角色',
    dataIndex: 'role',
    key: 'role',
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   key: 'status',
  //   render: (text: string) => {
  //     if (text === 'success') {
  //       return <Badge status="success" text="成功" />;
  //     }
  //     return <Badge status="processing" text="进行中" />;
  //   },
  // },

  {
    title: '活动类别',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '活动开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: '活动结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: '活动时长',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: '积分',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

interface BasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  profileAndbasic: BasicProfileDataType;
}
interface BasicState {
  visible: boolean;
}

class Basic extends Component<BasicProps, BasicState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileAndbasic/fetchBasic',
    });
  }

  render() {
    const { profileAndbasic, loading } = this.props;
    const { basicGoods, basicProgress } = profileAndbasic;
    let goodsData: typeof basicGoods = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach((item) => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value: any, row: any, index: any) => {
      const obj: {
        children: any;
        props: { colSpan?: number };
      } = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right' as 'left' | 'right' | 'center',
        render: renderContent,
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right' as 'left' | 'right' | 'center',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right' as 'left' | 'right' | 'center',
        render: (text: React.ReactNode, row: any, index: number) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    return (
      <PageContainer>
        <Card bordered={false}>
          <Descriptions title="党员信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="姓名">王大锤</Descriptions.Item>
            <Descriptions.Item label="性别">男</Descriptions.Item>
            <Descriptions.Item label="民族">汉</Descriptions.Item>
            <Descriptions.Item label="班级">1班</Descriptions.Item>
            <Descriptions.Item label="政治面貌">中共党员</Descriptions.Item>
            <Descriptions.Item label="联系方式">3214321432</Descriptions.Item>
            <Descriptions.Item label="出生年月">1996-02-01</Descriptions.Item>
            <Descriptions.Item label="入党时间">2020-11-01</Descriptions.Item>
            <Descriptions.Item label="转正时间">2021-11-01</Descriptions.Item>
            <Descriptions.Item label="所在支部">电子信息教职工支部</Descriptions.Item>
            <Descriptions.Item label="是否支部委员">是</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>相关事件</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    profileAndbasic,
    loading,
  }: {
    profileAndbasic: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    profileAndbasic,
    loading: loading.effects['profileAndbasic/fetchBasic'],
  }),
)(Basic);

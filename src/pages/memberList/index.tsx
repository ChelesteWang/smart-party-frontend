import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Table, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';
import { request } from 'express';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      // id: fields.id,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  /** 国际化配置 */
  const intl = useIntl();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="姓名"
        />
      ),
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.ruleName.Id" defaultMessage="编号" />,
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="所在支部" />,
      dataIndex: 'department',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="电子信息支部" />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="网络工程支部" />
          ),
          status: 'Processing',
        },
        2: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="计算机支部" />
          ),
          status: 'Success',
        },
        3: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.abnormal" defaultMessage="信息工程支部" />
          ),
          status: 'Error',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="性别" />,
      dataIndex: 'sex',
      valueEnum: {
        0: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="男" />
          ),
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="女" />
          ),
        },
      }
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="政治面貌" />,
      dataIndex: 'policitalStatus',
      valueEnum: {
        0: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="中共党员" />
          ),
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="共青团员" />
          ),
        },
      }
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleCallNo" defaultMessage="联系电话" />,
      dataIndex: 'phone',
      sorter: true,
      hideInForm: true,
      // renderText: (val: string) =>
      //   `${val}${intl.formatMessage({
      //     id: 'pages.searchTable.tenThousand',
      //     defaultMessage: ' 万 ',
      //   })}`,
    },
    // {
    //   title: (
    //     <FormattedMessage id="pages.searchTable.titleUpdatedAt" defaultMessage="上次调度时间" />
    //   ),
    //   sorter: true,
    //   dataIndex: 'updatedAt',
    //   valueType: 'dateTime',
    //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //     const status = form.getFieldValue('status');
    //     if (`${status}` === '0') {
    //       return false;
    //     }
    //     if (`${status}` === '3') {
    //       return (
    //         <Input
    //           {...rest}
    //           placeholder={intl.formatMessage({
    //             id: 'pages.searchTable.exception',
    //             defaultMessage: '请输入异常原因！',
    //           })}
    //         />
    //       );
    //     }
    //     return defaultRender(item);
    //   },
    // },
    // {
    //   title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <a
    //       key="config"
    //       onClick={() => {
    //         handleUpdateModalVisible(true);
    //         setCurrentRow(record);
    //       }}
    //     >
    //       <FormattedMessage id="pages.searchTable.config" defaultMessage="修改" />
    //     </a>,
    //     // <a key="subscribeAlert" href="https://procomponents.ant.design/">
    //     //   <FormattedMessage id="pages.searchTable.subscribeAlert" defaultMessage="订阅警报" />
    //     // </a>,
    //   ],
    // },
  ];

  const columns2: ProColumns<TableListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="姓名"
        />
      ),
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="pages.searchTable.updateForm.ruleName.Id" defaultMessage="编号" />,
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.Sex" defaultMessage="性别" />,
      dataIndex: 'sex',
    },
    {
      title: <FormattedMessage id="pages.searchTable.Ethic" defaultMessage="性别" />,
      dataIndex: 'ethic',
    },
    {
      title: <FormattedMessage id="pages.searchTable.Phone" defaultMessage="联系电话" />,
      dataIndex: 'phone',
    },
    {
      title: <FormattedMessage id="pages.searchTable.Status" defaultMessage="政治面貌" />,
      dataIndex: 'policitalStatus',
    },
  //   birth:string,
  // joinTime:date,
  // positiveTime?:date,
  // department:number,
  // isBCmember?:boolean,
  // activities:Activity[]
    {
      title: <FormattedMessage id="pages.searchTable.Birth" defaultMessage="出生年月" />,
      dataIndex: 'birth',
    },
    {
      title: <FormattedMessage id="pages.searchTable.JoinTime" defaultMessage="入党时间" />,
      dataIndex: 'joinTime',
    },
    {
      title: <FormattedMessage id="pages.searchTable.PositiveTime" defaultMessage="转正时间" />,
      dataIndex: 'positiveTime',
    },
    {
      title: <FormattedMessage id="pages.searchTable.Department" defaultMessage="所在支部" />,
      dataIndex: 'department',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="电子信息支部" />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="网络工程支部" />
          ),
          status: 'Processing',
        },
        2: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="计算机支部" />
          ),
          status: 'Success',
        },
        3: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.abnormal" defaultMessage="信息工程支部" />
          ),
          status: 'Error',
        },
      }
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.Department" defaultMessage="是否支部委员" />,
    //   dataIndex: 'isBCmember',
    //   hideInForm: true,
    // },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="修改" />
        </a>,
      ],
    },
    // {
    //   title: <FormattedMessage id="pages.searchTable.Activity" defaultMessage="相关事件" />,
    //   dataIndex: 'activities',
    // },
  ];
  const columns3 = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '活动角色',
      dataIndex: 'role',
      key: 'role',
    },
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
  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          //新建按钮
          // <Button
          //   type="primary"
          //   key="primary"
          //   onClick={() => {
          //     handleModalVisible(true);
          //   }}
          // >
          //   <PlusOutlined /> 
          //   <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          // </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              {/* <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span> */}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
          {/* <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
          </Button> */}
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: '新建规则',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="规则名称为必填项"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={1000}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <div>
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns2 as ProDescriptionsItemProps<TableListItem>[]}
          >
          </ProDescriptions>
          <h3>相关事件</h3>
          <Table<TableListItem>
            // column={9}
            dataSource={[
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
            ]}
            columns={columns3}
          />
          </div>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
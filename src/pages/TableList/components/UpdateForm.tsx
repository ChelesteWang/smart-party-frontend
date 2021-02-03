import React from 'react';
import { Modal } from 'antd';
import { Form, Input, Button, Select } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

import type { TableListItem } from '../data.d';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};
const { Option } = Select;

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };
  
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [cancelLoading, setCancelLoading] = React.useState(false);

  const handleOk = () => {
    
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      props.onSubmit();
      setConfirmLoading(false);
      
    }, 2000);
  };

  const handleCancel = () => {
    
    setCancelLoading(true);
    setTimeout(() => {
      setVisible(false);
      props.onCancel();
      setCancelLoading(false);
    }, 2000);
  };

  return (
    <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleConfig',
          defaultMessage: '活动审批',
        })}
        visible={props.updateModalVisible}
        footer={[
          <Button key="back" loading={cancelLoading} onClick={handleCancel}>
            驳回
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            通过
          </Button>,
        ]}
        onCancel={() => {
          props.onCancel();
        }}
      >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="note" label="审核意见" rules={[{ required: true }]}>
        <TextArea showCount maxLength={100} />
      </Form.Item>
    </Form>
    </Modal>
    // <StepsForm
    //   stepsProps={{
    //     size: 'small',
    //   }}
    //   stepsFormRender={(dom, submitter) => {
    //     return (
    //       <Modal
    //         width={640}
    //         bodyStyle={{ padding: '32px 40px 48px' }}
    //         destroyOnClose
    //         title={intl.formatMessage({
    //           id: 'pages.searchTable.updateForm.ruleConfig',
    //           defaultMessage: '活动审批',
    //         })}
    //         visible={props.updateModalVisible}
    //         footer={submitter}
    //         onCancel={() => {
    //           props.onCancel();
    //         }}
    //       >
    //         {dom}
    //       </Modal>
    //     );
    //   }}
    //   onFinish={props.onSubmit}
    // >
    //   <StepsForm.StepForm
    //     initialValues={{
    //       name: props.values.name,
    //       // desc: props.values.desc,
    //     }}
    //     title={intl.formatMessage({
    //       id: 'pages.searchTable.updateForm.basicConfig',
    //       defaultMessage: '基本信息',
    //     })}
    //   >
    //     <ProFormText
    //       name="name"
    //       label={intl.formatMessage({
    //         id: 'pages.searchTable.updateForm.ruleName.nameLabel',
    //         defaultMessage: '规则名称',
    //       })}
    //       width="md"
    //       rules={[
    //         {
    //           required: true,
    //           message: (
    //             <FormattedMessage
    //               id="pages.searchTable.updateForm.ruleName.nameRules"
    //               defaultMessage="请输入规则名称！"
    //             />
    //           ),
    //         },
    //       ]}
    //     />
    //     <ProFormTextArea
    //       name="desc"
    //       width="md"
    //       label={intl.formatMessage({
    //         id: 'pages.searchTable.updateForm.ruleDesc.descLabel',
    //         defaultMessage: '规则描述',
    //       })}
    //       placeholder={intl.formatMessage({
    //         id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
    //         defaultMessage: '请输入至少五个字符',
    //       })}
    //       rules={[
    //         {
    //           required: true,
    //           message: (
    //             <FormattedMessage
    //               id="pages.searchTable.updateForm.ruleDesc.descRules"
    //               defaultMessage="请输入至少五个字符的规则描述！"
    //             />
    //           ),
    //           min: 5,
    //         },
    //       ]}
    //     />
    //   </StepsForm.StepForm>
    //   <StepsForm.StepForm
    //     initialValues={{
    //       target: '0',
    //       template: '0',
    //     }}
    //     title={intl.formatMessage({
    //       id: 'pages.searchTable.updateForm.ruleProps.title',
    //       defaultMessage: '配置规则属性',
    //     })}
    //   >
    //     <ProFormSelect
    //       name="target"
    //       width="md"
    //       label={intl.formatMessage({
    //         id: 'pages.searchTable.updateForm.object',
    //         defaultMessage: '监控对象',
    //       })}
    //       valueEnum={{
    //         0: '表一',
    //         1: '表二',
    //       }}
    //     />
    //     <ProFormSelect
    //       name="template"
    //       width="md"
    //       label={intl.formatMessage({
    //         id: 'pages.searchTable.updateForm.ruleProps.templateLabel',
    //         defaultMessage: '规则模板',
    //       })}
    //       valueEnum={{
    //         0: '规则模板一',
    //         1: '规则模板二',
    //       }}
    //     />
    //     <ProFormRadio.Group
    //       name="type"
    //       label={intl.formatMessage({
    //         id: 'pages.searchTable.updateForm.ruleProps.typeLabel',
    //         defaultMessage: '规则类型',
    //       })}
    //       options={[
    //         {
    //           value: '0',
    //           label: '强',
    //         },
    //         {
    //           value: '1',
    //           label: '弱',
    //         },
    //       ]}
    //     />
    //   </StepsForm.StepForm>
    //   <StepsForm.StepForm
    //     initialValues={{
    //       type: '1',
    //       frequency: 'month',
    //     }}
    //     title={intl.formatMessage({
    //       id: 'pages.searchTable.updateForm.schedulingPeriod.title',
    //       defaultMessage: '设定调度周期',
    //     })}
    //   >
    //     <ProFormDateTimePicker
    //       name="time"
    //       width="md"
    //       label={intl.formatMessage({
    //         id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
    //         defaultMessage: '开始时间',
    //       })}
    //       rules={[
    //         {
    //           required: true,
    //           message: (
    //             <FormattedMessage
    //               id="pages.searchTable.updateForm.schedulingPeriod.timeRules"
    //               defaultMessage="请选择开始时间！"
    //             />
    //           ),
    //         },
    //       ]}
    //     />
    //     <ProFormSelect
    //       name="frequency"
    //       label={intl.formatMessage({
    //         id: 'pages.searchTable.updateForm.object',
    //         defaultMessage: '监控对象',
    //       })}
    //       width="md"
    //       valueEnum={{
    //         month: '月',
    //         week: '周',
    //       }}
    //     />
    //   </StepsForm.StepForm>
    // </StepsForm>
  );
};

export default UpdateForm;

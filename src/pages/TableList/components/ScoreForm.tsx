import React from 'react';
import { Modal } from 'antd';
import { Form, Input, Button, Slider,Row,Col,InputNumber } from 'antd';
import { useIntl, FormattedMessage } from 'umi';

import type { TableListItem } from '../data.d';

export type ScoreFormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type ScoreFormProps = {
  onCancel: (flag?: boolean, formVals?: ScoreFormValueType) => void;
  onSubmit: (values: ScoreFormValueType) => Promise<void>;
  scoreModalVisible: boolean;
  values: Partial<TableListItem>;
};
const { TextArea } = Input;

const ScoreForm: React.FC<ScoreFormProps> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };
  
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      props.onSubmit();
      setConfirmLoading(false);
      
    }, 2000);
  };

  const handleCancel = () => {
      props.onCancel();
  };

  const handleChange = (value:number) => {
    setScore(value);
  };
  return (
    <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title={intl.formatMessage({
          id: 'pages.searchTable.scoreForm.ruleConfig',
          defaultMessage: '分数结算',
        })}
        visible={props.scoreModalVisible}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            提交
          </Button>,
        ]}
        onCancel={() => {
          props.onCancel();
        }}
      >
      <Form form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="note" label="最终分数">
        <Row>
            <Col span={12}>
            <Slider
                min={1}
                max={100}
                onChange={handleChange}
                value={typeof score === 'number' ? score : 0}
            />
            </Col>
            <Col span={4}>
            <InputNumber
                min={1}
                max={100}
                style={{ margin: '0 16px' }}
                value={score}
                onChange={handleChange}
            />
            </Col>
        </Row>
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

export default ScoreForm;

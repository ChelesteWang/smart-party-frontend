import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker } from 'antd';
import React, { FC, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect, Dispatch,FormattedMessage } from 'umi';
import TableForm from './components/TableForm';
import styles from './style.less';

type InternalNamePath = (string | number)[];

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: '王大锤',
    department: '电子信息支部',
  },
  {
    key: '2',
    workId: '00002',
    name: '王铁柱',
    department: '网络工程支部',
  },
  {
    key: '3',
    workId: '00003',
    name: '王二妞',
    department: '计算机系支部',
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: { [key: string]: any }) => {
    setError([]);
    dispatch({
      type: 'formAndadvancedForm/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer>
        <Card title="事件申请" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={<FormattedMessage id="活动主题" />}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "请输入活动主题",
                  },
                ]}
              >
                <Input placeholder="请输入活动主题" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={<FormattedMessage id="活动类型" />}
                name="type"
                rules={[{ required: true, message: '请选择活动类型' }]}
              >
                <Select placeholder="请选择活动类型">
                  <Option value="private">私密</Option>
                  <Option value="public">公开</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col  xl={{ span: 6, offset: 2 }} lg={6} md={12} sm={24}>
              <Form.Item
                label={<FormattedMessage id="活动考核方式" />}
                name="check"
                rules={[{ required: true, message: '请选择活动考核方式' }]}
              >
                <Select placeholder="请选择活动考核方式">
                  <Option value="common">平时考核</Option>
                  <Option value="all">年终考核</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={<FormattedMessage id="活动学时" />}
                name="activityTime"
                rules={[{ required: true, message: '请选择活动学时' }]}
              >
                <Select placeholder="请选择活动学时">
                <Option value="two">2</Option>
                  <Option value="four">4</Option>
                  <Option value="eight">8</Option>
                  <Option value="twl">12</Option>
                  <Option value="twenFour">24</Option>
                  <Option value="thirSix">36</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={<FormattedMessage id="活动时间" />}
                name="dateRange"
                rules={[{ required: true, message: '请选择活动时间' }]}
              >
                <RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col  xl={{ span: 6, offset: 2 }} lg={6} md={12} sm={24}>
              {/* <Form.Item
                label={<FormattedMessage id="活动成员选取" />}
                name="activityMember"
                rules={[{ required: true, message: '请选择活动成员' }]}
              >
                <Select placeholder="活动成员选取">
                  <Option value="ee">电子信息支部</Option>
                  <Option value="ce">网络工程支部</Option>
                </Select>
              </Form.Item> */}
              <Form.Item
                label={<FormattedMessage id="活动负责人" />}
                name="leader"
                rules={[{ required: true, message: '请输入活动负责人' }]}
              >
                <Input placeholder="请输入活动负责人" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        {/* <Card title="任务管理（审批人）" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.name2}
                name="name2"
                rules={[{ required: true, message: '请输入' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.url2}
                name="url2"
                rules={[{ required: true, message: '请选择' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.owner2}
                name="owner2"
                rules={[{ required: true, message: '请选择管理员' }]}
              >
                <Select placeholder="请选择管理员">
                  <Option value="xiao">付晓晓</Option>
                  <Option value="mao">周毛毛</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.approver2}
                name="approver2"
                rules={[{ required: true, message: '请选择审批员' }]}
              >
                <Select placeholder="请选择审批员">
                  <Option value="xiao">付晓晓</Option>
                  <Option value="mao">周毛毛</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.dateRange2}
                name="dateRange2"
                rules={[{ required: true, message: '请输入' }]}
              >
                <TimePicker
                  placeholder="提醒时间"
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => {
                    if (trigger && trigger.parentNode) {
                      return trigger.parentNode as HTMLElement;
                    }
                    return trigger;
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.type2}
                name="type2"
                rules={[{ required: true, message: '请选择仓库类型' }]}
              >
                <Select placeholder="请选择仓库类型">
                  <Option value="private">私密</Option>
                  <Option value="public">公开</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card> */}
        <Card title="活动人员" bordered={false}>
          <Form.Item name="members">
            <TableForm />
          </Form.Item>
        </Card>
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))(AdvancedForm);

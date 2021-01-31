import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import React, { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const BasicForm1: FC<BasicFormProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };
  const handleChange = (value: String) => {
    console.log(`selected ${value}`);
  };

  return (
    <PageContainer content={<FormattedMessage id="formandbasic-form.basic.description" />}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="党组织名称" />}
            name="name"
            rules={[
              {
                required: true,
                message: '请输入党组织名称',
              },
            ]}
          >
            <Input placeholder="请输入党组织名称" style={{ width: 160 }} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="组织属性" />}
            name="zuzhi"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select defaultValue="dangwei" style={{ width: 160 }} onChange={handleChange}>
              <Option value="dangwei">党委</Option>
              <Option value="zongzhi">总支</Option>
              <Option value="zhibu">支部</Option>
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="单位属性" />}
            name="danwei"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select defaultValue="commonUni" style={{ width: 160 }} onChange={handleChange}>
              <Option value="commonUni">普通高校</Option>
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="所属行业" />}
            name="hangye"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select defaultValue="commonEdu" style={{ width: 160 }} onChange={handleChange}>
              <Option value="commonEdu">普通高等教育</Option>
              {/* <Option value="zongzhi">总支</Option>
              <Option value="zhibu">支部</Option> */}
            </Select>
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="formandbasic-form.form.submit" />
            </Button>
            <Button style={{ marginLeft: 8 }}>
              <FormattedMessage id="formandbasic-form.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm1);

// export default BasicForm1
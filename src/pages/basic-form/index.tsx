import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip,Row, Col, } from 'antd';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import React, { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const ethnicGroups = ['汉族','满族','蒙古族','回族','藏族','维吾尔族','苗族','彝族','壮族','布依族','侗族','瑶族','白族','土家族','哈尼族','哈萨克族',
'傣族','黎族','傈僳族','佤族','畲族','高山族','拉祜族','水族','东乡族','纳西族','景颇族','柯尔克孜族','土族','达斡尔族','仫佬族','羌族','布朗族',
'撒拉族','毛南族','仡佬族','锡伯族','阿昌族','普米族','朝鲜族','塔吉克族','怒族','乌孜别克族','俄罗斯族','鄂温克族','德昂族','保安族','裕固族',
'京族','塔塔尔族','独龙族','鄂伦春族','赫哲族','门巴族','珞巴族','基诺族']
interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const BasicForm: FC<BasicFormProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
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
      sm: { span: 10, offset: 10 },
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

  const handleChange = (value:String) => {
    console.log(`selected ${value}`);
  }

  const birthChange = (date:any, dateString:String) => {
    console.log(date, dateString);
  }

  return (
    <PageContainer content='用于添加支部党员的基本信息'>
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
          <Row>
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="姓名" />}
            name="name"
            rules={[
              {
                required: true,
                message: "请输入姓名",
              },
            ]}
          >
            <Input placeholder="请输入姓名" style={{ width: 160 }}/>
          </FormItem>
          </Col>
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="性别" />}
            name="sex"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select defaultValue="male" style={{ width: 160 }} onChange={handleChange}>
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="民族" />}
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select defaultValue={0} style={{ width: 160 }} onChange={handleChange}>
              {ethnicGroups.map((item,index)=>{
                return <Option value={index}>{item}</Option>
              })
              }
            </Select>
          </FormItem>
          </Col>
          </Row>
          <Row>
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="班级" />
                <em className={styles.optional}>
                  <FormattedMessage id="formandbasic-form.form.optional" />
                </em>
              </span>
            }
            name="title"
          >
            <Input placeholder="请输入班级" style={{ width: 160 }}/>
          </FormItem>
          </Col>
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="政治面貌" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.title.required' }),
              },
            ]}
          >
            {/* //TODO：看看这里是加固定值还是可选择 */}
            <Select defaultValue="partyMember" style={{ width: 160 }} onChange={handleChange}>
              <Option value="partyMember">中共党员</Option>
              <Option value="member">共青团员</Option>
              <Option value="mass">群众</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span={8}>
            {/* //TODO：电话号码校验 */}
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="联系方式" />}
            name="phone"
            rules={[
              {
                required: true,
                message: "请输入联系方式",
              },
            ]}
          >
            <Input placeholder="请输入联系方式" style={{ width: 160 }}/>
          </FormItem>
          </Col>
          </Row>
          <Row>
            <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="出生年月" />}
            name="birthDate"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.date.required' }),
              },
            ]}
          >
            <DatePicker defaultPickerValue={moment('19990101', dateFormat)} onChange={birthChange} placeholder="请选择出生年月" style={{ width: 160 }}/>
          </FormItem>
          </Col>
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="入党时间" />}
            name="joinDate"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.date.required' }),
              },
            ]}
          >
            <DatePicker defaultPickerValue={moment('20210101', dateFormat)} onChange={birthChange} placeholder="请选择入党时间" style={{ width: 160 }}/>
          </FormItem>
          </Col>
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="转正时间" />
                <em className={styles.optional} style={{overflow:'auto'}}>
                  <FormattedMessage id="formandbasic-form.form.optional" />
                </em>
              </span>
            }
            name="date"
          >
            <DatePicker defaultPickerValue={moment('20210101', dateFormat)} onChange={birthChange} placeholder="请选择转正时间" style={{ width: 160 }}/>
          </FormItem>
          </Col>
          </Row>
          
          {/* 这个是自己填写还是从后端获取（初始值为0） */}
          <Row>
          {/* <Col span={8}> */}
          {/* <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="已学学时" />}
            name="learnTime"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.title.required' }),
              },
            ]}
          >
            <Input placeholder="请输入已学学时" style={{ width: 160 }}/>
          </FormItem> */}
          {/* </Col> */}
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="所在支部" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.title.required' }),
              },
            ]}
          >
            <Select defaultValue="male" style={{ width: 160 }} onChange={handleChange}>
              <Option value="male">xxx党支部</Option>
              <Option value="female">xx党支部</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span={8}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="是否支部委员" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.title.required' }),
              },
            ]}
          >
            <Select defaultValue="yes" style={{ width: 160 }} onChange={handleChange}>
              <Option value="yes">是</Option>
              <Option value="no">否</Option>
            </Select>
          </FormItem>
          </Col>
          </Row>
          {/* <Row> */}
          <FormItem {...submitFormLayout} style={{ marginTop: 40 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="formandbasic-form.form.submit" />
            </Button>
            <Button style={{ marginLeft: 24 }}>
              <FormattedMessage id="formandbasic-form.form.save" />
            </Button>
          </FormItem>
          {/* </Row> */}
          
        </Form>
        
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);

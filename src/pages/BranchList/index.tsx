import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Card, Row } from 'antd';
import { Avatar, Modal, Form } from 'antd';

const { Meta } = Card;

const data = {
  status: 'ok',
  code: 200,
  data: [
    {
      id: '01',
      name: '研究生党支部',
      desc:
        '研究生党支部创建于2000年，现有总人数420人。多年来，支部在上级党委的正确领导下，认真贯彻党的十九大会议精神，深入落实科学发展观，深入开展党的群众路线教育实践活动，坚持“三会一课”制度及党的主题日活动。',
    },
    {
      id: '02',
      name: '网络工程系学生党支部',
      desc:
        '网络工程系学生党支部创建于2008年，现有总人数210人。多年来，支部“围绕发展抓党建，抓好党建促发展”为目标，进一步加强领导班子和党员干部的组织建设、思想建设和作风建设。切实提高党组织的创造力、凝聚力和战斗力，充分发挥党支部的政治核心、战斗堡垒、监督保证作用和全体党员的先锋模范作用，提高服务质量和水平，不断开创滨州市供暖事业的新局面。',
    },
    {
      id: '03',
      name: '计算机系学生党支部',
      desc:
        '计算机系学生党支部创建于2008年，现有人数230人。成立之初即根据支部特点，明确提出打造“勤于学习、勇于担当”的党支部，以提升凝聚力和战斗力为目标，致力于增强党员干部的责任感和担当精神，使全体党员干部保持阳光心态投入工作、精益求精地对待工作',
    },
    {
      id: '04',
      name: '电子信息工程系党支部',
      desc:
        '电子信息工程系党支部创建于2009年，现有人数221人。支部将党建工作与推动学校事业发展相结合，推进各项工作的落实。发展规划处党支部现有党员5人，全部为正式党员，支部将持续打造“勤于学习，勇于担当”的党支部，扎实推进“两学一做”学习教育常态化制度化。',
    },
    {
      id: '05',
      name: '网络工程系教工党支部',
      desc:
        '网络工程系教工党支部创建于2006年，现有人数123人。支部不断加强和完善支部的思想建设、组织建设、作风建设和制度建设，切实加强党性修养，围绕学校工作重心，立足本职工作，坚持支部建设与工作实践紧密集合，为学校教学科研各项事业全面协调发展提供有力的保障。',
    },
    {
      id: '06',
      name: '计算机系教工党支部',
      desc:
        '计算机系教工工党支部创建于2006年，现有人数354人。切实增强“四个意识”，结合“两学一做”学习教育，在学校机关党委的领导下，充分发挥党支部的战斗堡垒作用，全面提高信息技术中心整体服务水平，积极推动中心各项工作有效开展。',
    },
    {
      id: '07',
      name: '电子工程系教工党支部',
      desc:
        '电子工程系党支部创建于2006年，现有人数366人。支部始终以马克思主义、毛泽东思想、邓小平理论、“三个代表”重要思想、科学发展观、和谐社会理念、中国梦为指导，按照学院党委的工作要求，牢固树立中心意识、责任意识、主体意识、服务意识、质量意识、市场意识，认真抓好党建工作，深入开展“树形象、讲奉献、保目标、攻难关”活动',
    },
  ],
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class TableList extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isShow: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onFinshed = this.onFinshed.bind(this);
    this.onFinshedFailed = this.onFinshedFailed.bind(this);
  }

  showModal() {
    this.setState({
      isShow: true,
    });
  }

  handleOk() {
    this.setState({
      isShow: false,
    });
  }

  handleCancel() {
    this.setState({
      isShow: false,
    });
  }

  onFinshed() {
    // 发送请求
    console.log('finshed');
  }

  onFinshedFailed() {}
  render() {
    return (
      <PageContainer>
        <Row gutter={14}>
          {/* <Card style={{ width: 400,minHeight:200, marginTop: 16,marginLeft:14 ,display:"flex",alignItems:'center',justifyContent:'center',cursor:'pointer',borderRadius:3}} onClick={this.showModal} >
             <PlusOutlined style={{fontSize:100,color: '#ff7875'}} />
           </Card> */}
          {data.data.map((item) => {
            return (
              <Card
                style={{
                  width: 400,
                  minHeight: 200,
                  marginTop: 16,
                  marginLeft: 14,
                  borderRadius: 3,
                }}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="/detail">{item.name}</a>}
                  description={item.desc}
                />
              </Card>
            );
          })}
        </Row>
        {/* <Modal title="添加" visible={this.state.isShow} footer={null} onCancel={this.handleCancel}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={(val) => {
              console.log(val);
            }}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="支部名"
              name="username"
              rules={[{ required: true, message: ' 请输入支部名!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="介绍"
              name="password"
              rules={[{ required: true, message: '请输入支部介绍!' }]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
              <Button
                type="default"
                onClick={() => {
                  this.setState({
                    isShow: false,
                  });
                }}
                style={{ marginLeft: 20 }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}
      </PageContainer>
    );
  }
}

export default TableList;

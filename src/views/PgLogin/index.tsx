import { Form, Icon, Input, Button, Checkbox, Alert, Modal } from 'antd';
const { confirm } = Modal;
import React from 'react'
import './Login.scss'
const onClose = e => {
  console.log(e, 'I was closed.');
};

function showDeleteConfirm(props) {
  confirm({
    title: '你确定要去答题吗?',
    content: '这里有一些题目需要你解答，获取会有一些难度，注意！！！如果开始答题，请勿刷新浏览器，否则会回到第一题，请在方便的时候作答，一气呵成，加油！',
    okText: '我要答题',
    okType: 'danger',
    cancelText: '我要放弃',
    onOk() {
      props.history.push('/goquestion')
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  state = {
    username: '',
    password: '',
    show: false
  }
  Tologin = () => {
    let { username, password } = this.state
    let { history }: any = this.props
    if (username == '11' && password == '22') {
      history.push('/pgHomeWelcome')
    } else {
      this.setState({
        show: true
      }, () => {
        setTimeout(() => {
          this.setState({
            show: false
          })
        }, 4000)
      })
    }
  }
  user = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  pass = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    let { show } = this.state
    const { getFieldDecorator } = this.props.form;
    return (<div className='clogin-wrap'>
      <div className="c" onClick={() => {
        showDeleteConfirm(this.props)
      }}>

        {/* <Button onClick={showDeleteConfirm} type="dashed"> */}
          答题通道
        {/* </Button> */}
      </div>
      <div className='clogin'>
        <div className='titlrers'>登录</div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                onChange={(e) => {
                  this.user(e)
                }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  this.pass(e)
                }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}

            <Button type="primary" className="login-form-button" onClick={() => {
              this.Tologin()
            }}>
              Log in
          </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ display: show ? 'block' : 'none' }}>

        <Alert
          message="Error"
          description="您输入的账号或者密码不正确，请重新输入！！"
          type="error"
          showIcon
        />
      </div>
    </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm
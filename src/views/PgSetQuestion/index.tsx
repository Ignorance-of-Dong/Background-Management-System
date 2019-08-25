import React from 'react'
import './style.scss'
import { Table, Divider, Tag, Button, Modal, Input, Form, Popover } from 'antd';
// import Tree from '../../common/component/index'
import Ed from '../../common/edite'
const { confirm } = Modal;
import {
    questionFn,
    addquestionFn,
    removequestionFn,
    updatequestionFn
} from '../../api/api'

class PgSetQuestion extends React.Component {
    props = this.props
    state = {
        ModalText: 'Content of the modal',
        question: '',
        id: '',
        answer: '五',
        activelist: [],
        addVisible: false,
        updataVisible: false,
        confirmLoading: false,
        columns: [
            {
                title: '问题',
                key: 'question',
                dataIndex: 'question',
                render: (question, c) => <Popover  title="点击访问详情" trigger="hover"><div className='question-l' onClick={() => {
                    console.log(c)
                    //`/questiondetails?&`
                    this.props.history.push({
                        pathname:'/questiondetails',
                        state: {
                            question:c.question,
                            answer:c.answer
                        }
                    })
                }} dangerouslySetInnerHTML={{ __html:question}}>{}</div></Popover>,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" onClick={() => { this.UpDshowModal(text, record) }}>更新</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => { this.showPropsConfirm(text) }}>删除</a>
                    </span>
                ),
            },
        ]
    };

    chearch = () => {
        questionFn().then(res => {
            this.setState({
                activelist: res.data
            })
        })
    }
    componentDidMount() {
        sessionStorage.setItem('defaultSelectedKeys', '3')
        this.chearch()
    }
    // 添加
    AddhandleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            addVisible: false,
            question: ''
        });
    };
    AddhandleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        let { question, answer } = this.state
        let params = { question, answer }
        addquestionFn(params)
        setTimeout(() => {
            this.setState({
                addVisible: false,
                confirmLoading: false,
            });
            this.chearch()
        }, 2000);
    };
    AddshowModal = () => {
        this.setState({
            addVisible: true,
        });
    };

    // 更新
    UpDhandleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            updataVisible: false,
        });
    };
    UpDhandleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        let { question, id, answer } = this.state
        let params = { question, id, answer }
        updatequestionFn(params)
        setTimeout(() => {
            this.chearch()
            this.setState({
                updataVisible: false,
                confirmLoading: false,
            });
        }, 2000);
    };
    UpDshowModal = (text, record) => {
        console.log(text)
        this.setState({
            updataVisible: true,
            question: text.question,
            id: text.id
        });
    };

    // 删除
    showPropsConfirm = (text) => {
        let that = this
        confirm({
            title: '即将删除该条问题?',
            content: '请确认！！！',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log(text);
                let parmas = { id: text.id }
                removequestionFn(parmas)
                that.chearch()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    render() {
        const { addVisible, updataVisible, confirmLoading, ModalText, columns, activelist } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 16 },
            },
        };
        return <div className='addActive-wrap'>
            <div className="addAC">
                <Button type="danger" block onClick={this.AddshowModal}>
                    添加题目
          </Button>
            </div>
            <Modal
                className='addInputs'
                title="添加问题"
                visible={addVisible}
                onOk={this.AddhandleOk}
                confirmLoading={confirmLoading}
                onCancel={this.AddhandleCancel}
            >
                <div className="addInputs">
                <Ed onChange={(e) => {
                    this.setState({ question: e })
                }}/>
                    {/* <Form {...formItemLayout}>
                        
                        <Form.Item label="问题">
                            <Input value={this.state.question} onChange={(e) => {
                                this.setState({ question: e.target.value })
                            }} />
                        </Form.Item>
                    </Form> */}
                </div>
            </Modal>
            <Modal
                title="修改广告图"
                visible={updataVisible}
                onOk={this.UpDhandleOk}
                confirmLoading={confirmLoading}
                onCancel={this.UpDhandleCancel}
            >
                <div className="addInput">
                <Ed onChange={(e) => {
                    this.setState({ question: e })
                }}/>
                </div>
            </Modal>
            <Table columns={columns} dataSource={activelist} />
            {/* <Tree/> */}
        </div>
    }
}

export default PgSetQuestion
// import React from 'react'

// function PgToquestion() {
import React from 'react'
import './style.scss'
import { Table, Divider, Tag, Button, Modal, Input, Form, Popover, message } from 'antd';
import Ed from '../../common/edite'
// import Tree from '../../common/component/index'
const { confirm } = Modal;
import {
    questionFn,
    addquestionFn,
    removequestionFn,
    updatequestionFn
} from '../../api/api'

class PgToquestion extends React.Component {
    props = this.props
    state = {
        questionlist: [],
        question: '',
        answer: '',
        id: '',
        isgoheight: false,
        count: 0,
        questionContent: {},
        errorMsg: '',
        visible: false
    };
    componentDidMount() {
        questionFn().then(res => {
            this.setState({
                questionlist: res.data,
            }, () => {
                this.setState({
                    question: this.state.questionlist[0].question,
                    id: this.state.questionlist[0].id,
                    answer: this.state.questionlist[0].answer
                })
            })
        })
    }
    showPropsConfirm = () => {
        let that = this
        confirm({
            title: '即将提交问题答案?',
            content: '请慎重！！！',
            okText: '提交',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.setState({
                    isgoheight: true
                })
                let { id, question, answer } = that.state
                let params = {
                    id,
                    question,
                    answer
                }
                updatequestionFn(params).then(() => {
                    this.success()
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    success = () => {
        message.success('提交成功，请开始下一题!!!!!');
    };

    error = () => {
        message.error('请先提交!!!!');
    };

    warning = () => {
        message.warning('没有题目了!!!!');
    };
    nextPage() {

        if (this.state.isgoheight) {
            if (this.state.count >= this.state.questionlist.length - 1) {
                // alert('没有提了')
                this.warning()
                return
            }
            this.setState({
                isgoheight: false,
                question: this.state.questionlist[this.state.count + 1].question,
                count: this.state.count + 1,
                id: this.state.questionlist[this.state.count + 1].id
            })
        } else {
            // alert('')
            this.error()
            return
        }
    }
    handleClose = () => {
        this.setState({ visible: false });
    };
    render() {
        const { addVisible, updataVisible, confirmLoading, ModalText, columns, activelist, question } = this.state;
        return <div className='addActive-wrap'>
            <div className="question-wrap-in">
                <div className="question-wrap-title" dangerouslySetInnerHTML={{ __html: question }}>
                    {}
                </div>
                <Ed onChange={(val) => {
                    this.setState({
                        answer: val
                    })
                }} />
            </div>
            <div className="addAC">
                <Button type="danger" block onClick={() => {
                    this.showPropsConfirm()
                }}>
                    提交
                </Button>
            </div>
            <div className="addAC">
                <Button type="danger" block onClick={() => {
                    this.nextPage()
                }}>
                    下一页
                </Button>
            </div>
            <div>

            </div>
        </div>
    }
}

export default PgToquestion
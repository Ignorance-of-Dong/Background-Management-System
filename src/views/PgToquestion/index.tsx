// import React from 'react'

// function PgToquestion() {
import React from 'react'
import './style.scss'
import { Table, Divider, Tag, Button, Modal, Input, Form, Popover } from 'antd';
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
        count: 0
    };
    componentDidMount() {
        questionFn().then(res => {
            this.setState({
                questionlist: res.data,
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
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    nextPage() {
        if (this.state.count >= this.state.questionlist.length - 1) {
            
        }
        if (this.state.isgoheight) {
            this.setState({
                isgoheight: false
            })
        } else {
            alert('请先提交')
        }
    }
    render() {
        const { addVisible, updataVisible, confirmLoading, ModalText, columns, activelist } = this.state;
        return <div className='addActive-wrap'>
            <div className="question-wrap-in">
                <div className="question-wrap-title">
                    提交提交提交提交提交提交提交提交提交提交
                    提交提交提交提交提交
                    提交提交提交提交提交
                    提交提交提交提交提交
                    提交提交提交提交提交
                    提交提交提交提交提交
                </div>
                <Ed onChange={(val) => {
                    this.setState({
                        answer: val
                    })
                }}/>
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
        </div>
    }
}

export default PgToquestion
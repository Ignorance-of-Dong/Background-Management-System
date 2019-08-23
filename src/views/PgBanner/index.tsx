import React from 'react'
import './style.scss'
import { Table, Divider, Tag, Button, Modal, Input, Form, Popover } from 'antd';
// import Tree from '../../common/component/index'
const { confirm } = Modal;
import {
	bannerFn,
	addbannerFn,
	removebannerFn,
	updatebannerFn
} from '../../api/api'

class AddActive extends React.Component {
	state = {
		ModalText: 'Content of the modal',
		bannerSrc: '',
		id: '',
		activelist: [],
		addVisible: false,
		updataVisible: false,
		confirmLoading: false,
		columns: [
			{
				title: '图片地址',
				key: 'bannerSrc',
				dataIndex: 'bannerSrc',
				render: bannerSrc => <Popover content={<img src={bannerSrc}/>} title="实时图盘" trigger="hover">
				<a href="javascript:;">{bannerSrc}</a>
				</Popover>,
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
		bannerFn().then(res => {
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
			bannerSrc: ''
		});
	};
	AddhandleOk = () => {
		this.setState({
			ModalText: 'The modal will be closed after two seconds',
			confirmLoading: true,
		});
		let { bannerSrc } = this.state
		let params = { bannerSrc }
		addbannerFn(params)
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
		let { bannerSrc, id } = this.state
		let params = { bannerSrc, id }
		updatebannerFn(params)
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
			bannerSrc: text.bannerSrc,
			id: text.id
		});
	};

	// 删除
	showPropsConfirm = (text) => {
		let that = this
		confirm({
			title: '即将删除该篇文章?',
			content: '请确认！！！',
			okText: '删除',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(text);
				let parmas = { id: text.id }
				removebannerFn(parmas)
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
					添加广告图
          </Button>
			</div>
			<Modal
				title="添加广告图"
				visible={addVisible}
				onOk={this.AddhandleOk}
				confirmLoading={confirmLoading}
				onCancel={this.AddhandleCancel}
			>
				<div className="addInput">
					<Form {...formItemLayout}>
						<Form.Item label="广告图链接">
							<Input value={this.state.bannerSrc} onChange={(e) => {
								this.setState({ bannerSrc: e.target.value })
							}} />
						</Form.Item>
					</Form>
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
					<Form {...formItemLayout}>
						<Form.Item label="广告图链接">
							<Input value={this.state.bannerSrc} onChange={(e) => {
								this.setState({ bannerSrc: e.target.value })
							}} />
						</Form.Item>
					</Form>
				</div>
			</Modal>
			<Table columns={columns} dataSource={activelist} />
			{/* <Tree/> */}
		</div>
	}
}

export default AddActive
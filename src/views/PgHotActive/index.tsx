import React from 'react'
import './style.scss'
import { Table, Divider, Tag, Button, Modal, Input, Form } from 'antd';
// import Tree from '../../common/component/index'
const { confirm } = Modal;
import {
	articlesListHotFn,
	addHotActivelistFn,
	removeHotActivelistFn,
	updateHotActivelistFn
} from '../../api/api'

class AddActive extends React.Component {
	state = {
		ModalText: 'Content of the modal',
		Title: '',
		Http: '',
		Author: '',
		Imgsrc: 'http://my.ignorantscholar.cn/images/header.png',
		UpDateTitle: '',
		UpDateHttp: '',
		UpDateAuthor: '',
		UpDateImgsrc: '',
		key: '',
		activelist: [],
		addVisible: false,
		updataVisible: false,
		confirmLoading: false,
		columns: [
			{
				title: '文章标题',
				dataIndex: 'Title',
				key: 'Title',
				render: Title => <a href="javascript:;">{Title}</a>,
			},
			{
				title: '文章链接地址',
				dataIndex: 'Http',
				key: 'Http',
			},
			{
				title: '文章作者',
				dataIndex: 'Author',
				key: 'Author',
			},
			{
				title: '文章宣传图片',
				key: 'Imgsrc',
				dataIndex: 'Imgsrc',
				render: Imgsrc => <a href="javascript:;">{Imgsrc}</a>,
			},
			{
				title: '上传时间',
				key: 'Time',
				dataIndex: 'Time',
				render: Time => <a href="javascript:;">{Time}</a>,
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
		articlesListHotFn().then(res => {
			console.log(res, ':3001/#/pgAddActive:1 Uncaught (in promise)')
			this.setState({
				activelist: res.data
			})
		})
	}
	componentDidMount() {
		sessionStorage.setItem('defaultSelectedKeys', '2')	
		// let {session}: any = this.props
		// session('2')
		// console.log(this.props)
		this.chearch()
	}
	// 添加
	AddhandleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
			addVisible: false,
			Title: '',
			Http: '',
			Author: '',
			Imgsrc: ''
		});
	};
	AddhandleOk = () => {
		this.setState({
			ModalText: 'The modal will be closed after two seconds',
			confirmLoading: true,
		});
		let { Title, Http, Author, Imgsrc } = this.state
		let params = { Title, Http, Author, Imgsrc }
		addHotActivelistFn(params)
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
		let { UpDateTitle, UpDateHttp, UpDateAuthor, UpDateImgsrc, key } = this.state
		let params = { Title: UpDateTitle, Http: UpDateHttp, Author: UpDateAuthor, Imgsrc: UpDateImgsrc, key: key }
		updateHotActivelistFn(params)
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
			UpDateTitle: text.Title,
			UpDateHttp: text.Http,
			UpDateAuthor: text.Author,
			UpDateImgsrc: text.Imgsrc,
			key: text.Key
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
				let parmas = {key: text.Key}
				removeHotActivelistFn(parmas)
				that.chearch()
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}
	render() {
		const { addVisible, updataVisible, confirmLoading, ModalText, columns, activelist } = this.state;
		console.log(activelist, 'activelist')
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
					添加热门文章
          </Button>
			</div>
			<Modal
				title="添加热门文章"
				visible={addVisible}
				onOk={this.AddhandleOk}
				confirmLoading={confirmLoading}
				onCancel={this.AddhandleCancel}
			>
				<div className="addInput">
					<Form {...formItemLayout}>
						<Form.Item label="Title">
							<Input value = {this.state.Title} onChange={(e) => {
								this.setState({ Title: e.target.value })
							}} />
						</Form.Item>
						<Form.Item label="Http">
							<Input value = {this.state.Http} onChange={(e) => {
								this.setState({ Http: e.target.value })
							}} />
						</Form.Item>
						<Form.Item label="Author">
							<Input value = {this.state.Author} onChange={(e) => {
								this.setState({ Author: e.target.value })
							}} />
						</Form.Item>
						<Form.Item label="Imgsrc">
							<Input value = {this.state.Imgsrc} onChange={(e) => {
								this.setState({ Imgsrc: e.target.value })
							}} />
						</Form.Item>
					</Form>
				</div>
			</Modal>
			<Modal
				title="修改热门文章"
				visible={updataVisible}
				onOk={this.UpDhandleOk}
				confirmLoading={confirmLoading}
				onCancel={this.UpDhandleCancel}
			>
				<div className="addInput">
					<Form {...formItemLayout}>
					<Form.Item label="Title">
							<Input value = {this.state.UpDateTitle} onChange={(e) => {
								this.setState({ UpDateTitle: e.target.value })
							}} />
						</Form.Item>
						<Form.Item label="Http">
							<Input value = {this.state.UpDateHttp} onChange={(e) => {
								this.setState({ UpDateHttp: e.target.value })
							}} />
						</Form.Item>
						<Form.Item label="Author">
							<Input value = {this.state.UpDateAuthor} onChange={(e) => {
								this.setState({ UpDateAuthor: e.target.value })
							}} />
						</Form.Item>
						<Form.Item label="Imgsrc">
							<Input value = {this.state.UpDateImgsrc} onChange={(e) => {
								this.setState({ UpDateImgsrc: e.target.value })
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
import React from 'react'
import { Layout } from 'antd'
const { Header } = Layout;
class Aheacter extends React.Component {
	state = {
		anmi: 0
	}
	componentDidMount() {
		setTimeout(() => {

		})
		setInterval(() => {
			if (this.state.anmi < 1000) {
				this.setState({
					anmi: this.state.anmi + 1
				})
			} else {
				this.setState({
					anmi: 0
				})
			}
		}, 10)
	}
	header = null
	render() {
		let { anmi } = this.state
		return <Header style={{ background: '#fff', padding: 0, position: 'relative', overflow: 'hidden'}} ref={(e) => { this.header = e }}><p className='anmiytion' style={{ left: anmi }}>欢迎来到文章管理系统........</p></Header>
	}
}

export default Aheacter
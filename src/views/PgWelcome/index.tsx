/*
 * @Author: 张政
 * @Date: 2019-06-22 10:35:31
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-07-11 15:33:31
 * @Description: 首页欢迎页面
 */
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React from 'react'
import Aheacter from '../../containers/header' 
import RouterView from "../../router/index"
import './style.scss'
import meun from '../../static/routerDate'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    meunList: meun,
    anmi: 0,
    defaultSelectedKeys: '0'
  };
  
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentWillUnmount() {
    // sessionStorage.setItem('defaultSelectedKeys', '0')
    
  }
  session = (key) => {
    this.setState({
      defaultSelectedKeys: key
    })
  }
  anmi = null
  render() {
    let {route, history}: any = this.props
    let {meunList, anmi, defaultSelectedKeys} = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <div className="titles">
            <div className="titlr">管理系统</div>
          </div>
          <Menu theme="dark" defaultSelectedKeys={[defaultSelectedKeys || '0']} mode="inline">

            {
              meunList.map((item, index) => {
                return <Menu.Item key={item.key} onClick={() => {
                  sessionStorage.setItem('defaultSelectedKeys', item.key.toString())
                  history.push(item.path)
                }}>
                  <Icon type="pie-chart" />
                  <span>{item.name}</span>
                </Menu.Item>
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Aheacter/>
          <Content style={{ margin: '0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <RouterView route={route} session={this.session}/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Active-C ©2019 Created by avtion</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo
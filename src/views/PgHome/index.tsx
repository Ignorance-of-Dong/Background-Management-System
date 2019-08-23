import React, { Component } from 'react';
import './style.scss'
export default class PlatformBlackIntro extends Component {
  static displayName = 'PlatformBlackIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    sessionStorage.setItem('defaultSelectedKeys', '0')
  }
  render() {
    return (
      <div className='wrapper'>
        <div className='body'>
          <h2 className='title'>多元化的管理机制</h2>
          <p className='text'>
            商品推广佣金，精准转化内容影响力<br />优质内容奖励
            ，为优质内容创作者保驾护航<br />阿里V任务，为你的内容创作能力对接更多潜在客户
          </p>
        </div>
        <div className='extraBody'>
          <img
            alt=""
            src='https://github.com/ice-lab/react-materials/blob/master/blocks/PlatformBlackIntro/src/images/TB1opWDSpXXXXbwXFXXXXXXXXXX-1412-436.png?raw=true'
            className='image'
          />
          <div className='extraText'>
            <p className='extraTextItemLeft'>开放更多内容消费场景</p>
            <p className='extraTextItemCenter'>激励优质内容生产</p>
            <p className='extraTextItemRight'>连接品牌商家需求</p>
          </div>
        </div>
      </div>
    );
  }
}
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */
/* eslint-disable no-const-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/*
 * @Author: lxc
 * @Date: 2019-05-16 14:37:47
 * @Last Modified by: lxc
 * @Last Modified time: 2019-06-26 18:51:41
 */
// import moment from "moment";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Pagination, DatePicker, TreeSelect } from "antd";
// import { missList, getEmGroup, getAlarmStatus } from "@services/userManger";
// import { SvgIcon } from "@components/SvgIcon";
// import ExportSvg from "@assets/Icon/Export.svg";
// import LeftSvg from "@assets/Icon/021__arrow2_left.svg";
// import RightSvg from "@assets/Icon/022__arrow2_right.svg";
// import { getList } from "@redux/actions/rank";
// import { imgUrlMiss } from "@const/index";

// import ExportBoxDaiload from "@components/ExportBox";
// import "./index.less";

/**
 * 给数组增加一个Remove 的方法
 * 方便操作（删除数组中具体的值）
 */
Array.prototype.indexOf = function(val) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === val) return i;
  }
  return -1;
};

Array.prototype.remove = function(val) {
  const index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

const { RangePicker } = DatePicker;
const { SHOW_CHILD } = TreeSelect;
const { TreeNode } = TreeSelect;

const treedata = [
  {
    egid: "2",
    functionType: "SECONDARY_VERIFY",
    instructions: "二次合演",
    name: "二次核验",
    id: "1",
    ems: [
      {
        emid: "1",
        name: "1号",
        position: "地下室一号",
        protocol: "RTSP",
        egeid: "1",
        id: "1-1",
        ems: [
          {
            emid: "1-1",
            name: "1-1号",
            position: "地下室一2号",
            protocol: "RTSqP",
            egeid: "11231asdxwwx1",
            id: "1-1-1"
          },
          {
            emid: "1-2",
            name: "1-2号",
            position: "地下室22号",
            protocol: "RTSP2",
            egeid: "2cv3fww",
            id: "1-2-1"
          }
        ]
      },
      {
        emid: "2",
        name: "2号",
        position: "地下室2号",
        protocol: "RTSP",
        egeid: "2",
        id: "1-2"
      }
    ]
  },
  {
    egid: "20",
    functionType: "FIRST_VERIFY",
    instructions: "一次核验",
    name: "一次合演",
    id: "2",
    ems: [
      {
        emid: "3",
        name: "3号",
        position: "地下室3号",
        protocol: "RTSP",
        egeid: "3",
        id: "2-1"
      },
      {
        emid: "4",
        name: "4号",
        position: "地下室4号",
        protocol: "RTSP",
        egeid: "4",
        id: "2-2"
      }
    ]
  }
];

class AllarmList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: null,
      dataStatus: true,
      visibale: false,
      currPageNum: 0, // 当前所在页,后台从0开始
      pageSize: 15, // 分页所需数量
      totalCount: 1, // 数据库总记录数
      // totalPageNum: 11, // 页面总页数
      startTime: null,
      endTime: null,
      type: [],
      status: [],
      untreated: true,
      focusOn: true,
      processed: true,
      positionData: [],
      // page: "",
      // dealWithStatus: "",
      current: 0,
      searchStatus: false,
      positionList: treedata
    };
  }

  // onOk = value => {
  //   // console.log("onOk: ", value);
  // };

  /**
   * 数据初始化渲染
  // 分页列表
  /*
   * 判断当前点击的状态
   */
  pageSizeChange = page => {
    const { startTime, endTime, value } = this.state;
    let types = [];
    let statu = [];
    if (this.state.type.length <= 1) {
      types = this.state.type;
    }

    if (this.state.status.length <= 1) {
      statu = this.state.status;
    }
    missList({
      pageLimit: 15,
      positions: value,
      pageNumber: page - 1,
      startTime,
      endTime,
      subType: types[0],
      status: statu[0]
    }).then(res => {
      const currPageNum =
        res.data.body.length === 0 ? 1 : res.data.pageInfo.currPageNum;
      const totalCount =
        res.data.body.length === 0 ? 1 : res.data.pageInfo.totalCount;
      this.setState({
        totalCount,
        data: res.data.body,
        current: currPageNum
      });
    });
    // }
  };
  test = (e, item) => {
    e.target.innerHTML = "已处理";
    e.target.style.color = "black";
    const data = {
      id: item.id,
      status: 1
    };
    console.log(this.props);
    // getList(data);
    getAlarmStatus(data).then(res => {
      console.log(res);
    });
  };

  // 筛选效果
  setStatus = e => {
    const { type } = this.state;
    const { dataStatus } = this.state;
    this.setState({
      searchStatus: false
    });
    if (dataStatus) {
      this.setState({
        dataStatus: false
      });
      e.target.className = "buttonBg";
    } else {
      this.setState({
        dataStatus: true
      });
      e.target.className = "bbb";
    }

    if (e.target.className === "buttonBg") {
      type.push(1);
    } else if (e.target.className === "bbb") {
      type.remove("1");
    }
  };

  // 弹出框控制
  changeExstate = state => {
    this.setState({
      visibale: state
    });
  };
  // 点击重置

  result = () => {
    const { currPageNum } = this.state;

    this.refs.focus.className = "focus";
    this.refs.unfocus.className = "unfocus";
    this.refs.processed.className = "processed";
    this.refs.unProcessed.className = "unProcessed";
    this.setState({
      value: null,
      dataStatus: true,
      visibale: false,
      currPageNum: 0, // 当前所在页,后台从0开始
      startTime: null,
      current: 0,
      endTime: null,
      type: [],
      status: [],
      untreated: true,
      focusOn: true,
      processed: true,
      searchStatus: false
    });

    missList({
      pageLimit: 15,
      positions: null,
      pageNumber: currPageNum,
      status: "",
      subType: ""
    }).then(res => {
      // eslint-disable-next-line prefer-const
      let currPageNum =
        res.data.body.length === 0 ? 1 : res.data.pageInfo.currPageNum;
      // eslint-disable-next-line prefer-const
      let totalCount =
        res.data.body.length === 0 ? 1 : res.data.pageInfo.totalCount;
      this.setState({
        totalCount,
        data: res.data.body,
        current: currPageNum
      });
    });
  };

  // 获取当前选择的点位 id
  handleChange = value => {
    console.log(value, '获取当前选择的点位')
    this.setState({
      value,
      searchStatus: false
    });
  };

  onChanges = value => {
    // const functionTypes = [0, 1];
    // let arr = [];
    console.log(value, '选中列表')
    this.setState({
      value,
      searchStatus: false
    });
  };

  renderTreeNode = data =>
    data &&
    data.map(item => {
      if (item.ems) {
        return (
          <TreeNode key={item.id} value={item.id} title={item.name}>
            {this.renderTreeNode(item.ems)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} value={item.id} title={item.name} />;
    });

  render() {
    return (
      <div className="alarmLists">
      <TreeSelect
        showSearch
        style={{ width: 300 }}
        value={this.state.value}
        placeholder="请选择点位"
        multiple
        autoClearSearchValue
        dropdownClassName
        allowClear
        treeDefaultExpandAll
        treeCheckable
        onTreeExpand={this.onTreeExpand}
        onChange={this.onChanges}
        showCheckedStrategy={SHOW_CHILD}
      >
      {this.renderTreeNode(treedata)}
    </TreeSelect>
      </div>
    );
  }
}


export default AllarmList

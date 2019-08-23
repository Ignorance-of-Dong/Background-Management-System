import axios from 'axios'
// import fetch from '../utils/fetch.js'
// let BASE_HOST = 'server.ignorantscholar.cn'

/**
 * 文章管理
 * activelistFn 文章列表
 * addActivelistFn 添加文章
 * removeActivelistFn 删除文章
 * updateActivelistFn 更新文章
 */
let activelistFn = () => {
  return axios.post('/active/activelist')
}
let addActivelistFn = (params) => {
  return axios.post('/active/addActivelist', params)
}
let removeActivelistFn = (params) => {
  return axios.post('/active/removeActivelist', params)
}
let updateActivelistFn = (params) => {
  return axios.post('/active/updateActivelist', params)
}

/**
 * 热门文章
 */

let articlesListHotFn = () => {
  return axios.post('/active/articlesListHot')
}
let addHotActivelistFn = (params) => {
  return axios.post('/active/hot/addActivelist', params)
}
let removeHotActivelistFn = (params) => {
  return axios.post('/active/hot/removeActivelist', params)
}
let updateHotActivelistFn = (params) => {
  return axios.post('/active/hot/updateActivelist', params)
}

/**
 * banner图片
 */

let bannerFn = () => {
  return axios.post('/active/banner')
}
let addbannerFn = (params) => {
  return axios.post('/active/addbanner', params)
}
let removebannerFn = (params) => {
  return axios.post('/active/removebanner', params)
}
let updatebannerFn = (params) => {
  return axios.post('/active/updatebanner', params)
}

/**
 * 问题
 */

let questionFn = () => {
  return axios.post('/active/questionlist')
}
let addquestionFn = (params) => {
  return axios.post('/active/addquestion', params)
}
let removequestionFn = (params) => {
  return axios.post('/active/removequestionlist', params)
}
let updatequestionFn = (params) => {
  return axios.post('/active/updatequestionlist', params)
}






export {
  updateHotActivelistFn,
  removeHotActivelistFn,
  updateActivelistFn,
  removeActivelistFn,
  addHotActivelistFn,
  articlesListHotFn,
  addActivelistFn,
  removebannerFn,
  updatebannerFn,
  activelistFn,
  addbannerFn,
  bannerFn,
  questionFn,
  addquestionFn,
  removequestionFn,
  updatequestionFn
}
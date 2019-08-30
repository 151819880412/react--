import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import storageUtils from '../../utils/storageUtils'

import memoryUtils from '../../utils/memoryUtils'
import LinkButton from '../../components/link-button'
import menuList from '../../config/menulonfig'
import { formateDate } from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import './index.less'

 class Header extends Component {
  state ={
    currentTime:Date.now(),
    dayPictureUrl: '', // 图片url
    weather: '', // 天气文本
  }

logout=()=>{ 
  Modal.confirm({
    title:'确认退出吗',
    
    onOk: () => {
      console.log('ok')
      // 确定后, 删除存储的用户信息
        // local中的
         storageUtils.removeUser()
        // 内存中的
        memoryUtils.user = {}
        // 跳转到登陆界面
        this.props.history.replace('/login')
        
    },
    onCancel(){
      console.log('Cancel')
      
    }
  })
}

  /* 
  根据当前请求的path得到对应的title
  */
 getTitle = () => {
  let title = ''
  const path = this.props.location.pathname
  // console.log('---------------',this.props)
  menuList.forEach(item => {
    if (item.key===path) {
      title = item.title
    } else if (item.children) {
      const cItem = item.children.find(cItem => path.indexOf(cItem.key) ===0)
      if (cItem) {
        title = cItem.title
      }
    }
    
  })
  return title
}

  /* 
  获取天气信息显示
  */
 getWeather = async () => {
  // 发请求
  const { dayPictureUrl, weather } = await reqWeather('北京')
  // 更新状态
  this.setState({
    dayPictureUrl, 
    weather
  })
}


componentDidMount () {
  // 启动循环定时器   由于有作用域的问题所以定时器的标识定义为Header的自定义属性
  this.intervalId = setInterval(() => {
    // 将currentTime更新为当前时间值
    this.setState({
      currentTime: formateDate(Date.now())
    })
  }, 1000);
  // 发jsonp请求获取天气信息显示
  this.getWeather()
}
componentWillUnmount () {
  // 清除定时器
  clearInterval(this.intervalId)
}




  render() {
    // console.log(this.state)
    const { currentTime, dayPictureUrl, weather } = this.state 
    const user =memoryUtils.user
     // 得到当前需要显示的title
     const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          欢迎,{user.username}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
          <span>{ currentTime }</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
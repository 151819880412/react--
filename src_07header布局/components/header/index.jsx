import React, { Component } from 'react'

import './index.less'

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          欢迎
          <a href="javascript:">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">角色管理</div>
          <div className="header-bottom-right">
            <span>20190716</span>
            <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather"/>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

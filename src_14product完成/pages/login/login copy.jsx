import React, {Component} from 'react'
import { Form, Input,Icon, Button,} from 'antd'
import logo from './images/logo.png'
import './login.less'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqLoin} from '../../api'
import {message} from 'antd'
import { Redirect } from 'react-router-dom'
// import Password from 'antd/lib/input/Password';
// import { from } from 'rxjs';

const Item = Form.Item

/*
登陆路由组件
 */
class Login extends Component {
  handleSubmit =(e)=>{
    e.preventDefault();

    // const form =this.props.form
    // const username =form.getFieldValue('username')
    // const password =form.getFieldValue('password')
    // console.log(username,password) 

    this.props.form.validateFields(async (err,{username,password})=>{
      if(!err){
        console.log(`${username},${password}`)
       const result = await reqLoin(username,password)
       if(result.status ===0){
         //将user信息保存在local中
         const user = result.data
          // localStorage.setItem('user_key', JSON.stringify(user))
          storageUtils.saveUser(user)
          // 保存到内存中
          memoryUtils.user = user
         // 跳转到管理界面
         this.props.history.replace('/')
         message.success('登陆成功!')
       }else{
         message.error(result.msg)
       }
      }else{
        console.log(err)
      }
    })

  }

  validator=(rule, value, callback)=>{
    const length = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) {
      // callback如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
      callback('必须输入密码')
    } else if (length < 4) {
      callback('密码必须大于4位')
    } else if (length > 12) {
      callback('密码必须小于12位')
    } else if (!pwdReg.test(value)) {
      //test() 方法用于检测一个字符串是否匹配某个模式.
      callback('密码必须是英文、数组或下划线组成')
    } else {
      callback() // 必须调用callback
    }
  }



  render() {
    
    // 读取保存的user, 如果存在, 直接跳转到管理界面
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    const user = memoryUtils.user
    if (user._id) {
      return <Redirect to="/" /> // 自动跳转到指定的路由路径
    }

    const { getFieldDecorator } = this.props.form
    return (
      
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>

        <section className='login-content'>
          <h3>用户登陆</h3>
          <Form onSubmit={this.handleSubmit } className="login-form">
            <Item>
             {
               getFieldDecorator('username',{
                  // 根据内置验证规则进行声明式验证
                  rules: [
                    {required: true, whitespace: true, message: '必须输入用户名'},
                    {min: 4, message: '用户名必须大于4位'},
                    {max: 12, message: '用户名必须小于12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'}
                  ]
               })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="用户名"/>
               )
             }
            </Item>
            <Item>
            {
                getFieldDecorator('password', {
                  // initialValue: '',
                  rules: [
                    // 自定义表单校验规则
                    {validator: this.validator}
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                         placeholder="密码"/>
                )
              }
            </Item>
            <Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Form.create()(Login)
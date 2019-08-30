import React, { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Form,
  Input
} from 'antd'
import Category from './category';

const Item = Form.Item

/* 
添加/修改分类的Form组件
*/
class AddUpdateForm extends Component {
  

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categoryName:PropTypes.string,
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
    // this.props.setForm(this.state)
      
  }



  
  render() {
    const { getFieldDecorator } = this.props.form
    const {categoryName} = this.props
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName  ,     //默认值
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input type="text" placeholder="请输入分类名称"></Input>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddUpdateForm)

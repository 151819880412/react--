import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button
} from 'antd'

import {reqCategorys} from '../../api'
import LinkButton from '../../components/link-button'

const Item = Form.Item
const Option = Select.Option

/*
商品添加/更新的路由组件
*/
class ProductAddUpdate extends Component {

  state = {
    categorys: []
  }

  getCategorys = async () => {
    const result = await reqCategorys()
    if (result.status === 0) {
      const categorys = result.data
      this.setState({ categorys })
    }
  }

 

  componentDidMount() {
    this.getCategorys()
  } 

  render() {
    const { categorys } = this.state
    const { product} = this
    const { getFieldDecorator } = this.props.form
   
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )

    // 指定form中所有item的布局
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card title={title}>
        <Form {...formLayout} onSubmit={this.handleSubmit}>
          <Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [
                { required: true, message: '必须输入商品名称!' }
              ],
            })(<Input placeholder="商品名称"/>)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator('desc', {
              initialValue: '',
              rules: [
                { required: true, message: '必须输入商品描述!' }
              ],
            })(<Input placeholder="商品描述"/>)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue: '',
              rules: [
                { required: true, message: '必须输入价格!' },
                { validator: this.validatePrice }
              ],
            })(<Input type="number" placeholder="商品价格" addonAfter="元"/>)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator('categoryId', {
              initialValue: '',
              rules: [
                { required: true, message: '必须输入商品分类!' }
              ],
            })(
              <Select>
                <Option value=''>未选择</Option>
                {
                  categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                }
              </Select>
            )}
          </Item>
          <Item label="商品图片">
            <div>商品图片组件</div>
          </Item>
          <Item label="商品详情">
            <div>商品详情组件</div>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
       </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)


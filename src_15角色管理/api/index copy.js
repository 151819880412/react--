import ajax from './ajax'
import jsonp from 'jsonp'  // axios不能发jsonp请求
import { message } from 'antd';
// const BASE = 'http://localhost:5000'
const BASE = ''

export function reqLoin(username,password){
  return  ajax({
        method:'post',
        url:BASE+'/login',
        data:{
            username,
            password
        }
    })
} 
const name ='admin'
const pwd = 'admin'
// 请求登陆
//export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})
reqLoin(name,pwd).then(result => { // response.data的值
    // const result = response.data
    // alert('请求成功了', result)
  },error=>{
      alert('请求失败了 '+ error.message);
  })



  // 发送jsonp请求得到天气信息
export const reqWeather = (city) => {

    // 执行器函数: 内部去执行异步任务, 
    // 成功了调用resolve(), 失败了不调用reject(), 直接提示错误
    return new Promise((resolve, reject) => { 
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      jsonp(url, {}, (error, data) => {
        if (!error && data.error===0) { // 成功的
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        } else { // 失败的
          message.error('获取天气信息失败')
        }
  
      })
    })
    
  }
  export const reqCategorys = () => ajax(BASE + '/manage/category/list')

  // 添加分类
export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {
  categoryName
})


// 修改分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update', {
  categoryId,
  categoryName
})
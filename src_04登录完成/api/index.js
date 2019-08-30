import ajax from './ajax'

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
reqLoin(name,pwd).then(result => { // response.data的值
    // const result = response.data
    alert('请求成功了', result)
  },error=>{
      alert('请求失败了 '+ error.message);
  })
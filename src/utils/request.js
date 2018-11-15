import axios from 'axios'
import { MessageBox } from 'mint-ui';

import qs from 'qs'

// create an axios instance
const service = axios.create({
  timeout: 60000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// request interceptor
service.interceptors.request.use(config => {
  if (config.type === 'json') {
    config.headers['Content-Type'] = 'application/json'
  }
  if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded' &&
  (config.method === 'post' || config.method === 'put' || config.method === 'delete' || config.method === 'patch')) {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const { code, resultMsg } = response.data
    if (code && code !== 200) {
      MessageBox.alert(resultMsg, '提示')

      return Promise.reject(response.data)
    }
    return response
  },
  async(error) => {
    const { response } = error
    if (response) {
      if (response.data) {
        const { code, resultMsg } = response.data
        if (code) {
          MessageBox.alert(resultMsg, '提示')
          return Promise.reject(error)
        }
      }
      MessageBox.alert('服务器开小差啦~', '提示')
    } else {
      MessageBox.alert('网络异常', '提示')
    }
    return Promise.reject(error)
  }
)

export default service

import axios from 'axios'
import qs from 'qs'
import config from './config'
const { apiBaseUrl } = config

let instance = axios.create({
    timeout: 1000 * 60,
    baseURL: apiBaseUrl
})

instance.defaults.responseType = 'json'
// `withCredentials` 表示跨域请求时是否需要使用凭证 默认false
instance.defaults.withCredentials = true
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
instance.defaults.transformRequest = [
    data => {
        return qs.stringify(data)
    }
]
// `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
instance.defaults.validateStatus = function (status) {
    return true
}
// 请求拦截器
instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应返回拦截器
instance.interceptors.response.use(
    response => {
        let data = response.data
        let status = response.status
        if (status === 200) {
            return Promise.resolve(data)
        } else {
            return Promise.reject(response)
        }
    }
)

let ajaxMethod = ['get', 'post']
let api = {}
ajaxMethod.forEach(method => {
    // 添加方法
    api[method] = function (url, data, config) {
        return new Promise(function (resolve, reject) {
            instance[method](url, data, config)
                .then(response => {
                    console.log(response)
                    if (response.code === 200) {
                        console.log('response')
                        resolve(response)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
})

export default api

import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'

axios.defaults.baseURL = 'http://localhost:3000'
//请求拦截器
axios.interceptors.request.use((config)=>{
    let {method,data}  = config
    // console.log(method)
    // console.log(data);
    if(method.toLowerCase() === 'post' && data instanceof Object){
    //    console.log(qs.stringify(data))
        config.data = qs.stringify(data)
    }
    return config

})
//响应拦截器
axios.interceptors.response.use(
    response=>{return response.data},
    error=>{
        message.error(error.message)
        return new Promise(()=>{})
    
    }
)

export default axios
import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'
import NProgress from 'nprogress'
import store from '../redux/store'
import { createSaveTitleAction } from '../redux/actions/header'
import {createDeleteUserAction} from '../redux/actions/login'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://localhost:3000'
//请求拦截器
axios.interceptors.request.use((config)=>{
    NProgress.start()
    let {method,data}  = config
    // console.log(method)
    // console.log(data);
    //获取token
    let {token} = store.getState().userInfo
    //请求携带token
    if(token){
        config.headers.Authorization = 'atguigu_'+token
    }
    if(method.toLowerCase() === 'post' && data instanceof Object){
    //    console.log(qs.stringify(data))
        config.data = qs.stringify(data)
    }
    return config

})
//响应拦截器
axios.interceptors.response.use(
    response=>{NProgress.done(); return response.data},
    error=>{
        NProgress.done();
        if(error.response.status===401){
            message.error('身份过期，请重新登录！')
            store.dispatch(createDeleteUserAction())
            store.dispatch(createSaveTitleAction(''))
        }else{

            message.error(error.message)
        }
        return new Promise(()=>{})
    
    }
)

export default axios
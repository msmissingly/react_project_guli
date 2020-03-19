//项目中所有发送请求的方法都会写在这里
import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'
import {WEATHER_URL,LOCATION,AK} from '../config/index'


export const reqLogin = (username,password)=>myAxios.post('/login',{username,password})
export const reqWeather = ()=>{
    const url = `${WEATHER_URL}?location=${LOCATION}&output=json&ak=${AK}`
    return new Promise((resolve)=>{
        jsonp(url,(err,data)=>{
            if(!err){
                // console.log(data)
                resolve(data.results[0].weather_data[0])
            }else{
                message.error(err)
            }
        })
    })
}
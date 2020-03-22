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
//请求商品分类信息
export const reqCategoryList = ()=>myAxios.get('/manage/category/list')
//请求添加一个分类
export const reqAddCategory = (categoryName)=>myAxios.post('/manage/category/add',{categoryName})
//请求修改一个分类
export const reqUpdateCategory = (categoryId,categoryName)=>myAxios.post('/manage/category/update',{categoryId,categoryName})
//请求商品列表
export const reqProductList=(pageNum,pageSize)=>myAxios.get('/manage/product/list',{params:{pageNum,pageSize}})
//请求搜索商品
export const reqSearchProduct=(searchType,keyWord,pageNum,pageSize)=>myAxios.get('/manage/product/search',{params:{[searchType]:keyWord,pageNum,pageSize}})
//请求商品上架下架
export const reqChangeProdStatus=(productId,status)=>myAxios.post('/manage/product/updateStatus',{productId,status})
//根据商品id查询商品详细信息
export const reqProductInfoById = (productId) => myAxios.get('/manage/product/info',{params:{productId}})


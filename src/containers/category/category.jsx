import React, { Component } from 'react'
import {reqCategoryList} from '../../ajax/index'

export default class Category extends Component {
    
        demo = async ()=>{
            let result = await reqCategoryList()
            console.log(result)
        }
    
    render() {
        return (
            <div>
                category
                <button onClick={this.demo}>点我获取商品分类数据</button>
            </div>
        )
    }
}

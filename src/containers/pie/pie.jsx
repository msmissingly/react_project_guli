import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
export default class Pie extends Component {
    getOption =()=> {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data:[
                        {value:235, name:'房产汽车'},
                        {value:274, name:'化妆用品'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <div>
                <ReactEcharts option={this.getOption()} />
            </div>
        )
    }
}

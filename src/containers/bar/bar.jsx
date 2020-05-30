import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
export default class Pie extends Component {
    getOption =()=> {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            toolbox:{
				show:true,
				feature:{
					saveAsImage:{},
					restore:{},
					dataView:{}
				}
			},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ['华为荣耀20', '华为WATCH', '华为P30', '华为mate20', '索尼1000XM3', 'LV女包']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
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

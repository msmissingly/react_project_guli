import React,{Component} from 'react'
import {Button,Modal} from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs'
import {createDeleteUserAction} from '../../redux/actions/login'
import {reqWeather} from '../../ajax/index'
import './css/header.less'

const {confirm} =Modal

class Header extends Component{
     state={
         isFull:false,
         date:dayjs().format(),
         weatherInfo:{
             dayPictureUrl:'',
             temperature:'',
             weather:''
         }
     }

     fullScreen=()=>{
         //让网页全屏
         screenfull.toggle()
     }
     logOut=()=>{
         confirm({
             title:'确定退出吗？',
             icon: <ExclamationCircleOutlined />,
             content: '退出后要重新登录',
             okText:'确定',
             cancelText:'取消',
             onOk:()=> { //确认按钮的回调
                 this.props.logout()
             },
         })
     }
     getWeather= async ()=>{
        let result =await reqWeather()//promise对象
        const {dayPictureUrl,weather,temperature}=result
        this.setState({dayPictureUrl,weather,temperature})

    }
     componentDidMount(){
         //是否全屏
         let isFull = !this.state.isFull
         this.setState({isFull})
        //开启更新时间的定时器
        this.timer = setInterval(()=>{
            this.setState({date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss')})
        },1000)
        this.getWeather()

     }
     componentWillUnmount(){
         clearInterval(this.timer)
     }
    render(){
        const {isFull,date,dayPictureUrl,temperature,weather} = this.state
        return(
            <div className='header'>
                <div className='header-top'>
                    <Button size='small' onClick={this.fullScreen}>
                        {isFull?<FullscreenExitOutlined /> : <FullscreenOutlined/>}
                    </Button>
                        <span className='user'>欢迎，{this.props.username}</span>
                    <Button onClick={this.logOut} type='link'>退出登录</Button>
                </div>
                <div className='header-bottom'>
                    <div className='bottom-left'>
                        <h1>首页</h1>
                    </div>
                    <div className='bottom-right'>
                        <span>{date}</span>
                        <img src={dayPictureUrl} alt="pic"/>
        <span>{weather}，温度:{temperature}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
 (state)=>({username:state.userInfo.user.username}),
 {
    logout:createDeleteUserAction
 }
)(Header)
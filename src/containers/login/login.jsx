import React,{Component} from 'react'
import {reqLogin} from '../../ajax/index'
import {connect} from 'react-redux'
import {UserOutlined,LockOutlined} from '@ant-design/icons'
import {Form,Input,Button,message} from 'antd'
import {createSaveUserAction} from '../../redux/actions/login'
import { Redirect } from 'react-router-dom'
import './css/login.less'
import logo from './imgs/logo.png'





class Login extends Component{

   
    //表单提交成功的回调
    onFinish=async (value)=>{
       const {username,password} = value
      let result = await reqLogin(username,password)
      const {status,data,msg} =result
      if(status===0){
          message.success('登录成功',1)
          this.props.save(data)
        //   this.props.history.replace('/admin')
      }else{
          message.warning(msg,1)
      }
    }
    pwdValidator=(rule,value)=>{
        if(!value){
            return Promise.reject('密码不能为空！')
        }else if(value.length<4){
            return Promise.reject('密码长度必须大于等于4位！')
        }else if(value.length>12){
            return Promise.reject('密码长度必须小于等于12位！')
        }else if(!(/^\w+$/).test(value)){
            return Promise.reject('密码必须是字母、数字或下划线组成！')
        }
        return Promise.resolve()
    }
    render(){
        const {Item} = Form
        if(this.props.isLogin) return <Redirect to='/admin'/>
        return(
            <div id='login'>
               <header className='login-header'>
                    <img src={logo} alt=""/>
                    <h2>谷粒商品后台管理系统</h2>
                </header>
                <div className='login-content'>
                    <h1>用户登录</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        >
                            {/* 声明式校验 */}
                        <Item
                            name="username"
                            rules={[
                            {required: true,message: '请输入你的用户名!',},
                            {max:12,message:'用户名必须小于等于12位'},
                            {min:4,message:'用户名必须大于等于4位'},
                            {partten:/^\w+$/,message:'用户名必须数字、字母、下划线'}
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Item>
                        {/* 密码是自定义校验 */}
                        <Item
                            name="password"
                            rules={[
                                {validator:this.pwdValidator}
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Item>
                        

                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                           
                        </Item>
                    </Form>

                </div>
            </div>
        )
    }
}
export default connect(
    state=>({isLogin:state.userInfo.isLogin}),
    {
        save:createSaveUserAction
    }
)(Login)
/* 
	问题：一个组件要和redux交互，要做哪些事情？
			1.引入connect（必须）
			2.调用connect（必须），不在暴露原来的组件，要暴露connect()(UI组件)
			3.给UI传递：(1).状态  (2).操作状态的方法
				备注：
							a.不一定非要传递状态，也不一定非要传递操作状态的方法
							b.但是状态和方法总得传一个，否则没意义。
							c.如果不传递操作状态的方法，就不用引入action
*/
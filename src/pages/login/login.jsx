import React,{Component} from 'react'
import {UserOutlined,LockOutlined} from '@ant-design/icons'
import {Form,Input,Button} from 'antd'
import logo from './imgs/logo.png'
import './css/login.less'
class Login extends Component{
    //表单提交成功的回调
    onFinish=()=>{
        console.log('表单提交了')
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
export default Login

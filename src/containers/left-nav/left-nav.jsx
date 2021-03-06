import React,{Component} from 'react'
import { Menu } from 'antd';
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../static/imgs/logo.png'
import './css/left-nav.less'
import menus from '../../config/menu-config'
import {createSaveTitleAction} from '../../redux/actions/header'



const { SubMenu,Item } = Menu;

 class LeftNav extends Component{

    //专门用于判断一个此单是否应该被渲染，接受一个菜单对象作为参数，返回一个布尔值
    //menuObj 为menu-config中的一组一组的对象
    hasAuth=(menuObj)=>{
        const {userMenus} = this.props
        if(this.props.username==='admin') return true
        if(!menuObj.children){
            return userMenus.find((item)=>item === menuObj.key)
        }else{
            return menuObj.children.some((item2)=>userMenus.indexOf(item2.key)!==-1)
        }
    }


    //创建菜单的方法menuArr为传入的menu-config的大数组
    createMenu = (menuArr)=>{
		return menuArr.map((menuObj)=>{
			if(this.hasAuth(menuObj)){
				if(!menuObj.children){
					return (
						<Item key={menuObj.key} onClick={()=>{this.props.saveTitle(menuObj.title)}}>
							<Link to={menuObj.path}>
								<menuObj.icon/>
								<span style={{marginLeft:'10px'}}>{menuObj.title}</span>
							</Link>
						</Item>
					)
				}else{
					return (
						<SubMenu
							key={menuObj.key}
							title={
								<span>
									<menuObj.icon/>
									<span>{menuObj.title}</span>
								</span>
							}
						>
							{this.createMenu(menuObj.children)}
						</SubMenu>
					)
				}
			}
		})
	}
    //根据菜单的key获取菜单的title
        getTitleByPath = ()=>{
            let key = this.props.location.pathname.split('/').reverse()[0]
            if(key === 'admin') key='home'
            let title=''
            menus.forEach((menuObj)=>{
                //1.若当前的这个菜单对象有children
                if(menuObj.children instanceof Array){
                    let result = menuObj.children.find((childrenObj)=>{
                        return childrenObj.key === key
                    })
                    if(result) title = result.title
                }else{//2.若当前的这个菜单对象无children
                    if(menuObj.key === key) title=menuObj.title
                }
            })
            this.props.saveTitle(title)
        }
        componentDidMount(){
            //当用户刷新页面，redux中的title没了，用该方法计算
            if(!this.props.title){
                
                this.getTitleByPath()
            }
        }

    render(){
        // console.log(this.props);
            const currentPathArr = this.props.location.pathname.split('/')
            // console.log(currentPathArr);
            const currentKey = currentPathArr.reverse()[0]
        return(
            <div className='left-nav'>
                <div className='nav-header'>
                    <img src={logo} alt=""/>
                    <h1>谷粒后台管理系统</h1>
                </div>
                
                <div >
                        <Menu
                            selectedKeys={[currentKey]}
                            defaultOpenKeys={currentPathArr}
                            mode="inline"
                            theme="dark"
                           
                        >
                            
                            {this.createMenu(menus)}
                        </Menu>
                </div>
                

            </div>
        )
    }
}
export default connect(
    (state)=>({
        title:state.title,
        userMenus:state.userInfo.user.role.menus,
        username:state.userInfo.user.username
    }),
    {
        saveTitle:createSaveTitleAction
    }
)(withRouter(LeftNav))
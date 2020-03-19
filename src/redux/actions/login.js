import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action-types'

export const createSaveUserAction = (userObj)=>{
    //向localStorage存储数据
    // console.log('333',userObj)
    localStorage.setItem('user',JSON.stringify(userObj.user))
    localStorage.setItem('token',userObj.token)
    return {type:SAVE_USER_INFO,data:userObj}
}
export const createDeleteUserAction =()=>{
    localStorage.clear()
    return {type:DELETE_USER_INFO,data:''}
}
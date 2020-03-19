import {combineReducers} from 'redux'
import loginReducer from './login'
//combineReducers传入的那个对象，就是redux中的那个大状态对象
export default combineReducers({
    userInfo:loginReducer
})
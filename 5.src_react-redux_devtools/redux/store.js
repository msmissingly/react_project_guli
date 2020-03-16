import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers/index'
//处理异步action
import thunk from 'redux-thunk'
//唤醒redux开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers/index'
//处理异步action
import thunk from 'redux-thunk'

export default createStore(reducer,applyMiddleware(thunk))
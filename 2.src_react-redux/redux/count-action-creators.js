//创建action 对象
import {INCREMENT,DECREMENT} from './action-types'
export const createIncrementAction=(value)=>({type:INCREMENT,data:value})
export const createDecrementAction=(value)=>({type:DECREMENT,data:value})
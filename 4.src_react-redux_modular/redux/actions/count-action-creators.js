//创建action 对象
import {INCREMENT,DECREMENT} from '../action-types'
export const createIncrementAction=(value)=>({type:INCREMENT,data:value})
export const createDecrementAction=(value)=>({type:DECREMENT,data:value})
export const createIncrementDelayAction=(value,time)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(createIncrementAction(value))
        },time)
    }
}
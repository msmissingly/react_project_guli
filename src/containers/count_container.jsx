//该文件是count组件的容器组件，容器组件要给count组件传递：1.redux中的状态； 2.操作状态的方法
import Count from '../components/count'

import {connect} from 'react-redux'

import { createIncrementAction, createDecrementAction } from '../redux/count-action-creators'
// function mapStateToProps(state){
//     return {number:state}
// }
// function mapDispatchToProps(dispatch){
//     return {
//         increment:(value)=>{dispatch(createIncrementAction(value))},
//         decrement:(value)=>{dispatch(createDecrementAction(value))}
//     }
// }

export default connect(
    state=>({number:state}),
    
    {
        increment:createIncrementAction,
        decrement:createDecrementAction
    }
)(Count)



import React,{Component} from 'react'


// import store from '../redux/store'

class Count extends Component{
    increment=()=>{
        //获取当前值
        let {value} = this.refs.selectNode
        this.props.increment(value*1)
    }
    decrement=()=>{
        let {value} = this.refs.selectNode
        this.props.decrement(value*1)
        

    }
    incrementIfOdd=()=>{
        let {value} = this.refs.selectNode
        let {number} = this.props
        if(number%2===1){
            this.props.increment(value*1)
        }
      

    }
    incrementAsync=()=>{
        let {value} = this.refs.selectNode
       
        setTimeout(()=>{
            this.props.increment(value*1)
            
       },1000)

    }
    render(){
        return(
            <div>
                <h2>当前总数为：{this.props.number}</h2>
                <select ref='selectNode'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>
               
            </div>
        )
    }
}
export default Count
import React,{Component} from 'react'
class App extends Component{
    state={
        count:0
    }

    increment=()=>{
        //获取当前值
        let {value} = this.refs.selectNode
        let {count} = this.state
        count+=value*1
        this.setState({count})
    }
    decrement=()=>{
        let {value} = this.refs.selectNode
        let {count} = this.state
        count-=value*1
        this.setState({count})

    }
    incrementIfOdd=()=>{
        let {value} = this.refs.selectNode
        let {count} = this.state
        if(count%2===1){
            count+=value*1
        }
        this.setState({count})

    }
    incrementAsync=()=>{
        let {value} = this.refs.selectNode
        let {count} = this.state
        setTimeout(()=>{
            count+=value*1
            this.setState({count})
       },1000)

    }
    render(){
        return(
            <div>
                <h2>当前总数为：{this.state.count}</h2>
                <select ref='selectNode'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <button onClick={this.incrementIfOdd}>increment if odd</button>
                <button onClick={this.incrementAsync}>increment async</button>
               
            </div>
        )
    }
}
export default App
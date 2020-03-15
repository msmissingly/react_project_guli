import React,{Component} from 'react'
import Count from './components/count'
class App extends Component{
    render(){
      return(
        <div>
            <Count store={this.props.store}/>
        </div>
      )
    }

    
}
export default App
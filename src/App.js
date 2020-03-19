import React,{Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './containers/login/login'
import Admin from './containers/admin/admin'


class App extends Component{
    render(){
        return(
           <Switch>
             <Route path='/login' component={Login}/>
             <Route path='/admin' component={Admin}/>
             <Redirect to="/login"/>
           </Switch> 
        
        )
    }
}
export default App
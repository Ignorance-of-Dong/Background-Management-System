import React from "react"
import {HashRouter as Router, Route,Switch,Redirect} from "react-router-dom"

class RouterMap extends React.Component{
    render(){
        const {route}=this.props;
        const defaultRouter=<Route path="/" component={()=>{
            return <Redirect to="/login" key={22}/>
        }} key={22}/>
        return <Router><Switch>
            {
                route.map((item,index)=>{
                    const Comp=item.component
                    return <Route path={item.path} component={(routers)=>{
                        return <Comp route={item.children} session={this.props.session}{...routers}></Comp>
                    }} key={index}/>
                }).concat(defaultRouter)
            }

        </Switch></Router>
   
    }
}

export default RouterMap
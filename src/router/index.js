import React from "react"
import RouterMap from "./map"
import Route from "./routes"
class RouterView extends React.Component{
    render(){
        const {route}=this.props
        return  <RouterMap route={route === undefined ? Route : route} session={this.props.session}></RouterMap>
        
    }
}
export default RouterView
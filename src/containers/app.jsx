
import React from "react";
import RouterView from "../router/index"
import "../common/css/index.css"

class App extends React.Component {
    render() {
        return  <div className="wraper">
            <RouterView/>
        </div>
    }
}

export default App;
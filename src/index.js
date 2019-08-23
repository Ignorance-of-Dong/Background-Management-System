import React from 'react';
import ReactDOM from 'react-dom';
import "./common/css/index.css"
import App from '../src/containers/app';
import {Provider} from "react-redux"
import stort from "./store/store"

ReactDOM.render(<Provider store={stort}> <App /></Provider>,document.getElementById('root'));

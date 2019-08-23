import { createStore, applyMiddleware } from "redux";
import RankReducer from "./reducers/reducer"
import thunk from "redux-thunk";
const store = createStore(RankReducer, applyMiddleware(thunk));
export default store

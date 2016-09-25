import { combineReducers } from "redux"
import home from "./home"
import tabs from "./tabs"

const rootReducer = combineReducers({
  home,
  tabs
})

export default rootReducer

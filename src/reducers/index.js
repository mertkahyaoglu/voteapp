import { combineReducers } from "redux"
import home from "./home"
import login from "./login"
import vote from "./vote"

const rootReducer = combineReducers({
  home,
  login,
  vote,
})

export default rootReducer

import { combineReducers } from "redux"
import home from "./home"
import login from "./login"
import vote from "./vote"
import notification from "./notification"

const rootReducer = combineReducers({
  home,
  login,
  vote,
  notification,
})

export default rootReducer

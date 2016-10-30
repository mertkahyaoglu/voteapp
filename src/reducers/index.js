import { combineReducers } from "redux"
import home from "./home"
import login from "./login"
import vote from "./vote"
import notification from "./notification"
import socket from "./socket"

const rootReducer = combineReducers({
  home,
  login,
  vote,
  notification,
  socket
})

export default rootReducer

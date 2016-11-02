import { combineReducers } from "redux"
import home from "./home"
import login from "./login"
import vote from "./vote"
import notification from "./notification"
import friend from "./friend"
import socket from "./socket"

const rootReducer = combineReducers({
  home,
  login,
  vote,
  notification,
  friend,
  socket
})

export default rootReducer

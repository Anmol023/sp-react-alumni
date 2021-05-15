import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import userReducer from './user/userReducer'

const rootReducer = combineReducers({
    user : userReducer,
    auth : authReducer
})

export default rootReducer;
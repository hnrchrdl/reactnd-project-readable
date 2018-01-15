import { default as category } from './category'
import { combineReducers } from 'redux'
import { default as post } from './post'

const rootReducer = combineReducers({
    category,
    post
})

export default rootReducer
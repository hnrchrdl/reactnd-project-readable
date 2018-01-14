import { applyMiddleware, compose, createStore }  from 'redux'

import rootReducer from './reducers'
import thunk from 'redux-thunk'

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = initialState => createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(logger, thunk)))

export default configureStore
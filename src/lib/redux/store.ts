import { createStore, applyMiddleware } from 'redux'
import { logger } from './middleware'
import { rootReducer } from './reducer'
import thunk from 'redux-thunk'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

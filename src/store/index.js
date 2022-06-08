import { createWrapper } from 'next-redux-wrapper'
import {createStore,compose,applyMiddleware}from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const initStore = ()=>{
    return createStore(reducers,compose(applyMiddleware(thunk)))
}

export const wrapper = createWrapper(initStore)

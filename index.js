const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

// action (creator function)
function orderCake() {
    return {
        type: CAKE_ORDERED,
    }
}

// action (creator function)
function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialCakeState =  {
    numOfCakes: 10,
}

const initialIceCreamState =  {
    numOfIceCreams: 20,
}

// reducer (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case 'CAKE_ORDERED':
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case 'CAKE_RESTOCKED':
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case 'ICECREAM_ORDERED':
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case 'ICECREAM_RESTOCKED':
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}

// combine multiple reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

// store
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('initial state', store.getState())

// subscribe/unsubscribe
const unbsubscribe = store.subscribe(() => {})

// bind actions
const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)

// unbsubscribe to changes
unbsubscribe()
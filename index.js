const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

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

const initialState = {
    numOfCakes: 10,
}

// reducer (previousStae, action) => newState
const reducer = (state = initialState, action) => {
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

// store
const store = createStore(reducer)
console.log('initial state', store.getState())

// subscribe/unsubscribe
const unbsubscribe = store.subscribe(() => 
    console.log('Update state', store.getState())
)

// bind actions
const actions = bindActionCreators({orderCake, restockCake}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake()

// unbsubscribe to changes
unbsubscribe()
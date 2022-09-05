const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

// action (creator function)
function orderCake() {
    return {
        type: CAKE_ORDERED,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

const initialState = {
    numOfCakes: 10,
}

// reducer
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

// dispatch action
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

// dispatch new action
store.dispatch(restockCake(3))

// unbsubscribe to changes
unbsubscribe()
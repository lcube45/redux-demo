const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED'

// action (creator function)
function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
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

// unbsubscribe to changes
unbsubscribe()
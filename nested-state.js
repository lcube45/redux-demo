const redux = require('redux')
const createStore = redux.createStore
const produce = require('immer').produce

const initialState = {
    name: 'lcube',
    address: {
        street: 'poirier rond',
        city: 'orleans',
        state: 'loiret'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

// action (creator function)
function updateStreet(street) {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

// reducer (previousState, action) => newState
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'STREET_UPDATED':
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
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

store.dispatch(updateStreet('rue bellebat'))
unbsubscribe()
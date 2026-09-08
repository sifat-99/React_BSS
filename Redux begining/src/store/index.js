
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0,
        showCounter: true
    },
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    },
})
const initialAuthState = {
    isAuthenticated: false
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})

// const counterReducer = (state = { counter: 0, showCounter: true }, action) => {
//     if (action.type === 'INCREMENT') {
//         return {
//             counter: state.counter + 1
//         };
//     }
//     else if (action.type === 'DECREMENT') {
//         return {
//             counter: state.counter - 1
//         };
//     }
//     else if (action.type === 'increase') {
//         return {
//             counter: state.counter + action.payload
//         };
//     }
//     else {
//         return state;
//     }
// };

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authenticationSlice.reducer
    }
});
export const { increment, decrement, increase, toggleCounter } = counterSlice.actions
export const { login, logout } = authenticationSlice.actions
export default store;

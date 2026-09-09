
import { createSlice, configureStore } from '@reduxjs/toolkit'

import { counterReducer } from './counter';
import { authenticationReducer } from './auth';



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
        counter: counterReducer,
        auth: authenticationReducer
    }
});


export default store;

import { createSlice } from '@reduxjs/toolkit'
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0, changed: false },
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items || [];
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items?.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    name: newItem.title,
                    totalPrice: newItem.price
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        }
    }
})

export const fetchCardData = () => {
    return async (dispatch) => {
        // dispatch(uiActions.showNotification({
        //     title: 'Getting...',
        //     message: 'Getting cart data!',
        //     status: 'pending'
        // }));
        const fetchData = async () => {
            const res = await fetch('https://redux-advance-bss-default-rtdb.firebaseio.com/cart.json');

            if (!res.ok) {
                throw new Error('Failed to fetch cart data!');
            }
            const data = await res.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData?.items || [],
                totalQuantity: cartData?.totalQuantity
            }));
            // dispatch(uiActions.showNotification({
            //     title: 'Success!',
            //     message: 'Cart data fetched successfully!',
            //     status: 'success'
            // }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                title: 'Error!',
                message: 'Failed to fetch cart data!',
                status: 'error'
            }));
        }

    }
}


export const sendCartData = (cartData) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            title: 'Sending...',
            message: 'Sending cart data!',
            status: 'pending'
        }));

        const sendRequest = async () => {
            const res = await fetch('https://redux-advance-bss-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: cartData.items, totalQuantity: cartData.totalQuantity }),
            });

            if (!res.ok) {
                throw new Error('Sending cart data failed.');
            }
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                title: 'Success!',
                message: 'Sent cart data successfully!',
                status: 'success'
            }));

        } catch (error) {
            dispatch(uiActions.showNotification({
                title: 'Error!',
                message: 'Sending cart data failed!',
                status: 'error'
            }));
        }
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice;
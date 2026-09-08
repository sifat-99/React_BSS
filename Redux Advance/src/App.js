import { useEffect, Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import { fetchCardData, sendCartData } from './store/cart-slice';


let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    console.log(cart)
    dispatch(fetchCardData())

  }, [dispatch])

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       title: 'Sending......',
    //       message: 'Sending cart data',
    //       status: 'pending'
    //     })
    //   );
    //   const res = await fetch('https://redux-advance-bss-default-rtdb.firebaseio.com/cart.json', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(cart)
    //   });
    //   if (!res.ok) {
    //     throw new Error('Failed to fetch cart data');
    //   }
    //   dispatch(uiActions.showNotification({
    //     title: 'Success!',
    //     message: 'Cart data sent successfully',
    //     status: 'success'
    //   }));
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {

      dispatch(sendCartData(cart));
    }


    // sendCartData().catch((error) => {
    //   dispatch(uiActions.showNotification({
    //     title: 'Error!',
    //     message: 'Failed to send cart data',
    //     status: 'error'
    //   }));
    // });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification title={notification.title} message={notification.message} status={notification.status} />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

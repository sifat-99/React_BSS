import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart?.items);
  console.log(cartItems);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.totalPrice
              }}
            />
          ))
        )}
      </ul>
    </Card>
  );
};

export default Cart;

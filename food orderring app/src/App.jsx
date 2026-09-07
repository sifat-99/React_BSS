import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <section className="m-0 antialiased bg-gradient-to-b from-background-start to-background-end text-text-main min-h-screen pb-24">
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </section>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

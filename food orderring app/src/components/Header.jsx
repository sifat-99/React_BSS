import { useContext } from "react";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import logoImg from "../assets/logo.jpg";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header className="flex justify-between items-center py-12 px-[10%]">
      <div className="flex gap-4 items-center">
        <img
          src={logoImg}
          alt="A restaurant"
          className="w-16 h-16 object-contain rounded-full border-2 border-primary"
        />
        <h1 className="font-['Lato',sans-serif] font-bold text-3xl m-0 text-primary tracking-[0.2rem] uppercase">
          ReactFood
        </h1>
      </div>
      <nav>
        <Button
          textOnly
          onClick={handleShowCart}
          className="text-2xl font-['Lato',sans-serif]"
        >
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}

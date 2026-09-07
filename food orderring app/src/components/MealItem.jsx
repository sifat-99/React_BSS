import { useContext } from "react";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../utils/formatting.js";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li className="bg-surface rounded-2xl overflow-hidden text-center shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
      <article className="h-full flex flex-col justify-between">
        <img
          src={`http://localhost:3000/${meal.image}`}
          alt={meal.name}
          className="w-full h-[20rem] object-cover"
        />
        <div>
          <h3 className="text-2xl font-bold my-3">{meal.name}</h3>
          <p className="inline-block bg-surface-light text-primary text-sm font-bold px-8 py-2 m-0 rounded-[4px]">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="m-4">{meal.description}</p>
        </div>
        <p className="mb-6 mt-0">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}

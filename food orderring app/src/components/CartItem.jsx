export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  return (
    <li className="flex justify-between items-center my-2 mx-0">
      <p className="m-0">
        {name} - {quantity} x ${price}
      </p>
      <p className="flex gap-4 items-center">
        <button
          onClick={onDecrease}
          className="cursor-pointer text-base w-6 h-6 rounded-full border-none bg-surface-light text-primary flex justify-center items-center hover:bg-surface hover:text-primary-hover active:bg-surface active:text-primary-hover"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={onIncrease}
          className="cursor-pointer text-base w-6 h-6 rounded-full border-none bg-surface-light text-primary flex justify-center items-center hover:bg-surface hover:text-primary-hover active:bg-surface active:text-primary-hover"
        >
          +
        </button>
      </p>
    </li>
  );
}

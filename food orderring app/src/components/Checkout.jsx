import { useContext, useState } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState();
  const [didSubmit, setDidSubmit] = useState(false);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * parseFloat(item.price),
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    setDidSubmit(false);
  }

  async function checkoutAction(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    setIsSending(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order.");
      }

      setDidSubmit(true);
    } catch (err) {
      setError(
        err.message || "Something went wrong, failed to send order data.",
      );
    }
    setIsSending(false);
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (didSubmit) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2 className="text-black font-bold text-2xl my-4">Success!</h2>
        <p className="text-black">Your order was submitted successfully.</p>
        <p className="text-black">
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="flex justify-end gap-4">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={checkoutAction} className="text-black">
        <h2 className="font-bold text-2xl my-4">Checkout</h2>
        <p className="mb-4">Total Amount: ${cartTotal.toFixed(2)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="flex justify-start gap-4">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && (
          <div className="w-[90%] max-w-[25rem] my-4 mx-auto p-4 bg-error-surface text-error-text rounded-md">
            <h2 className="m-0 font-bold text-xl">Failed to submit order</h2>
            <p className="m-0">{error}</p>
          </div>
        )}

        <p className="flex justify-end gap-4 mt-4">{actions}</p>
      </form>
    </Modal>
  );
}

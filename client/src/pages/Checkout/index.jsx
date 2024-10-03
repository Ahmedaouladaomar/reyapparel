import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cart";
import { Session } from "@/context/user";
import { Anchor, Button, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HOME } from "@/pages/routes";

// calling `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function Checkout() {
  // navigation
  const navigate = useNavigate();
  // render
  const [isRender, setIsRender] = useState(false);
  // user context
  const { state } = useContext(Session);
  const { user } = state;
  // cart context
  const { cart, call, response } = useContext(CartContext);
  // options
  const options = {
    mode: "payment",
    amount: cart?.totalPrice * 100,
    currency: "usd",
    payment_method_types: ["card"],
  };

  // first render
  useEffect(() => {
    if(!user) {
      navigate(HOME);
      return;
    }
    call().then(() => setIsRender(true));
  }, []);

  // check cart
  useEffect(() => {
    if (isRender) {
      if (!response || !response.data) navigate(HOME);
    }
  }, [response]);

  return (
    <div className="relative min-h-[100vh] pt-20 flex flex-col justify-center items-center">
      <div className="w-[80%] border px-4 py-8 bg-zinc-50 flex items-center">
        {user && cart && response && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <Center my={10}>
        <Anchor c="gray" underline="always" onClick={() => navigate(HOME)}>
          <Button variant="light">Back</Button>
        </Anchor>
      </Center>
    </div>
  );
}

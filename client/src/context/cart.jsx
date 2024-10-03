import { createContext, useContext, useEffect, useRef, useState } from "react";
import { USER_CART } from "@/pages/routes";
import useAxios, { GET } from "@/hooks/useAxios";
import { Session } from "@/context/user";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  // user context
  const { state } = useContext(Session);
  const { user } = state;
  // custom hook
  const { call, response, loading } = useAxios(
    USER_CART.replace(":id", user?.id),
    GET
  );
  // ref
  const cartTriggerRef = useRef();
  // cart
  const [cart, setCart] = useState(user?.cart);

  useEffect(() => {
    response && setCart(response.data?.cart);
  }, [response]);

  return (
    <CartContext.Provider
      value={{ call, response, loading, cart, cartTriggerRef }}
    >
      {children}
    </CartContext.Provider>
  );
};

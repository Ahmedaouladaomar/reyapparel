import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import { ADD_TO_CART } from "../../pages/routes";
import { PATCH } from "../../hooks/useAxios";
import Dialog from "../Dialog";
import { Divider, Flex, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export default function CartActionButton({
  user,
  quantity,
  variantId,
  variants,
  price,
  load,
  setLoad,
}) {
  // cart context
  const { cartTriggerRef, call } = useContext(CartContext);
  // display
  const [display, toggle] = useState(true);

  const addToCart = async () => {
    // variant
    let variant = variants.filter((item) => item.id == variantId);
    variant = variant[0];
    // loading
    setLoad(true);
    // request body
    let body = {
      user: user,
      variant: variant,
      quantity: quantity,
      price: price,
    };
    // api call
    await call({
      body: body,
      newPath: ADD_TO_CART,
      newMethod: PATCH,
      delayMs: 500,
    });
    // loading
    setLoad(false);
    // open cart drawer
    cartTriggerRef.current.click();
  };

  return (
    <Dialog
      content={
        <Flex direction="column" align="center" justify="center" gap={10}>
          {display ? <Login toggle={toggle} /> : <Register toggle={toggle} />}
        </Flex>
      }
      label="Add to cart"
      mx="auto"
      width="100%"
      onClick={user ? addToCart : null}
      loading={load}
      withCloseButton={true}
      disabled={!variantId}
    />
  );
}

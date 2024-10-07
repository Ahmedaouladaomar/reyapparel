import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Button,
  Text,
  Flex,
  Divider,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";
import CartItem from "../CartItem";
import { useContext, useEffect, useState } from "react";
import { Session } from "../../context/user";
import { CartContext } from "../../context/cart";
import CartFooter from "../CartFooter";
import CartHeader from "../CartHeader";
import { generateHash } from "../../helpers/string";

export default function CartDrawer() {
  // drawer hook
  const [opened, { open, close }] = useDisclosure(false);
  // render state
  const [isRender, setIsRender] = useState(false);
  // cart items
  const [items, setItems] = useState([]);
  // cart total
  const [totalPrice, setTotalPrice] = useState();
  // user context
  const { state } = useContext(Session);
  const { user } = state;
  // cart context
  const { call, loading, response, cartTriggerRef } = useContext(CartContext);

  // first render
  useEffect(() => {
    if (!isRender && user) {
      call().then(() => setIsRender(true));
    }
  }, []);

  // setting data
  useEffect(() => {
    if (isRender && user && response) {
      // items
      setItems(response.data?.items);
      // total
      setTotalPrice(response.data?.totalPrice);
    }
  }, [response]);

  return (
    <>
      <Drawer
        pos="relative"
        position="right"
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ opacity: 0.6 }}
          loaderProps={{ children: " " }}
        />
        <Flex
          className="absolute left-0 h-[95%] w-[100%]"
          direction="column"
          justify="space-between"
          gap={10}
        >
          <CartHeader close={close} />
          <Divider my={5} />
          {user && items && items.length ? (
            <>
              <Flex
                className="basis-[80%] overflow-scroll px-4"
                direction="column"
                gap={10}
              >
                {items.map((item, index) => (
                  <CartItem
                    key={generateHash(
                      item.variant.id,
                      item.variant.product.name
                    )}
                    id={item.variant.id}
                    name={item.variant.product.name}
                    description={item.variant.product.description}
                    imageUrl={item.variant.product.imageURL}
                    inStock={item.variant.inStock}
                    price={item.variant.product.price}
                    count={item.quantity}
                    variant={item.variant}
                    user={user}
                    call={call}
                    loading={loading}
                  />
                ))}
              </Flex>
              <Divider my={0} />
              <CartFooter totalPrice={totalPrice} />
            </>
          ) : (
            <Flex align="center" flex={1} justify="center" gap={5} h={400}>
              <IconShoppingCart color="gray" />
              <Text c="gray" size="xl">
                Empty bag
              </Text>
            </Flex>
          )}
        </Flex>
      </Drawer>

      <Button
        ref={cartTriggerRef}
        onClick={open}
        variant="transparent"
        px={5}
        py={0}
      >
        <IconShoppingBag color="black" />
      </Button>
    </>
  );
}

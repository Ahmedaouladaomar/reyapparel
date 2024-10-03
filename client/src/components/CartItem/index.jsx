import { ActionIcon, Flex, Image, NumberFormatter, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import imageErrorSrc from "@/images/image-not-found.png";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { PATCH } from "@/hooks/useAxios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "@/pages/routes";
import { capitalize } from "@/helpers/string";

export default function CartItem({
  name,
  price,
  imageUrl,
  inStock,
  count,
  variant,
  user,
  call,
  loading,
}) {
  // items count
  const [itemCount, setItemCount] = useState();

  useEffect(() => {
    setItemCount(count);
  }, [count]);

  const onIncrement = async () => {
    if (itemCount >= inStock) {
      // Return null
      return;
    }
    // update state
    setItemCount(itemCount + 1);
    // request body
    let body = {
      user: user,
      variant: variant,
      quantity: 1,
      price: price,
    };
    // api call
    call({ body: body, newPath: ADD_TO_CART, newMethod: PATCH, delayMs: 1000 });
  };

  const onDecrement = () => {
    let newCount = itemCount - 1;
    // update state
    setItemCount(newCount);
    // check
    if (newCount > inStock) return;
    // request body
    let body = {
      user: user,
      variant: variant,
      price: price,
    };
    // api call
    call({
      body: body,
      newPath: REMOVE_FROM_CART,
      newMethod: PATCH,
      delayMs: 1000,
    });
  };

  return (
    <div className={`flex gap-[20px]`}>
      <Image className="min-w-[70px] w-[70px]" h={100} src={imageUrl ? imageUrl : imageErrorSrc} />
      <div className="section flex flex-col flex-1 justify-between">
        <div className="info">
          <Text className="title" size="lg" fw={700}>
            {capitalize(name)}
          </Text>
          {variant && (
            <Flex gap={5}>
              <Text c="gray" size="sm">
                {capitalize(variant.option)}:
              </Text>
              <Text c="gray" size="sm">
                {capitalize(variant.value)}
              </Text>
            </Flex>
          )}
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="total flex justify-between">
            <div className="items flex justify-between items-center border border-solid border-slate-300 rounded-sm h-[30px] w-[100px]">
              <ActionIcon
                variant="transparent"
                onClick={onIncrement}
                disabled={loading}
              >
                <IconPlus height={14} color="gray" />
              </ActionIcon>
              <Text>{itemCount}</Text>
              <ActionIcon
                variant="transparent"
                onClick={onDecrement}
                disabled={loading}
              >
                <IconMinus height={14} color="gray" />
              </ActionIcon>
            </div>
            <Text className="price" size="xl" fw={600}>
              <NumberFormatter prefix="$" value={price} thousandSeparator />
            </Text>
          </div>
          {itemCount >= inStock && (
            <Text mt={5} size="sm" c="red">
              You can't purchase more than {inStock}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}

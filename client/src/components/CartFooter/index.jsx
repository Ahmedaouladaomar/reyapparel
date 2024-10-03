import React from "react";
import { Box, Button, Flex, NumberFormatter, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { CHECKOUT } from "@/pages/routes";

export default function CartFooter({ totalPrice }) {
  return (
    <Box className="flex flex-col basis-[10%] px-2" h={100}>
      <Flex h="100%" align="center" justify="space-between">
        <Text>Subtotal:</Text>
        <Text className="price" size="xl" fw="bold">
          <NumberFormatter prefix="$" value={totalPrice} thousandSeparator />
        </Text>
      </Flex>
      <Link to={CHECKOUT}>
        <Button w="100%" color="black">
          Checkout
        </Button>
      </Link>
    </Box>
  );
}

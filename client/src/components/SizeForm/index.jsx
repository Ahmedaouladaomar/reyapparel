import { Button, Flex, NumberInput, TextInput } from "@mantine/core";
import React, { useState } from "react";

export default function SizeForm({ setVariants }) {
  // state
  const [label, setLabel] = useState("");
  const [quantity, setQuantity] = useState(0);

  return (
    <Flex align="end" gap={10}>
      <TextInput
        value={label}
        label="Size"
        onChange={(e) => setLabel(e.currentTarget.value)}
      />
      <NumberInput value={quantity} label="Quantity" onChange={setQuantity} />
      <Button
        disabled={!(label && quantity && quantity > 0)}
        color="gray"
        onClick={() => {
          setVariants((sizes) => [...sizes, { value: label, inStock: quantity }]);
          // resetting fields
          setLabel("");
          setQuantity(0);
        }}
      >
        Add size
      </Button>
    </Flex>
  );
}

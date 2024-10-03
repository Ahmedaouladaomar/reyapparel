import { useState } from "react";
import {
  ColorSwatch,
  CheckIcon,
  rem,
  Flex,
  Text,
  Select,
  Radio,
  Group,
} from "@mantine/core";
import { capitalize } from "../../helpers/string";

export default function SizeVariant({
  variants,
  setVariantId,
  width = "auto",
  radio,
  select,
}) {
  // select data
  const data = variants
    ? variants.map((variant) => {
        let label = capitalize(variant.value),
          quantity = variant.inStock;
        if (quantity == 1) {
          label += " (Only " + quantity + " item left)";
        } else if (quantity > 1) label += " (" + quantity + " items left)";
        else label += " (Out of stock)";

        return {
          label: label,
          value: `${variant.id}`,
        };
      })
    : [];

  return (
    <div >
      {radio && (
        <Radio.Group onChange={setVariantId}>
          <Group mt="xs" className="flex gap-[5px]">
            {variants.map((variant) => (
              <Radio
                key={variant.id}
                value={`${variant.id}`}
                label={<Text size="sm" c="gray">{capitalize(variant.value)}</Text>}
                m={0}
                p={0}
              />
            ))}
          </Group>
        </Radio.Group>
      )}
      {select && (
        <Select
          disabled={!data || !data.length}
          w={width}
          placeholder="Size"
          data={data}
          onChange={setVariantId}
        />
      )}
    </div>
  );
}

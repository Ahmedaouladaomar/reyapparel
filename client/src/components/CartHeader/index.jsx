import React from "react";
import {
  ActionIcon,
  Box,
  CloseIcon,
  Divider,
  Flex,
  NumberFormatter,
  Text,
} from "@mantine/core";
import classes from "./styles.module.css";

export default function CartHeader({ close }) {
  return (
    <Flex className="px-2 flex items-center" justify="space-between">
      <Text fz="xl" fw={700}>
        Shopping bag
      </Text>
      <ActionIcon variant="transparent" onClick={close}>
        <CloseIcon color="black" />
      </ActionIcon>
    </Flex>
  );
}

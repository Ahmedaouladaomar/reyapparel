import React, { useContext, useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  NumberFormatter,
  ButtonGroup,
  Flex,
  NavLink,
  Anchor,
  Divider,
  Box,
} from "@mantine/core";
import { capitalize } from "../../helpers/string";
import imageErrorSrc from "../../images/image-not-found.png";
import useAxios, { PATCH } from "../../hooks/useAxios";
import { ADD_TO_CART, PDP_PATH } from "../../pages/routes";
import Dialog from "../Dialog";
import {
  IconChevronRight,
  IconInfoCircle,
  IconMagnet,
  IconSearch,
} from "@tabler/icons-react";
import { CartContext } from "../../context/cart";
import SizeVariant from "../VariantPicker/SizeVariant";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export default function ProductCard({ name, price, imageURL, className }) {
  return (
    <Card className={className} shadow="sm" padding="sm" withBorder>
      <Card.Section>
        <Link className="w-[100%]" to={PDP_PATH.replace(":name", name)}>
          <Image
            h={200}
            w="100%"
            fit="cover"
            src={imageURL || imageErrorSrc}
            alt="Media"
          />
        </Link>
      </Card.Section>

      <Flex direction="column" justify="space-between" h="100%">
        <Flex direction="column">
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{capitalize(name)}</Text>
          </Group>

          <Text size="lg" c="gray">
            <NumberFormatter prefix="$" value={price} thousandSeparator />
          </Text>
        </Flex>

        <Box>
          <Link to={PDP_PATH.replace(":name", name)}>
            <Button w="100%">View product</Button>
          </Link>
        </Box>
      </Flex>
    </Card>
  );
}

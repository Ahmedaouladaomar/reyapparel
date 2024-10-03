import { Flex, Text } from "@mantine/core";
import { IconAt, IconMapPin, IconPhone, IconSun } from "@tabler/icons-react";

export const data = [
  { title: "Email", description: "contact90jawab@gmail.com", icon: IconAt },
  { title: "Phone", description: "+212 000000000", icon: IconPhone },
];

import React from "react";

export default function ContactIcon({ icon: Icon, title, description }) {
  return (
    <Flex align="center" gap={10}>
      <Icon />
      <Flex direction="column">
        <Text size="sm">{title}</Text>
        <Text size="lg">{description}</Text>
      </Flex>
    </Flex>
  );
}

import React from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  NumberFormatter,
  Title,
  Anchor,
} from "@mantine/core";
import { IconReportMoney, IconZoomMoney } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function FiguresCard({ title, description, value, label, url }) {
  return (
    <Card w={300} shadow="sm" radius="md" withBorder>
      <Title order={2}>{title}</Title>
      <Group justify="space-between" mb="xs">
        <Text size="xl" fw={700}>
          {value}
        </Text>
        <IconReportMoney />
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>
      {label && url && (
        <Anchor href={url}>
          <Button mt="md">{label}</Button>
        </Anchor>
      )}
    </Card>
  );
}

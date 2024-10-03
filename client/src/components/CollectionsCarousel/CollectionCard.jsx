import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  rem,
  Button,
} from '@mantine/core';
import classes from './styles.module.css';
import imageErrorSrc from "../../images/image-not-found.png";

export function CollectionCard({ title, description, src, href }) {
  const linkProps = { href: href, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image src={src || imageErrorSrc} h={300} fit="cover" />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        New
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Group gap={8} w="100%">
          <a className='w-[100%]' {...linkProps}>
            <Button w="100%">View</Button>
          </a>
        </Group>
      </Group>
    </Card>
  );
}
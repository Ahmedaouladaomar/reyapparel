import { Anchor, Group, ActionIcon, rem, Text, Flex } from "@mantine/core";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandGithubFilled,
} from "@tabler/icons-react";
import classes from "./styles.module.css";
import { ABOUT, CONTACT } from "../../pages/routes";
import { GITHUB_PROFILE_LINK, LINKEDIN_PROFILE_LINK } from "@/helpers/consts";

const links = [
  { link: CONTACT, label: "Contact" },
  { link: ABOUT, label: "About" },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor c="dimmed" key={link.label} href={link.link} lh={1} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className="basis-1/3">{items}</Group>
        <Flex direction="column">
          <Text className="basis-1/3 text-center" c="gray">
            © Reyapparel 2024
          </Text>
          <Text className="flex-1 basis-1/3 text-center" c="gray">
            Developed by Ahmed AOULAD AOMAR
          </Text>
        </Flex>
        <Group className="basis-1/3" gap="xs" justify="flex-end" wrap="nowrap">
          <Anchor href={LINKEDIN_PROFILE_LINK}>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandLinkedin
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Anchor>
          <Anchor href={GITHUB_PROFILE_LINK}>
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandGithub
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Anchor>
        </Group>
      </div>
    </div>
  );
}

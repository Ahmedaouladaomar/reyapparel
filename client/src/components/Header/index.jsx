import React, { useContext, useState } from "react";
import { ABOUT, ADMIN, CONTACT, HOME, PRODUCTS } from "@/pages/routes";
import {
  Anchor,
  Box,
  Burger,
  Drawer,
  Flex,
  Group,
  Image,
  Menu,
  NavLink,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconUser } from "@tabler/icons-react";
import classes from "./styles.module.css";
import Logo from "@/images/reyapparel-logo.png";
import { Session } from "@/context/user";
import useAuth from "@/hooks/useAuth";
import CartDrawer from "../CartDrawer";
import Dialog from "../Dialog";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { ROLE } from "@/helpers/consts";

export default function Header() {
  // user context
  const { state } = useContext(Session);
  const { user } = state;
  const isAdmin = user?.role === ROLE.admin;
  // custom hooks
  const { signOut } = useAuth();
  // drawer hook
  const [opened, { open, close }] = useDisclosure(false);
  // display
  const [display, toggle] = useState(true);
  // navigation links
  const navLinksData = [
    { href: HOME, label: "Home" },
    { href: PRODUCTS, label: "Products" },
    { href: ABOUT, label: "About" },
    { href: CONTACT, label: "Contact" },
  ];

  return (
    <Box className={classes.header} px={{ base: "md", lg: "xl" }} py="md">
      <div className={classes.logo}>
        <Anchor href={HOME}>
          <Image src={Logo} w={100} fit="contain" />
        </Anchor>
      </div>
      <div className={classes.center}>
        <Flex justify="center" gap={5}>
          {navLinksData.map((item) => (
            <NavLink
              key={item.label}
              className={classes.link}
              active={location.pathname == item.href ? 1 : undefined}
              href={item.href}
              label={item.label}
              w="fit-content"
            />
          ))}
        </Flex>
      </div>

      <Group className="basis-1/3 justify-end flex flex-nowrap" gap={10}>
        <Flex gap={5} wrap="nowrap">
          {user ? (
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <div className="px-2 py-2 cursor-pointer hover:bg-white">
                  <IconUser />
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>
                  <Text c="dark"> {user.firstName + " " + user.lastName} </Text>
                </Menu.Label>
                <Menu.Divider />
                <Menu.Item>
                  {isAdmin && (
                    <Anchor underline="always" href={ADMIN.replace("/*", "")}>
                      Admin
                    </Anchor>
                  )}
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconLogout />}
                  onClick={() => signOut()}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Dialog
              content={
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  gap={10}
                >
                  {display ? (
                    <Login toggle={toggle} />
                  ) : (
                    <Register toggle={toggle} />
                  )}
                </Flex>
              }
              label="Login"
              color="dark"
              variant="transparent"
              withCloseButton={true}
              px={0}
              py={0}
            />
          )}
          <CartDrawer />
        </Flex>
        <Drawer h="100%" opened={opened} onClose={close} size="100%">
          <Flex direction="column" gap={5}>
            {navLinksData.map((item) => (
              <NavLink
                key={item.label}
                className={classes.link}
                active={location.pathname == item.href ? 1 : undefined}
                href={item.href}
                label={item.label}
                w="fit-content"
              />
            ))}
          </Flex>
        </Drawer>
        <Group>
          <Burger className={classes.burger} onClick={open} />
        </Group>
      </Group>
    </Box>
  );
}

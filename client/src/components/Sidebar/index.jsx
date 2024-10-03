import React, { Children, useContext, useState } from "react";
import { Burger } from "@mantine/core";
import { Avatar, Button, Menu, Text } from "@mantine/core";
import classes from "./styles.module.css";
import { Session } from "../../context/user";
import { IconLogout } from "@tabler/icons-react";
import useAuth from "../../hooks/useAuth";
import MenuDrawer from "../MenuDrawer";
import { shortFullName } from "../../helpers/string";
import { CLASS_SECTION } from "../../helpers/consts";
import storage from "../../helpers/storage";

export default function Sidebar({ children }) {
  // user context
  const { state } = useContext(Session);
  const { user } = state;
  // display short form of the name
  const shortName = shortFullName(user);
  // custom hooks
  const { signOut } = useAuth();
  // sidebar state
  const [opened, setOpened] = useState(storage.getSidebar());

  const toggleSidebar = () => {
    setOpened(!opened);
    // storing state in local storage
    storage.setSidebar(!opened);
  };

  return (
    <div className={opened ? "w-[100%]" : classes.shrink}>
      <div className={classes.sidebar}>
        <Burger className={classes.burger} onClick={toggleSidebar} />
        <Avatar className={classes.avatar} color="cyan" radius="xl" size="lg">
          {shortName}
        </Avatar>
        <MenuDrawer opened={opened} />
        <Button
          classNames={{ root: classes.logout }}
          c="red"
          variant="light"
          leftSection={opened && <IconLogout size={16} />}
          onClick={() => signOut()}
        >
          {opened ? <Text>Logout</Text> : <IconLogout size={20} />}
        </Button>
      </div>
      <div className={opened ? "ml-[20rem] pb-36" : "ml-[78px] pb-3"}>
        {children}
      </div>
    </div>
  );
}
